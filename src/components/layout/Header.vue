<template>
  <header class="backdrop-blur-md bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563eb] bg-opacity-90 shadow-xl z-10 relative overflow-hidden border-b border-blue-400/30">
    <div class="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex justify-between items-center relative z-10">
      <!-- Logo & Brand -->
      <div class="flex items-center space-x-4">
        <!-- Logo Denyut -->
        <div class="relative w-12 h-12">
          <div class="absolute inset-0 animate-ping-slow rounded-full bg-blue-400 opacity-30 blur-md"></div>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/handshake.png"
            alt="Logo"
            class="relative z-10 w-12 h-12 animate-pulse drop-shadow-xl"
          />
        </div>

        <!-- Judul Animasi -->
        <h1 class="text-3xl font-extrabold bg-gradient-to-r from-white via-blue-400 to-indigo-500 text-transparent bg-clip-text tracking-wide animate-brand-glow">
          ARICHAIN
        </h1>
      </div>

      <!-- Jam, Tanggal, dan Nama Pengguna -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-white text-sm sm:text-base font-medium">
        <div class="flex items-center space-x-2 text-blue-100">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ currentTime }}</span>
        </div>
        <div class="hidden sm:inline">|</div>
        <span class="mt-1 sm:mt-0 text-blue-100">{{ currentDate }}</span>

        <!-- Nama User -->
        <div class="flex items-center space-x-3 mt-2 sm:mt-0">
          <div class="w-9 h-9 rounded-full bg-white text-blue-800 font-bold flex items-center justify-center shadow-inner">
            {{ userName.charAt(0).toUpperCase() }}
          </div>
          <span class="hidden md:inline text-white font-semibold tracking-wide">{{ userName }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userName = ref(JSON.parse(localStorage.getItem('user'))?.name || 'Pengguna')
const currentTime = ref('')
const currentDate = ref('')

const updateTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  currentTime.value = `${hours}:${minutes}:${seconds}`
  currentDate.value = now.toLocaleDateString('id-ID', options)
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<style scoped>
/* Logo ring pulse */
@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
.animate-ping-slow {
  animation: ping-slow 3s ease-out infinite;
}

/* Brand text glow effect */
@keyframes brand-glow {
  0%, 100% {
    text-shadow: 0 0 4px #60a5fa, 0 0 10px #3b82f6, 0 0 20px #6366f1;
  }
  50% {
    text-shadow: 0 0 10px #bfdbfe, 0 0 20px #3b82f6, 0 0 35px #6366f1;
  }
}
.animate-brand-glow {
  animation: brand-glow 3s ease-in-out infinite;
}
</style>
