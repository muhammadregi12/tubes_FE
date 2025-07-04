<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6">
    <!-- Card -->
    <div class="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-white via-slate-100 to-blue-100 text-slate-800 shadow-2xl p-8 animate-fade-in transition-all duration-500 hover:scale-[1.015] border border-blue-200/30">

      <!-- Tombol Back (di dalam card, atas logo) -->
        <div class="mb-4">
          <router-link to="/" class="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </router-link>
        </div>


      <!-- Logo -->
      <div class="flex justify-center mb-4 mt-2">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-[3px] border-blue-300 opacity-40 animate-spin-slow blur-sm"></div>
          <div class="absolute inset-0 rounded-full bg-blue-400 opacity-30 blur-md animate-ping-slow"></div>
          <img src="https://img.icons8.com/ios-filled/50/ffffff/handshake.png" alt="Logo" class="relative z-10 w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 p-3 rounded-full shadow-xl" />
        </div>
      </div>

        <h1 class="text-center text-3xl font-bold tracking-wide text-gray-800">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500">ARICHAIN</span>
        </h1>

      <p class="text-center text-sm text-slate-600 mb-6">Buat akun digital arisan Anda</p>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="text-sm font-medium text-slate-700">Nama</label>
          <input v-model="name" type="text" required placeholder="John Doe"
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/80 placeholder-slate-400 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
        </div>

        <div>
          <label class="text-sm font-medium text-slate-700">Wallet Address</label>
          <div class="flex gap-2 mt-1">
            <input v-model="wallet_address" @blur="validateWallet" type="text" placeholder="0x1234abcd..."
              class="flex-1 px-4 py-2 rounded-lg bg-white/80 placeholder-slate-400 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button @click="getFromMetamask" type="button" class="px-3 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
              Ambil
            </button>
          </div>
          <p v-if="walletError" class="text-red-500 text-sm mt-1">{{ walletError }}</p>
        </div>

        <div>
          <label class="text-sm font-medium text-slate-700">Email</label>
          <input v-model="email" type="email" required placeholder="email@contoh.com"
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/80 placeholder-slate-400 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
        </div>

        <div class="relative">
          <label class="text-sm font-medium text-slate-700">Password</label>
          <input v-model="password" :type="showPassword ? 'text' : 'password'" required placeholder="••••••••"
            class="w-full mt-1 px-4 py-2 pr-10 rounded-lg bg-white/80 placeholder-slate-400 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <button type="button" class="absolute top-9 right-3 text-blue-400 hover:text-indigo-600" @click="showPassword = !showPassword">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path :d="showPassword ? closedEye : openEye" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </button>
        </div>

        <div class="relative">
          <label class="text-sm font-medium text-slate-700">Konfirmasi Password</label>
          <input v-model="password_confirmation" :type="showPasswordConfirm ? 'text' : 'password'" required placeholder="••••••••"
            class="w-full mt-1 px-4 py-2 pr-10 rounded-lg bg-white/80 placeholder-slate-400 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <button type="button" class="absolute top-9 right-3 text-blue-400 hover:text-indigo-600" @click="showPasswordConfirm = !showPasswordConfirm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path :d="showPasswordConfirm ? closedEye : openEye" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </button>
        </div>

        <button type="submit" class="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all duration-300 shadow-md">
          <span v-if="!isLoading">Daftar</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Memproses...
          </span>
        </button>

        <div v-if="error" class="p-3 bg-red-100 border border-red-300 text-sm rounded-md text-red-600 animate-shake">
          {{ error }}
        </div>
      </form>

      <div class="mt-6 text-center text-sm text-slate-600">
        Sudah punya akun?
        <router-link to="/login" class="underline font-semibold text-blue-600 hover:text-indigo-600 transition">
          Login Sekarang
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../../axios'

const name = ref('')
const wallet_address = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const walletError = ref(null)
const error = ref(null)
const isLoading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const openEye = 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
const closedEye = 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59'

const validateWallet = () => {
  const re = /^0x[a-fA-F0-9]{40}$/
  walletError.value = wallet_address.value && !re.test(wallet_address.value)
    ? 'Format wallet address tidak valid.'
    : null
}

const getFromMetamask = async () => {
  walletError.value = null
  if (typeof window.ethereum === 'undefined') {
    walletError.value = 'Metamask tidak terdeteksi.'
    return
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    if (accounts.length > 0) {
      wallet_address.value = accounts[0]
      validateWallet()
    } else {
      walletError.value = 'Tidak ada akun Metamask yang ditemukan.'
    }
  } catch {
    walletError.value = 'Gagal mengambil wallet dari Metamask.'
  }
}

const register = async () => {
  error.value = null
  isLoading.value = true
  validateWallet()
  if (walletError.value) {
    isLoading.value = false
    return
  }

  try {
    const res = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      wallet_address: wallet_address.value
    })
    localStorage.setItem('token', res.data.data.access_token)
    localStorage.setItem('user', JSON.stringify(res.data.data.user))
    window.location.href = '/dashboard'
  } catch (err) {
    error.value = err.response?.data?.message || 'Register gagal'
    isLoading.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.5s ease-in-out;
}
@keyframes text-glow {
  0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #60a5fa, 0 0 20px #4f46e5; }
  50% { text-shadow: 0 0 10px #fff, 0 0 20px #60a5fa, 0 0 30px #4f46e5; }
}
.animate-text-glow {
  animation: text-glow 3s ease-in-out infinite;
}
@keyframes ping-slow {
  0% { transform: scale(1); opacity: 0.6; }
  75%, 100% { transform: scale(2); opacity: 0; }
}
.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
</style>
