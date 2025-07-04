<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6">
    <!-- Kartu Form -->
    <div class="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-white via-slate-100 to-blue-100 text-slate-800 shadow-2xl p-8 animate-fade-in transition-all duration-500 hover:scale-[1.015] border border-blue-200/30">

      <!-- Logo ARICHAIN: Ping dan Ring Light -->
      <div class="flex justify-center mb-4">
        <div class="relative w-16 h-16">
          <!-- Ring Light berputar -->
          <div class="absolute inset-0 rounded-full border-[3px] border-blue-300 opacity-40 animate-spin-slow blur-sm"></div>

          <!-- Ping Effect -->
          <div class="absolute inset-0 rounded-full bg-blue-400 opacity-30 blur-md animate-ping-slow"></div>

          <!-- Logo handshake -->
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/handshake.png"
            alt="Logo"
            class="relative z-10 w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 p-3 rounded-full shadow-xl"
          />
        </div>
      </div>

      <!-- Branding Title -->
      <h1 class="text-center text-3xl font-bold tracking-wide animate-text-glow text-indigo-600">ARICHAIN</h1>
      <p class="text-center text-sm text-slate-600 mb-6">Masuk ke akun digital arisan Anda</p>

      <!-- Form Login -->
      <form @submit.prevent="login" class="space-y-6">
        <!-- Email -->
        <div>
          <label class="text-sm font-medium text-slate-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/80 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="email@contoh.com"
          />
        </div>

        <!-- Password -->
        <div class="relative">
          <label class="text-sm font-medium text-slate-700">Password</label>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            required
            class="w-full mt-1 px-4 py-2 rounded-lg bg-white/80 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            class="absolute top-9 right-3 text-blue-400 hover:text-indigo-600 transition"
            @click="showPassword = !showPassword"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                :d="showPassword 
                  ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M21 21' 
                  : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all duration-300 shadow-md"
        >
          <span v-if="!isLoading">Masuk</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Memproses...
          </span>
        </button>

        <!-- Error -->
        <div v-if="error" class="p-3 bg-red-100 border border-red-300 text-sm rounded-md text-red-600 animate-shake">
          {{ error }}
        </div>
      </form>

      <!-- Register Link -->
      <div class="mt-6 text-center text-sm text-slate-600">
        Belum punya akun?
        <router-link to="/register" class="underline font-semibold text-blue-600 hover:text-indigo-600 transition">
          Daftar Sekarang
        </router-link>
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

    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login gagal'
    isLoading.value = false
  }
}
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes text-glow {
  0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #60a5fa, 0 0 20px #4f46e5; }
  50% { text-shadow: 0 0 10px #fff, 0 0 20px #60a5fa, 0 0 30px #4f46e5; }
}
.animate-text-glow {
  animation: text-glow 3s ease-in-out infinite;
}

@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
</style>
