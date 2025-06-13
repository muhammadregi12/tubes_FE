<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
    <!-- Main Card -->
    <div class="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
      <!-- Animated Header -->
      <div class="relative h-32 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
        <!-- Animasi Uang Koin (SVG) -->
        <div class="absolute -top-6 -left-6 animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979a.75.75 0 011.06.02l1.5 1.6a.75.75 0 010 1.04l-1.5 1.6a.75.75 0 11-1.08-1.04L9.716 8.5l-1.2-1.28a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white z-10 animate-bounce">Arisan Digital</h1>
        <!-- Animasi Uang Koin Lainnya -->
        <div class="absolute -bottom-4 -right-4 animate-float-delay">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-300 opacity-80" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Form Login -->
      <div class="p-8 space-y-6">
        <form @submit.prevent="login" class="space-y-4">
          <!-- Email Input -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input 
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              placeholder="email@contoh.com"
            />
          </div>

          <!-- Password Input -->
          <div class="space-y-1 relative">
    <label class="block text-sm font-medium text-gray-700">Password</label>
    <div class="relative">
      <input 
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        required
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 pr-10"
        placeholder="••••••••"
      />
      <button
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-600 transition-colors"
        @click="showPassword = !showPassword"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="showPassword ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"
          />
        </svg>
      </button>
    </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
          >
            <span v-if="!isLoading">Masuk</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          </button>
        </form>

        <!-- Error Message -->
        <div 
          v-if="error"
          class="p-3 bg-red-100 text-red-700 rounded-lg animate-shake"
        >
          {{ error }}
        </div>

        <!-- Link Register -->
        <div class="text-center pt-4">
          <router-link 
            to="/register"
            class="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-all duration-300 hover:underline"
          >
            Belum punya akun? <span class="font-bold">Daftar Sekarang</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../axios'

const email = ref('')
const password = ref('')
const error = ref(null)
const showPassword = ref(false)
const isLoading = ref(false)
const router = useRouter()

const login = async () => {
  error.value = null
  isLoading.value = true
  
  try {
    const res = await api.post('/login', {
      email: email.value,
      password: password.value
    })
    
    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    
    // Redirect dengan animasi
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/dashboard')
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Login gagal'
    isLoading.value = false
  }
}
</script>

<style>
/* Animasi Koin Mengambang */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-delay {
  animation: float 6s ease-in-out 1s infinite;
}

/* Animasi Goyang saat Error */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Efek Glow pada Input Fokus */
input:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}
</style>