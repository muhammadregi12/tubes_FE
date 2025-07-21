<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 flex flex-col items-center px-4 overflow-hidden relative">
    <!-- Floating Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-10 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-10 animate-float-delay-1"></div>
      <div class="absolute top-2/3 right-20 w-80 h-80 bg-purple-200 rounded-full filter blur-3xl opacity-10 animate-float-delay-2"></div>
      <div class="absolute bottom-20 left-1/3 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-5 animate-float-delay-3"></div>
    </div>

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
          <router-link to="/" class="hover:text-yellow-300 transition-transform hover:scale-105">Home</router-link>
          <router-link to="/panduan" class="hover:text-yellow-300 transition-transform hover:scale-105 text-yellow-300">Panduan</router-link>
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
          <router-link to="/" class="hover:text-yellow-300 font-medium">Home</router-link>
          <router-link to="/panduan" class="hover:text-yellow-300 font-medium text-yellow-300">Panduan</router-link>
          <router-link to="/register">
            <button class="w-full bg-white text-indigo-700 hover:text-indigo-900 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all font-semibold">
              Daftar Sekarang
            </button>
          </router-link>
        </div>
      </div>
    </header>

    <!-- Panduan Section -->
    <main class="pt-40 pb-24 max-w-6xl mx-auto w-full px-4 relative z-10">
      <!-- Hero Title -->
      <div class="text-center mb-20 animate-fade-in">
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          <span class="relative inline-block">
            <span class="relative z-10">Panduan Lengkap</span>
            <span class="absolute bottom-0 left-0 w-full h-4 bg-blue-200 opacity-50 -z-0 animate-highlight"></span>
          </span>
          <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500">Arisan Digital</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Ikuti 5 langkah mudah untuk memulai arisan digital berbasis blockchain yang aman, transparan, dan tanpa ribet.
        </p>
      </div>

      <!-- Timeline Guide -->
      <div class="relative">
        <!-- Timeline Line -->
        <div class="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 -ml-0.5 z-0"></div>

        <!-- Steps Container -->
        <div class="space-y-28 md:space-y-32">
          <!-- Step 1 -->
          <div 
            class="relative flex flex-col md:flex-row items-center gap-8 group"
            v-animate-on-scroll="{animation: 'fade-up', delay: 0}"
          >
            <div class="md:absolute left-1/2 -ml-16 w-32 h-32 flex-shrink-0 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-6 transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg z-10">
              <img src="https://img.icons8.com/color/96/000000/metamask-logo.png" alt="Metamask" class="w-full h-full object-contain animate-bounce-slow"/>
            </div>
            <div class="md:w-5/12 md:mr-auto md:pr-16 pt-4 md:pt-0 md:pl-0 md:text-right transform transition-all duration-500 group-hover:-translate-x-2">
              <div class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 mb-3">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Langkah 1
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Siapkan Wallet Metamask</h3>
              <p class="text-gray-600 mb-4">
                Install aplikasi Metamask di perangkat Anda dan buat akun wallet. Pastikan wallet terhubung dengan jaringan blockchain yang didukung.
              </p>
              <a href="https://metamask.io/" target="_blank" class="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Download Metamask
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Step 2 -->
          <div 
            class="relative flex flex-col md:flex-row items-center gap-8 group"
            v-animate-on-scroll="{animation: 'fade-up', delay: 100}"
          >
            <div class="md:absolute left-1/2 -ml-16 w-32 h-32 flex-shrink-0 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-6 transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg z-10">
              <img src="https://img.icons8.com/fluency/96/000000/login-rounded-right.png" alt="Login" class="w-full h-full object-contain animate-wiggle"/>
            </div>
            <div class="md:w-5/12 md:ml-auto md:pl-16 pt-4 md:pt-0 md:pr-0 transform transition-all duration-500 group-hover:translate-x-2">
              <div class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 mb-3">
                <span class="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                Langkah 2
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Login/Daftar Akun</h3>
              <p class="text-gray-600 mb-4">
                Buat akun Arichain atau login jika sudah memiliki akun. Hubungkan wallet Metamask Anda untuk memulai transaksi yang aman.
              </p>
              <div class="flex flex-wrap gap-3">
                <router-link to="/register" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105">
                  Daftar Sekarang
                </router-link>
                <router-link to="/login" class="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105">
                  Login
                </router-link>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div 
            class="relative flex flex-col md:flex-row items-center gap-8 group"
            v-animate-on-scroll="{animation: 'fade-up', delay: 200}"
          >
            <div class="md:absolute left-1/2 -ml-16 w-32 h-32 flex-shrink-0 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-6 transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg z-10">
              <img src="https://img.icons8.com/color/96/000000/conference-call.png" alt="Group" class="w-full h-full object-contain animate-float"/>
            </div>
            <div class="md:w-5/12 md:mr-auto md:pr-16 pt-4 md:pt-0 md:pl-0 md:text-right transform transition-all duration-500 group-hover:-translate-x-2">
              <div class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 mb-3">
                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
                Langkah 3
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Buat/Join Arisan</h3>
              <p class="text-gray-600 mb-4">
                Buat grup arisan baru atau bergabung dengan grup yang sudah ada. Tentukan nominal, jumlah anggota, dan periode arisan.
              </p>
              <div class="inline-flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Smart Contract menjamin keamanan
              </div>
            </div>
          </div>

          <!-- Step 4 -->
          <div 
            class="relative flex flex-col md:flex-row items-center gap-8 group"
            v-animate-on-scroll="{animation: 'fade-up', delay: 300}"
          >
            <div class="md:absolute left-1/2 -ml-16 w-32 h-32 flex-shrink-0 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-6 transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg z-10">
              <img src="https://img.icons8.com/color/96/000000/money-transfer.png" alt="Payment" class="w-full h-full object-contain animate-shake"/>
            </div>
            <div class="md:w-5/12 md:ml-auto md:pl-16 pt-4 md:pt-0 md:pr-0 transform transition-all duration-500 group-hover:translate-x-2">
              <div class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-800 mb-3">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Langkah 4
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Bayar Arisan</h3>
              <p class="text-gray-600 mb-4">
                Lakukan pembayaran sesuai jadwal melalui wallet Metamask. Transaksi tercatat di blockchain dan bisa diverifikasi oleh semua anggota.
              </p>
              <div class="inline-flex items-center bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Transaksi aman dan transparan
              </div>
            </div>
          </div>

          <!-- Step 5 -->
          <div 
            class="relative flex flex-col md:flex-row items-center gap-8 group"
            v-animate-on-scroll="{animation: 'fade-up', delay: 400}"
          >
            <div class="md:absolute left-1/2 -ml-16 w-32 h-32 flex-shrink-0 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-6 transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg z-10">
              <img src="https://img.icons8.com/color/96/000000/prize.png" alt="Prize" class="w-full h-full object-contain animate-tada"/>
            </div>
            <div class="md:w-5/12 md:mr-auto md:pr-16 pt-4 md:pt-0 md:pl-0 md:text-right transform transition-all duration-500 group-hover:-translate-x-2">
              <div class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 mb-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                Langkah 5
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Draw Arisan</h3>
              <p class="text-gray-600 mb-4">
                Sistem akan memilih pemenang secara acak dan otomatis mentransfer dana ke wallet pemenang. Proses bisa disaksikan oleh semua anggota.
              </p>
              <div class="inline-flex items-center bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Proses cepat dan tanpa campur tangan
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div 
        class="mt-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-3xl p-0.5 shadow-2xl overflow-hidden animate-gradient-border"
        v-animate-on-scroll="{animation: 'fade-up', delay: 500}"
      >
        <div class="bg-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full opacity-10"></div>
          <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-100 rounded-full opacity-10"></div>
          
          <div class="relative z-10 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Siap Memulai Arisan Digital?</h2>
            <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan anggota lainnya yang sudah merasakan kemudahan arisan digital berbasis blockchain.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <router-link to="/register" class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 transform">
                Daftar Sekarang - Gratis!
              </router-link>
              <router-link to="/login" class="inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-500 bg-white text-indigo-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 transform">
                Sudah Punya Akun? Login
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

// Directive for scroll animations
const vAnimateOnScroll = {
  mounted(el, binding) {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animation = binding.value?.animation || 'fade-up'
          const delay = binding.value?.delay || 0
          
          el.style.animation = `${animation} 0.8s ease-out ${delay}ms forwards`
          observer.unobserve(el)
        }
      })
    }, options)
    
    observer.observe(el)
  }
}
</script>

<style scoped>
/* Base Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@keyframes float-delay-1 {
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
  100% { transform: translateY(0px) translateX(0px); }
}

@keyframes float-delay-2 {
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(15px) translateX(-15px); }
  100% { transform: translateY(0px) translateX(0px); }
}

@keyframes float-delay-3 {
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-10px) translateX(-10px); }
  100% { transform: translateY(0px) translateX(0px); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes highlight {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes tada {
  0% { transform: scale(1); }
  10%, 20% { transform: scale(0.9) rotate(-5deg); }
  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(5deg); }
  40%, 60%, 80% { transform: scale(1.1) rotate(-5deg); }
  100% { transform: scale(1) rotate(0); }
}

@keyframes gradient-border {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Animation Classes */
.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-up {
  opacity: 0;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay-1 {
  animation: float-delay-1 8s ease-in-out infinite;
}

.animate-float-delay-2 {
  animation: float-delay-2 10s ease-in-out infinite;
}

.animate-float-delay-3 {
  animation: float-delay-3 12s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-highlight {
  animation: highlight 1.5s ease-out forwards;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}

.animate-shake {
  animation: shake 1.5s ease-in-out infinite;
}

.animate-tada {
  animation: tada 1.5s ease-in-out infinite;
}

.animate-gradient-border {
  background-size: 200% 200%;
  animation: gradient-border 4s ease infinite;
}

/* Responsive Adjustments */
@media (max-width: 767px) {
  .timeline-step:nth-child(even) .timeline-content {
    text-align: left;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>