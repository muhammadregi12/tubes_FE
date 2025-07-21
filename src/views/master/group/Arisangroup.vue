<template>
  <DefaultLayout>
    <div class="relative bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-800 rounded-2xl shadow-2xl p-8 text-white overflow-hidden animate-fade-in-up">

      <!-- Animated Coin Icon -->
      <div class="absolute -top-6 -left-6 animate-bounce-slow z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-yellow-300 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 17h-1v-1h1v1zm1.07-7.75c-.9.32-1.57.86-2.03 1.54-.23.36-.34.65-.34 1.21h-1v-.5c0-.74.27-1.39.66-1.89.47-.61 1.19-1.16 2.3-1.58.93-.35 1.34-.77 1.34-1.45 0-.86-.7-1.5-1.65-1.5-.79 0-1.44.45-1.75 1.09L9.5 8.3c.5-.96 1.54-1.8 3.05-1.8 1.79 0 3 1.13 3 2.61 0 1.3-.77 2.04-2.03 2.56z"/>
        </svg>
      </div>

      <!-- Header & Search -->
      <div class="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 class="text-3xl font-bold tracking-wide">📂 Daftar Group Arisan</h2>
          <p class="text-indigo-200">Kelola dan pantau semua group arisan dengan mudah dan cepat</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Cari group..."
            class="w-full sm:w-72 px-4 py-2.5 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-300"
          />
          <router-link
            to="/addgroup"
            class="px-6 py-2.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-gray-900 shadow-md font-semibold transition-colors"
          >
            + Tambah Group
          </router-link>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto rounded-2xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20">
        <table class="min-w-full text-sm text-white backdrop-blur">
          <thead class="bg-white/20 text-indigo-100 uppercase text-xs">
            <tr>
              <th class="px-6 py-4 text-left">Nama Group</th>
              <th class="px-6 py-4 text-left">Nilai Arisan Per Orang</th>
              <th class="px-6 py-4 text-left">Durasi</th>
              <th class="px-6 py-4 text-left">Tanggal Mulai</th>
              <th class="px-6 py-4 text-left">Tanggal Selesai</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="group in arisanGroups"
              :key="group.id"
              class="hover:bg-white/10 border-t border-white/10 transition duration-200"
            >
              <td class="px-6 py-4 font-semibold text-indigo-100">
                {{ group.name }} <br />
                <span class="text-sm text-white/60">#{{ group.code }}</span>
              </td>
              <td class="px-6 py-4">Per Orang {{ formatCurrency(group.amount) }} ETH</td>
              <td class="px-6 py-4">{{ group.duration }}</td>
              <td class="px-6 py-4">{{ formatDate(group.start_date) }}</td>
              <td class="px-6 py-4">{{ formatDate(group.end_date) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="arisanGroups.length === 0" class="text-center py-6 text-white/60">
          Tidak ada data group arisan.
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex justify-between items-center text-sm text-white">
        <p>
          Menampilkan {{ (currentPage - 1) * perPage + 1 }} -
          {{ Math.min(currentPage * perPage, totalItems) }} dari {{ totalItems }} data
        </p>
        <div class="flex gap-3">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-1.5 bg-white text-indigo-700 rounded-full shadow hover:bg-indigo-100 disabled:opacity-50">
            ← Sebelumnya
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-1.5 bg-white text-indigo-700 rounded-full shadow hover:bg-indigo-100 disabled:opacity-50">
            Selanjutnya →
          </button>
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

const arisanGroups = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = ref(10)
const totalItems = ref(0)
const searchQuery = ref('')
const loading = ref(true)

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
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}
</style>
