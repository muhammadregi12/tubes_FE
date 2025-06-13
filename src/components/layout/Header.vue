<template>
  <header class="bg-white shadow-sm z-10">
    <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div class="flex items-center">
        <img src="https://img.icons8.com/ios-filled/50/3B82F6/handshake.png" alt="Logo" class="h-8 w-8 mr-2" />
        <h1 class="text-xl font-bold text-gray-800">ArisanQu</h1>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class="relative">
          <div class="flex items-center space-x-2 cursor-pointer" @click="toggleProfileDropdown">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span class="text-blue-600 font-medium">{{ userName.charAt(0).toUpperCase() }}</span>
            </div>
            <span class="text-gray-700 font-medium hidden md:inline">{{ userName }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <div v-if="showProfileDropdown" class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
            <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </a>
            <button @click="logout" class="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../axios'

const router = useRouter()
const userName = ref(JSON.parse(localStorage.getItem('user'))?.name || '')
const showProfileDropdown = ref(false)

const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value
}

const logout = async () => {
  try {
    const token = localStorage.getItem('token')
    await api.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
    alert('Gagal logout. Silakan coba lagi.')
  }
}
</script>