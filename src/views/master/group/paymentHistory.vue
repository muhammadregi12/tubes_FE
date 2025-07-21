<template>
  <DefaultLayout>
    <div class="min-h-screen bg-gray-100 py-10 px-4">
      <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700">
          Riwayat Pembayaran Arisan
        </h2>

        <div v-if="payments.length === 0" class="text-gray-500">
          Belum ada pembayaran tercatat untuk grup ini.
        </div>

        <table v-else class="w-full mt-4 border">
          <thead>
            <tr class="bg-indigo-100">
              <th class="px-4 py-2">Peserta</th>
              <th class="px-4 py-2">Ronde</th>
              <th class="px-4 py-2">Jumlah (ETH)</th>
              <th class="px-4 py-2">Waktu Bayar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in payments" :key="payment.id" class="text-center">
              <td class="px-4 py-2">{{ payment.user.name }}</td>
              <td class="px-4 py-2">{{ payment.round }}</td>
              <td class="px-4 py-2">{{ payment.amount }}</td>
              <td class="px-4 py-2">{{ formatDateTime(payment.paid_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../../../components/DefaultLayout.vue'
import Notification from '../../../components/Notification.vue'
import axios from '../../../axios'

export default {
  components: { DefaultLayout },
  props: ['groupId'],

  data() {
    return {
      payments: [],
    };
  },

  mounted() {
    this.fetchPayments();
  },

  methods: {
    async fetchPayments() {
      try {
        const res = await axios.get(`/arisan-group/${this.groupId}/payments`);
        this.payments = res.data.data;
      } catch (err) {
        console.error(err);
      }
    },

    formatDateTime(dateTimeStr) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Date(dateTimeStr).toLocaleString('id-ID', options);
    },
  },
};
</script>
