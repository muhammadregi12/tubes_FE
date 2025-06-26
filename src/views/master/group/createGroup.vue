<template>
  <DefaultLayout>
    <Notification 
      v-if="showNotification"
      :show="showNotification"
      :message="notificationMessage"
      :type="notificationType"
    />

    <main class="">
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Form Header -->
    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <h2 class="text-xl font-semibold text-gray-800">Tambah Group Arisan</h2>
      <router-link 
        to="/arisangroup" 
        class="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Kembali
      </router-link>
    </div>

    <!-- Form Content -->
    <div class="p-6">
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- Nama Group -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nama Group</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Arisan Keluarga"
              required
            />
          </div>

          <!-- Nilai Arisan -->
          <div>
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Nilai Arisan (Rp)</label>
            <input 
              type="number" 
              id="amount" 
              v-model="form.amount"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: 500000"
              required
            />
          </div>

          <!-- Tanggal Mulai -->
          <div>
            <label for="start_date" class="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
            <input 
              type="date" 
              id="start_date" 
              v-model="form.start_date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              @change="calculateEndDate"
            />
          </div>

          <!-- Durasi -->
          <div>
            <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Durasi (Bulan)</label>
            <select 
              id="duration" 
              v-model="form.duration"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              @change="calculateEndDate"
            >
              <option value="" disabled>Pilih Durasi</option>
              <option value="3 Bulan">3 Bulan</option>
              <option value="6 Bulan">6 Bulan</option>
              <option value="12 Bulan">12 Bulan</option>
              <option value="24 Bulan">24 Bulan</option>
            </select>
          </div>

          <!-- Tanggal Selesai (auto calculated) -->
          <div>
            <label for="end_date" class="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
            <input 
              type="date" 
              id="end_date" 
              v-model="form.end_date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              readonly
            />
          </div>

          <!-- Deskripsi -->
          <div class="sm:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Deskripsi (Opsional)</label>
            <textarea 
              id="description" 
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tambahkan deskripsi tentang group arisan ini"
            ></textarea>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="mt-8 flex justify-end space-x-3">
          <button 
            type="button"
            @click="resetForm"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Reset
          </button>
          <button 
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            {{ loading ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</main>
  </DefaultLayout>
</template>


<script setup>
import DefaultLayout from '../../../components/DefaultLayout.vue'
import Notification from '../../../components/Notification.vue' 
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../../axios'

const router = useRouter()
const loading = ref(false)
const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success')

const form = ref({
  name: '',
  amount: '',
  start_date: '',
  duration: '',
  end_date: '',
})

const calculateEndDate = () => {
  if (form.value.start_date && form.value.duration) {
    const startDate = new Date(form.value.start_date)
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + parseInt(form.value.duration))
    form.value.end_date = endDate.toISOString().split('T')[0]
  }
}

const resetForm = () => {
  form.value = {
    name: '',
    value: '',
    start_date: '',
    duration: '',
    end_date: '',
  }
}

import { deployArisanContract } from '../../../services/arisanContract.js'


const submitForm = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('token')

    if (!form.value.name || !form.value.amount || !form.value.start_date || !form.value.duration) {
      notificationMessage.value = 'Pastikan semua data wajib diisi!'
      notificationType.value = 'error'
      showNotification.value = true
      loading.value = false
      return
    }

    // 🧠 STEP 1: Simpan group dulu ke backend
    const response = await api.post('/arisanGroup', form.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })

    const createdGroup = response.data.data

    // 🧠 STEP 2: Deploy kontrak via ethers.js
    const contractAddress = await deployArisanContract()

    // 🧠 STEP 3: Kirim contract address ke Laravel
    await api.post(`/arisanGroup/${createdGroup.id}/contract-address`, {
      contract_address: contractAddress
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })

    notificationMessage.value = 'Group arisan & kontrak berhasil disimpan!'
    notificationType.value = 'success'
    showNotification.value = true

    setTimeout(() => {
      router.push('/arisangroup')
    }, 2000)

  } catch (error) {
    console.error('Error:', error)
    notificationMessage.value = 'Terjadi kesalahan: ' + (error.response?.data?.message || error.message)
    notificationType.value = 'error'
    showNotification.value = true
  } finally {
    loading.value = false
  }
}


</script>