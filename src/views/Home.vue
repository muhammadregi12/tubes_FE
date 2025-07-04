<template>
  <div class="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- Header Navbar -->
    <header class="fixed top-0 left-0 w-full backdrop-blur-lg bg-gradient-to-r from-[#0f172a] via-[#1e40af] to-[#3b82f6] bg-opacity-95 shadow-2xl z-50 border-b border-blue-300/30 rounded-b-3xl text-white">
      <div class="max-w-7xl mx-auto flex justify-between items-center py-5 px-6">
        <!-- Logo & Judul -->
        <div class="flex items-center space-x-3">
          <img src="https://img.icons8.com/ios-filled/50/FFFFFF/handshake.png" alt="Logo" class="h-10 w-10 animate-spin-slow" />
          <span class="text-3xl font-extrabold bg-gradient-to-r from-white via-blue-300 to-blue-600 text-transparent bg-clip-text tracking-widest drop-shadow-md">
            Arichain
          </span>
        </div>

        <!-- Desktop Menu -->
        <div class="space-x-6 hidden md:flex items-center font-semibold tracking-wide text-sm">
          <a href="#" class="hover:text-yellow-300 transition-transform hover:scale-105">Home</a>
          <a href="#" class="hover:text-yellow-300 transition-transform hover:scale-105">Tentang</a>
          <a href="#" class="hover:text-yellow-300 transition-transform hover:scale-105">Fitur</a>
          <router-link to="/login">
            <button class="bg-white text-indigo-700 hover:text-indigo-900 px-6 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all font-semibold">
              Login
            </button>
          </router-link>
        </div>

        <!-- Mobile toggle button -->
        <button @click="toggleMenu" class="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden bg-gradient-to-br from-indigo-600 to-purple-700 py-4 px-6 shadow-xl rounded-b-xl">
        <div class="flex flex-col space-y-4">
          <a href="#" class="hover:text-yellow-300 font-medium">Home</a>
          <a href="#" class="hover:text-yellow-300 font-medium">Tentang</a>
          <a href="#" class="hover:text-yellow-300 font-medium">Fitur</a>
          <router-link to="/register">
            <button class="w-full bg-white text-indigo-700 hover:text-indigo-900 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all font-semibold">
              Daftar Sekarang
            </button>
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="pt-40 pb-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4 relative z-10">
      <!-- Left -->
      <div class="md:w-1/2 text-left space-y-6">
        <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight animate-fade-up">
          Selamat datang di <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500">Arichain</span>
        </h1>
        <p class="text-gray-600 text-xl animate-typing border-r-4 border-indigo-600 whitespace-nowrap overflow-hidden max-w-full">
          <b>Bangun Komunitas. Kelola Keuangan. Tingkatkan Kebersamaan.</b>
        </p>
        <div class="flex gap-4 animate-fade-up delay-200">
          <router-link to="/register">
            <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition-all">
              Mulai Sekarang
            </button>
          </router-link>
        </div>
      </div>

      <!-- Right -->
      <div class="md:w-1/2 relative">
        <img
          src="/image/slider1.png"
          alt="Group Arisan Digital"
          class="w-full max-w-md mx-auto drop-shadow-2xl rounded-xl hover:scale-[1.03] transition duration-500 animate-float"
        />

        <!-- Floating Bubbles -->
        <div class="absolute -top-8 left-1/4 w-36 h-36 bg-indigo-200 opacity-10 rounded-full animate-ping-slow -z-10"></div>
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 opacity-20 rounded-full animate-float-slower -z-10"></div>
        <div class="absolute -top-10 -right-10 w-44 h-44 bg-blue-200 opacity-20 rounded-full animate-float-delay-3 -z-10"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
</script>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

@keyframes fade-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes ping-slow {
  0% { transform: scale(1); opacity: 0.4; }
  100% { transform: scale(1.6); opacity: 0; }
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}
.animate-float-slower {
  animation: float 8s ease-in-out infinite;
}
.animate-float-delay-3 {
  animation: float 6s ease-in-out infinite;
}
.animate-fade-up {
  animation: fade-up 0.9s ease-out both;
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
.animate-ping-slow {
  animation: ping-slow 3s ease-out infinite;
}
.animate-typing {
  animation: typing 4s steps(40, end) 1s 1 normal both;
}
</style>
