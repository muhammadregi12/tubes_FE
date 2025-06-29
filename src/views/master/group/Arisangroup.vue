<template>
  <DefaultLayout>
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Table Header with Add Button -->
      <div class="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-blue-50 to-indigo-50 gap-4">
  <div class="w-full sm:w-auto">
    <h2 class="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Daftar Group Arisan</h2>
    <div class="relative mt-2 sm:mt-0">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <input 
        v-model="searchQuery"
        type="text" 
        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
        placeholder="Cari group..."
      >
    </div>
  </div>
  <router-link 
    to="/addgroup" 
    class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm w-full sm:w-auto justify-center"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
    </svg>
    Tambah Group
  </router-link>
</div>

      <!-- Loading State -->
      <div v-if="loading" class="p-6 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-2 text-gray-600">Memuat data...</p>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto" v-else>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Group</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Arisan</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durasi</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Mulai</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Selesai</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="group in arisanGroups" :key="group.id" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-blue-600 font-medium">{{ group.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ group.name }}</div>
                    <div class="text-sm text-gray-500">#{{ group.code }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Rp {{ formatCurrency(group.amount) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{ group.duration }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatDate(group.start_date) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatDate(group.end_date) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && arisanGroups.length === 0" class="p-6 text-center">
        <p class="text-gray-500">Tidak ada data arisan group yang tersedia.</p>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
  <div class="flex-1 flex justify-between sm:hidden">
    <button 
      @click="prevPage" 
      :disabled="currentPage === 1"
      class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
    >
      Sebelumnya
    </button>
    <button 
      @click="nextPage" 
      :disabled="currentPage === totalPages"
      class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
    >
      Selanjutnya
    </button>
  </div>
  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Menampilkan 
        <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span>
        sampai 
        <span class="font-medium">{{ Math.min(currentPage * perPage, totalItems) }}</span>
        dari 
        <span class="font-medium">{{ totalItems }}</span>
        data
      </p>
    </div>
    <div>
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
        >
          <span class="sr-only">Sebelumnya</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <template v-for="page in totalPages" :key="page">
          <button 
            v-if="Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages"
            @click="goToPage(page)"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
            :class="{
              'z-10 bg-blue-50 border-blue-500 text-blue-600': page === currentPage,
              'text-gray-500 hover:bg-gray-50': page !== currentPage
            }"
          >
            {{ page }}
          </button>
          <span 
            v-else-if="Math.abs(page - currentPage) === 3" 
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            ...
          </span>
        </template>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          :class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }"
        >
          <span class="sr-only">Selanjutnya</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</div>
    </div>
  </DefaultLayout>
</template>


<script setup>
import DefaultLayout from '../../../components/DefaultLayout.vue'
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../../axios'
import Swal from 'sweetalert2'
import debounce from 'lodash/debounce'

const router = useRouter()

// Reactive variables
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = ref(10)
const totalItems = ref(0)
const searchQuery = ref('')
const userName = ref('')
const showProfileDropdown = ref(false)
const arisanGroups = ref([])
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
    console.error('Error fetching arisan groups:', error)
    if (error.response && error.response.status === 401) {
      alert('Sesi Anda telah habis. Silakan login kembali.')
      logout()
    } else {
      alert('Terjadi kesalahan saat memuat data.')
    }
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const debouncedSearch = debounce(() => {
  currentPage.value = 1
  fetchArisanGroups()
}, 500)

watch(searchQuery, () => {
  debouncedSearch()
})

watch([currentPage, perPage], () => {
  fetchArisanGroups()
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID').format(value)
}

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    userName.value = user.name
  }
  
  fetchArisanGroups()
})


</script>