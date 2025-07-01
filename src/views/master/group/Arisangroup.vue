<template>
  <DefaultLayout>
    <div class="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-md p-6 text-white overflow-hidden">
      <!-- Animated Coin Icon -->
      <div class="absolute -top-6 -left-6 animate-float">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-300" viewBox="0 0 20 20" fill="currentColor"></svg>
      </div>
      <!-- Header & Search -->
      <div class="mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold">Daftar Group Arisan</h2>
          <p class="text-purple-100">Kelola dan pantau semua group arisan di sini</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari group..."
            class="w-full sm:w-64 px-4 py-2 rounded-lg bg-white text-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300 border border-gray-300"
          />
          <router-link
            to="/addgroup"
            class="px-5 py-2 rounded-lg bg-white text-gray-900 shadow-md border border-gray-300 hover:bg-yellow-300 hover:text-gray-900 transition-colors font-semibold text-center"
          >
            + Tambah Group
          </router-link>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-white rounded-lg shadow text-gray-700">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-blue-50 text-indigo-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold">Nama Group</th>
              <th class="px-6 py-3 text-left text-xs font-semibold">Nilai Arisan</th>
              <th class="px-6 py-3 text-left text-xs font-semibold">Durasi</th>
              <th class="px-6 py-3 text-left text-xs font-semibold">Tanggal Mulai</th>
              <th class="px-6 py-3 text-left text-xs font-semibold">Tanggal Selesai</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-for="group in arisanGroups" :key="group.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap font-medium text-indigo-700">
                {{ group.name }}<br />
                <span class="text-sm text-gray-500">#{{ group.code }}</span>
              </td>
              <td class="px-6 py-4">Rp {{ formatCurrency(group.amount) }}</td>
              <td class="px-6 py-4">{{ group.duration }}</td>
              <td class="px-6 py-4">{{ formatDate(group.start_date) }}</td>
              <td class="px-6 py-4">{{ formatDate(group.end_date) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="arisanGroups.length === 0" class="text-center py-6 text-gray-500">
          Tidak ada data group arisan.
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex justify-between items-center text-sm text-white">
        <p>
          Menampilkan {{ (currentPage - 1) * perPage + 1 }} -
          {{ Math.min(currentPage * perPage, totalItems) }} dari {{ totalItems }} data
        </p>
        <div class="flex gap-2">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-3 py-1 bg-white text-indigo-600 rounded shadow hover:bg-indigo-100 disabled:opacity-50">Sebelumnya</button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-white text-indigo-600 rounded shadow hover:bg-indigo-100 disabled:opacity-50">Selanjutnya</button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import DefaultLayout from '../../../components/DefaultLayout.vue'
import api from '../../../axios'
import debounce from 'lodash/debounce'
import { useRouter } from 'vue-router'

const arisanGroups = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = ref(10)
const totalItems = ref(0)
const searchQuery = ref('')
const loading = ref(true)
const router = useRouter()

const fetchArisanGroups = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('token')
    const response = await api.get('/arisanGroup', {
      params: {
        page: currentPage.value,
        per_page: perPage.value,
        search: searchQuery.value
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    arisanGroups.value = response.data.data
    currentPage.value = response.data.meta.current_page
    totalPages.value = response.data.meta.last_page
    totalItems.value = response.data.meta.total
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

watch([currentPage, perPage], () => fetchArisanGroups())
watch(searchQuery, debounce(() => {
  currentPage.value = 1
  fetchArisanGroups()
}, 500))

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

const formatCurrency = (val) => new Intl.NumberFormat('id-ID').format(val)
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

onMounted(() => fetchArisanGroups())
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
</style>
