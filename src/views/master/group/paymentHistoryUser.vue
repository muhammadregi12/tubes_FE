<template>
  <DefaultLayout>
    <div class="min-h-screen bg-gray-100 py-10 px-4">
      <div class="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold text-indigo-700 mb-4">Riwayat Pembayaran Saya</h2>

        <table v-if="payments.length" class="w-full table-auto border">
          <thead>
            <tr class="bg-indigo-100">
              <th class="px-4 py-2">Grup</th>
              <th class="px-4 py-2">Ronde</th>
              <th class="px-4 py-2">Jumlah</th>
              <th class="px-4 py-2">Tanggal Bayar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in payments" :key="p.id" class="text-center">
              <td class="px-4 py-2">{{ p.group.name }}</td>
              <td class="px-4 py-2">{{ p.round }}</td>
              <td class="px-4 py-2">{{ p.amount }} ETH</td>
              <td class="px-4 py-2">{{ formatDate(p.paid_at) }}</td>
            </tr>
          </tbody>
        </table>

        <div v-else class="text-gray-500">Belum ada pembayaran tercatat.</div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DefaultLayout from '../../../components/DefaultLayout.vue'
import Notification from '../../../components/Notification.vue'
import axios from '../../../axios'

const payments = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/my-payments')
    payments.value = res.data.data
  } catch (err) {
    console.error(err)
  }
})

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
</script>
