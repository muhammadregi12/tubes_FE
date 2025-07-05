<template>
  <DefaultLayout>
    <Notification 
      v-if="showNotification"
      :show="showNotification"
      :message="notificationMessage"
      :type="notificationType"
    />

    <!-- Background Wrapper -->
    <div class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 py-10 px-4 text-white">
      <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 text-gray-900">
        <!-- Header -->
        <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold text-indigo-700">Gabung Arisan</h2>
            <p class="text-gray-500">Temukan dan ikuti group arisan pilihanmu</p>
          </div>

          <!-- Search & Filter -->
          <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Cari group arisan..."
              class="w-full sm:w-64 px-4 py-2 rounded-lg bg-white text-gray-900 shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              @input="searchGroups"
            />
            <select 
              v-model="perPage"
              class="px-4 py-2 rounded-lg bg-white text-gray-900 shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              @change="fetchGroups"
            >
              <option value="10">10 / halaman</option>
              <option value="25">25 / halaman</option>
              <option value="50">50 / halaman</option>
            </select>
          </div>
        </div>

        <!-- Group Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="group in groups"
            :key="group.id"
            class="border rounded-lg p-4 shadow hover:shadow-md transition-shadow bg-white"
          >
            <div class="space-y-2">
              <h3 class="text-xl font-semibold text-indigo-700">{{ group.name }}</h3>
              <p class="text-gray-700">Biaya: {{ group.amount.toLocaleString() }} ETH</p>
              <p class="text-gray-700">Durasi: {{ group.duration }}</p>
              <p class="text-gray-700">Mulai: {{ formatDate(group.start_date) }}</p>
              <p class="text-gray-700">Peserta: {{ group.participants_count || 0 }} Orang</p>

              <button 
                @click="handleJoin(group.id)"
                class="w-full bg-yellow-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400 font-semibold transition-colors"
              >
                Join Arisan
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center items-center gap-4 text-sm">
          <button 
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-white text-indigo-700 border border-gray-300 rounded-lg hover:bg-indigo-100 disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <span>Halaman {{ currentPage }} dari {{ lastPage }}</span>
          <button 
            @click="nextPage"
            :disabled="currentPage >= lastPage"
            class="px-4 py-2 bg-white text-indigo-700 border border-gray-300 rounded-lg hover:bg-indigo-100 disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>

        <!-- Status Messages -->
        <p v-if="status" class="text-sm text-green-600 mt-4">{{ status }}</p>
        <p v-if="error" class="text-sm text-red-600 mt-2">{{ error }}</p>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../../../components/DefaultLayout.vue'
import Notification from '../../../components/Notification.vue'
import { joinSmartContract } from '../../../utils/blockchain'
import axios from '../../../axios'

export default {
  components: {
    DefaultLayout,
    Notification
  },

  data() {
    return {
      groups: [],
      searchQuery: '',
      perPage: 10,
      currentPage: 1,
      lastPage: 1,
      total: 0,
      status: '',
      error: '',
      showNotification: false,
      notificationMessage: '',
      notificationType: 'success'
    };
  },

  mounted() {
    this.fetchGroups();
  },

  methods: {
    async fetchGroups() {
      try {
        const response = await axios.get('/arisanGroup', {
          params: {
            search: this.searchQuery,
            per_page: this.perPage,
            page: this.currentPage
          }
        });

        this.groups = response.data.data;
        this.currentPage = response.data.meta.current_page;
        this.lastPage = response.data.meta.last_page;
        this.total = response.data.meta.total;
      } catch (error) {
        this.error = 'Gagal memuat data group arisan';
        console.error(error);
      }
    },

    searchGroups() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1;
        this.fetchGroups();
      }, 500);
    },

    async handleJoin(groupId) {
  try {
    const selectedGroup = this.groups.find(g => g.id === groupId);
    const contractAddress = selectedGroup?.contract_address;

    if (!contractAddress) throw new Error('Alamat kontrak tidak ditemukan.');

    await joinSmartContract(contractAddress);
    await axios.post(`/arisanGroup/${groupId}/join`);

    this.showNotification = true;
    this.notificationMessage = 'Berhasil join arisan!';
    this.notificationType = 'success';
    this.status = 'Kamu sudah join arisan';
    this.fetchGroups();

    setTimeout(() => { this.showNotification = false }, 3000);
  } catch (error) {
    const msg =
      error?.reason ||
      error?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      'Gagal join arisan';

    if (
      msg.toLowerCase().includes('user rejected') ||
      error?.code === 4001
    ) {
      this.notificationMessage = 'Join arisan dibatalkan oleh kamu di Metamask.';
    } else {
      this.notificationMessage = msg;
    }

    this.showNotification = true;
    this.notificationType = 'error';
    setTimeout(() => { this.showNotification = false }, 3000);
  }
},


    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    nextPage() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
        this.fetchGroups();
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchGroups();
      }
    }
  }
};
</script>
