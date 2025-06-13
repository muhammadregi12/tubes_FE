<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- Navbar - Fixed at the top -->
    <nav class="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <div class="flex items-center space-x-2">
          <img src="https://img.icons8.com/ios-filled/50/3B82F6/handshake.png" alt="Logo" 
               class="h-10 w-10 animate-wiggle" />
          <span class="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            ArisanQu
          </span>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="space-x-6 hidden md:flex items-center">
          <a href="#" class="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">Home</a>
          <a href="#" class="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">Tentang</a>
          <a href="#" class="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">Fitur</a>
          <router-link to="/register">
            <button class="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
              <span class="relative z-10">Daftar Sekarang</span>
              <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          </router-link>
        </div>
        
        <!-- Mobile Hamburger Button -->
        <button @click="toggleMenu" class="md:hidden text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu - Only shown when isMenuOpen is true -->
      <div v-if="isMenuOpen" class="md:hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-4 px-6 shadow-lg transition-all duration-300 ease-in-out"
       :class="isMenuOpen ? 'animate-slide-down' : 'animate-slide-up'">
    <div class="flex flex-col space-y-4">
      <a href="#" class="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 hover:bg-blue-50 rounded-lg px-4">Home</a>
      <a href="#" class="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 hover:bg-blue-50 rounded-lg px-4">Tentang</a>
      <a href="#" class="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-2 hover:bg-blue-50 rounded-lg px-4">Fitur</a>
      <router-link to="/register">
        <button class="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl mt-2">
          <span class="relative z-10">Daftar Sekarang</span>
          <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </button>
      </router-link>
    </div>
  </div>
    </nav>

    <!-- Rest of your content -->
    <div class="pt-24 w-full"> <!-- Added padding-top to account for fixed navbar -->
      <!-- Animated Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div v-for="i in 12" :key="i" 
             class="absolute rounded-full bg-blue-200 opacity-20"
             :class="`w-${Math.floor(Math.random() * 20) + 10} h-${Math.floor(Math.random() * 20) + 10}`"
             :style="`top:${Math.random() * 100}%; left:${Math.random() * 100}%; animation: float ${Math.random() * 10 + 10}s linear infinite;`"></div>
      </div>

      <!-- Hero Section -->
      <main class="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto gap-12 py-12 relative z-10">
        <!-- Left Text -->
        <div class="text-left space-y-8 md:w-1/2">
          <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight animate-slide-up">
            Selamat datang di <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 typing-animation">ArisanQu</span>
        </h1>
        <p class="text-gray-600 text-xl max-w-lg animate-slide-up delay-100">
            Platform arisan digital modern yang membuat pengelolaan arisan menjadi mudah, aman, dan menyenangkan.
        </p>
          <div class="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
            <router-link to="/register">
              <button class="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <span class="relative z-10">Mulai Sekarang</span>
                <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </button>
            </router-link>
            <button class="flex items-center justify-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 group">
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="font-medium">Tonton Demo</span>
            </button>
          </div>
          <div class="flex items-center gap-4 pt-4 animate-slide-up delay-300">
            <div class="flex -space-x-2">
              <img v-for="i in 4" :key="i" 
                   :src="`https://randomuser.me/api/portraits/${i%2 ? 'men' : 'women'}/${i+20}.jpg`" 
                   class="w-10 h-10 rounded-full border-2 border-white" 
                   alt="User">
            </div>
            <div class="text-left">
              <p class="text-gray-600 text-sm">Bergabung dengan <span class="font-bold text-blue-600">1,000+</span> pengguna</p>
              <div class="flex items-center">
                <svg v-for="star in 5" :key="star" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-gray-600 text-sm ml-1">4.9 (500+ ulasan)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Image -->
        <div class="md:w-1/2 relative">
          <img
            src="../../public/image/slider1.png"
            alt="Group Arisan Digital"
            class="w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-[1.03] transition-transform duration-500 animate-float"
          />
          
          <!-- Animated Circles Background -->
          <div class="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-100 rounded-full opacity-20 -z-10 animate-float-slow"></div>
          <div class="absolute -top-10 -right-10 w-44 h-44 bg-indigo-100 rounded-full opacity-20 -z-10 animate-float-slower"></div>
          
          <!-- Floating Money Elements - Improved -->
          <!-- Left Money Icon -->
          <div class="absolute top-1/4 -left-5 animate-float-delay-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 opacity-90" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <!-- Right Money Icon -->
          <div class="absolute top-1/3 -right-5 animate-float-delay-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-400 opacity-80" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <!-- Top Money Icon -->
          <div class="absolute -top-5 left-1/4 animate-float-delay-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-400 opacity-70" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </main>

      <!-- Floating Elements -->
      <div class="absolute bottom-20 left-10 w-16 h-16 bg-blue-100 rounded-full opacity-30 animate-float-slow"></div>
      <div class="absolute top-1/4 right-20 w-24 h-24 bg-indigo-100 rounded-full opacity-30 animate-float-slower"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>


<style scoped>

/* Tambahkan animasi slide-down untuk mobile menu */
@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out forwards;
}

/* Perbaiki animasi yang sudah ada */
.animate-slide-up {
  animation: slide-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-15px) translateX(5px);
  }
}

@keyframes float-slower {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-10px) translateX(3px);
  }
}

@keyframes wiggle {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Additional Animation Styles */
.animate-float-delay-1 {
  animation: float 5s ease-in-out infinite 0.3s;
}
.animate-float-delay-2 {
  animation: float 4s ease-in-out infinite 0.6s;
}
.animate-float-delay-3 {
  animation: float 6s ease-in-out infinite 0.9s;
}

/* Money Icon Styling */
.text-blue-500 {
  color: #3B82F6;
}
.text-blue-400 {
  color: #60A5FA;
}
.text-indigo-400 {
  color: #818CF8;
}

/* Animation Classes */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 10s ease-in-out infinite;
}

.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}

/* .animate-slide-up {
  animation: slide-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
} */

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

/* Gradient Text */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Shadow Enhancement */
.shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Tambahkan transition untuk hamburger icon */
button[aria-expanded="true"] svg {
  transform: rotate(90deg);
  transition: transform 0.3s ease;
}

/* Warna background mobile menu disesuaikan dengan body */
.md\:hidden {
  background: linear-gradient(to bottom right, white, #f0f9ff, #eef2ff);
}
</style>