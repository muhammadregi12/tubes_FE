<template>
  <DefaultLayout>
    <Notification 
      v-if="showNotification"
      :show="showNotification"
      :message="notificationMessage"
      :type="notificationType"
    />

    <div class="min-h-screen bg-gray-100 py-10 px-4">
      <div class="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700">Grup Arisan yang Kamu Ikuti</h2>

        <div v-if="joinedGroups.length === 0" class="text-gray-500">
          Kamu belum bergabung dengan grup arisan manapun.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="group in joinedGroups" 
            :key="group.id" 
            class="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 class="text-lg font-semibold text-indigo-600">{{ group.name }}</h3>
            <p class="text-sm text-gray-600">Peserta: {{ group.participants_count || 0 }} Orang</p>
            <p class="text-sm text-gray-600">Jumlah Bayar Per Peserta: {{ group.amount }} ETH</p>
            <p class="text-sm text-gray-600">Mulai: {{ formatDate(group.start_date) }}</p>
            <p class="text-sm text-gray-600">Selesai: {{ formatDate(group.end_date) }}</p>

            <!-- Tombol Bayar Arisan -->
            <button 
              @click="handlePay(group.contract_address, group.id)"
              :disabled="group.has_paid"
              class="mt-3 w-full py-2 px-4 rounded-lg font-semibold transition"
              :class="group.has_paid 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'"
            >
              {{ group.has_paid ? 'Sudah Bayar' : 'Bayar Arisan' }}
            </button>

            <!-- Tombol Draw -->
            <button
              v-if="group.current_drawer === group.user_wallet"
              @click="handleDraw(group.contract_address, group.id)"
              class="mt-3 w-full py-2 px-4 rounded-lg font-semibold transition bg-blue-500 text-white hover:bg-blue-600"
            >
              Draw Arisan
            </button>

            <!-- btn bayar detail -->
             <button
                @click="goToPaymentHistory(group.id)"
                class="mt-2 w-full py-2 px-4 rounded-lg font-semibold transition bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Lihat Riwayat Pembayaran
              </button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../../../components/DefaultLayout.vue';
import Notification from '../../../components/Notification.vue';
import axios from '../../../axios';
import { payArisanSmartContract, drawArisanSmartContract } from '../../../utils/blockchain';

export default {
  components: { DefaultLayout, Notification },

  data() {
    return {
      joinedGroups: [],
      showNotification: false,
      notificationMessage: '',
      notificationType: 'success'
    };
  },

  mounted() {
    this.fetchJoinedGroups();
  },

  methods: {

    goToPaymentHistory(groupId) {
      this.$router.push({ name: 'payment-history', params: { groupId } });
    },

    async fetchJoinedGroups() {
      try {
        const response = await axios.get('/my-arisan-groups');
        this.joinedGroups = response.data.data;
      } catch (error) {
        this.showError('Gagal memuat data grup arisan kamu.');
      }
    },

    async handlePay(contractAddress, groupId) {
      const group = this.joinedGroups.find(g => g.id === groupId);
      if (group?.has_paid) {
        this.showError('Kamu sudah membayar arisan untuk grup ini.');
        return;
      }

      try {
        if (!contractAddress) throw new Error('Alamat kontrak tidak tersedia.');

        await payArisanSmartContract(contractAddress);

        await axios.post(`/arisanGroup/${groupId}/pay`);

        this.showSuccess('Pembayaran arisan berhasil!');
        this.fetchJoinedGroups();
      } catch (error) {
        const errMsg = this.extractError(error);
        if (errMsg.toLowerCase().includes('user rejected') || error?.code === 4001) {
          this.showError('Pembayaran dibatalkan oleh kamu di Metamask.');
        } else {
          this.showError(errMsg);
        }
      }
    },

    async handleDraw(contractAddress, groupId) {
      try {
        const winnerAddress = await drawArisanSmartContract(contractAddress);
        if (!winnerAddress) throw new Error('Gagal mendapatkan alamat pemenang dari smart contract');

        const winnerUser = await axios.get(`/user-by-wallet/${winnerAddress}`);
        const nextDrawNumber = await this.getNextDrawNumber(groupId);

        await axios.post(`/arisanGroup/${groupId}/record-draw`, {
          winner_id: winnerUser.data.id,
          draw_number: nextDrawNumber,
          draw_date: new Date().toISOString().split('T')[0],
        });

        this.showSuccess(`🎉 Pemenang: ${winnerUser.data.name} (${winnerAddress}) dicatat di sistem!`);

        // 🔥 Tambahkan ini
        await this.handleUpdateDrawer(groupId);

      } catch (err) {
        const msg = this.extractError(err);
        if (msg.toLowerCase().includes('user rejected') || err?.code === 4001) {
          this.showError('Proses draw dibatalkan oleh kamu di Metamask.');
        } else if (msg.includes('Arisan selesai') || msg.includes('semua sudah menang')) {
          this.showError('🎉 Arisan sudah selesai, semua peserta sudah pernah menang.');
        } else {
          this.showError(msg);
        }
      }
    },


    async getNextDrawNumber(groupId) {
      const response = await axios.get(`/arisanGroup/${groupId}/next-draw-number`);
      return response.data.next_draw_number;
    },

    async handleUpdateDrawer(groupId) {
      try {
        const res = await axios.post(`/arisan-group/${groupId}/update-drawer`);
        this.showSuccess(`Drawer berikutnya: User ID ${res.data.next_drawer_user_id}`);
        this.fetchJoinedGroups();
      } catch (err) {
        this.showError(this.extractError(err));
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return '-';
      return new Date(dateStr).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    extractError(error) {
      return (
        error?.reason ||
        error?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Terjadi kesalahan.'
      );
    },

    showError(msg) {
      this.notificationMessage = msg;
      this.notificationType = 'error';
      this.showNotification = true;
      setTimeout(() => (this.showNotification = false), 3000);
    },

    showSuccess(msg) {
      this.notificationMessage = msg;
      this.notificationType = 'success';
      this.showNotification = true;
      setTimeout(() => (this.showNotification = false), 3000);
    },
  }
};
</script>
