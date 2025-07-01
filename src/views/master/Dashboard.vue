<template>
  <DefaultLayout>
    <main>
      <div class="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-sm p-6">
        <!-- Animated Emote Icon -->
        <div class="absolute -top-6 -left-6 animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-300" viewBox="0 0 20 20" fill="currentColor"></svg>
        </div>
        <!-- Welcome Message -->
        <div class="alert alert-success bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <p class="text-green-700 font-medium">Selamat datang, {{ userName }}!</p>
          </div>
        </div>

        <!-- Dashboard Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Total Anggota Card -->
          <div class="bg-blue-50 rounded-lg p-6 shadow-sm">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-medium text-gray-800 mb-2">Total Pengguna</h3>
                <p class="text-3xl font-bold text-blue-600">24</p>
              </div>
              <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Arisan Aktif Card -->
          <div class="bg-green-50 rounded-lg p-6 shadow-sm">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-medium text-gray-800 mb-2">Total Arisan</h3>
                <p class="text-3xl font-bold text-green-600">3</p>
              </div>
              <div class="p-3 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Total Peminjaman Card -->
          <div class="bg-purple-50 rounded-lg p-6 shadow-sm">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-medium text-gray-800 mb-2">Total Tabungan</h3>
                <p class="text-3xl font-bold text-purple-600">Rp 5.250.000</p>
              </div>
              <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../../components/DefaultLayout.vue'
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
