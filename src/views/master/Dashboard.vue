<template>
  <DefaultLayout>
    <main>
      <div class="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 rounded-2xl shadow-2xl p-8 text-white">
        <!-- Animated Emote Icon -->
        <div class="absolute -top-6 -left-6 animate-float z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-yellow-300 drop-shadow-lg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>

        <!-- Welcome Message -->
        <div class="mb-8 bg-white/10 backdrop-blur-lg border-l-4 border-green-400 rounded-lg p-5 shadow-lg">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-white text-blue-800 font-bold rounded-full flex items-center justify-center shadow-inner">
              {{ userName.charAt(0).toUpperCase() }}
            </div>
            <p class="text-green-100 font-semibold text-lg tracking-wide">
              Selamat datang kembali, <span class="text-white underline underline-offset-4">{{ userName }}</span>!
            </p>
          </div>
        </div>

        <!-- Dashboard Content Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="card in cards"
            :key="card.title"
            class="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:scale-105 transition duration-300 ease-in-out"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">{{ card.title }}</h3>
                <p class="text-3xl font-bold" :class="card.textColor">{{ card.value }}</p>
              </div>
              <div class="p-3 rounded-full" :class="card.bgColor">
                <component :is="card.icon" class="h-6 w-6" />
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
import { ref } from 'vue'

// ✅ Import Heroicons v2 correctly (tanpa .vue)
import { UserGroupIcon, DocumentTextIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'

// Ambil nama pengguna dari localStorage
const userName = ref(JSON.parse(localStorage.getItem('user'))?.name || 'Pengguna')

// Daftar isi kartu dashboard
const cards = [
  {
    title: 'Total Pengguna',
    value: '24',
    icon: UserGroupIcon,
    bgColor: 'bg-blue-100 text-blue-600',
    textColor: 'text-blue-400'
  },
  {
    title: 'Total Arisan',
    value: '3',
    icon: DocumentTextIcon,
    bgColor: 'bg-green-100 text-green-600',
    textColor: 'text-green-400'
  },
  {
    title: 'Total Tabungan',
    value: 'Rp 5.250.000',
    icon: CurrencyDollarIcon,
    bgColor: 'bg-purple-100 text-purple-600',
    textColor: 'text-purple-400'
  }
]
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}
</style>
