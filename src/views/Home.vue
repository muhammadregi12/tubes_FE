<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md z-50 rounded-b-xl">
      <div class="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <div class="flex items-center space-x-2">
          <img src="https://img.icons8.com/ios-filled/50/FFFFFF/handshake.png" alt="Logo" class="h-10 w-10 animate-wiggle" />
          <span class="text-3xl font-bold text-white">Arichain</span>
        </div>

        <div class="space-x-6 hidden md:flex items-center">
          <a href="#" class="text-white hover:text-yellow-300 font-medium transition-transform hover:scale-105">Home</a>
          <a href="#" class="text-white hover:text-yellow-300 font-medium transition-transform hover:scale-105">Tentang</a>
          <a href="#" class="text-white hover:text-yellow-300 font-medium transition-transform hover:scale-105">Fitur</a>
          <router-link to="/login">
            <button class="bg-white text-indigo-700 hover:text-indigo-900 px-6 py-2.5 rounded-full shadow-md transition-transform hover:scale-105">
              Login
            </button>
          </router-link>
        </div>

        <button @click="toggleMenu" class="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div v-if="isMenuOpen" class="md:hidden bg-gradient-to-br from-indigo-600 to-purple-600 py-4 px-6 shadow-lg">
        <div class="flex flex-col space-y-4">
          <a href="#" class="text-white hover:text-yellow-300 font-medium">Home</a>
          <a href="#" class="text-white hover:text-yellow-300 font-medium">Tentang</a>
          <a href="#" class="text-white hover:text-yellow-300 font-medium">Fitur</a>
          <router-link to="/register">
            <button class="w-full bg-white text-indigo-700 hover:text-indigo-900 px-6 py-3 rounded-full shadow-md">
              Daftar Sekarang
            </button>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="pt-32 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4 relative z-10">
      <!-- Left -->
      <div class="md:w-1/2 text-left space-y-6">
        <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight animate-slide-up">
          Selamat datang di <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Arichain</span>
        </h1>
        <p class="text-gray-600 text-xl animate-slide-up delay-100">
          Platform arisan digital modern yang membuat pengelolaan arisan menjadi mudah, aman, dan menyenangkan.
        </p>
        <div class="flex gap-4 animate-slide-up delay-200">
          <router-link to="/register">
            <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full text-lg font-medium transition-transform hover:scale-105 shadow-md">
              Mulai Sekarang
            </button>
          </router-link>
        </div>
      </div>

      <!-- Right -->
      <div class="md:w-1/2 relative">
        <img
          src="../../public/image/slider1.png"
          alt="Group Arisan Digital"
          class="w-full max-w-md mx-auto drop-shadow-xl transform hover:scale-[1.03] transition duration-500 animate-float"
        />

        <!-- Floating Money Icons -->
        <div class="absolute top-1/4 -left-5 animate-float-delay-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 opacity-90" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
          </svg>
        </div>

        <div class="absolute top-1/3 -right-5 animate-float-delay-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-400 opacity-80" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
          </svg>
        </div>

        <div class="absolute -top-5 left-1/4 animate-float-delay-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-400 opacity-70" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
          </svg>
        </div>

        <div class="absolute -bottom-10 -left-10 w-36 h-36 bg-indigo-100 rounded-full opacity-20 -z-10 animate-float-slow"></div>
        <div class="absolute -top-10 -right-10 w-44 h-44 bg-purple-100 rounded-full opacity-20 -z-10 animate-float-slower"></div>
      </div>
    </main>
  </div>
</template>
