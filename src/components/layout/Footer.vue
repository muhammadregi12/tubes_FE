<template>
  <footer class="bg-white shadow-md md:hidden py-3 px-6">
    <div class="flex justify-around">
      <router-link to="/dashboard" :class="[
        'flex flex-col items-center',
        $route.path === '/dashboard'
          ? 'text-blue-600 is-active'
          : 'text-gray-500',
      ]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span class="text-xs mt-1">Home</span>
      </router-link>

      <router-link to="/arisangroup" :class="[
        'flex flex-col items-center',
        $route.path === '/arisangroup'
          ? 'text-blue-600 is-active'
          : 'text-gray-500',
      ]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd" />
        </svg>
        <span class="text-xs mt-1">Arisan Group</span>
      </router-link>

      <router-link to="/join" :class="[
        'flex flex-col items-center',
        $route.path === '/join'
          ? 'text-blue-600 is-active'
          : 'text-gray-500',
      ]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
            clip-rule="evenodd" />
        </svg>
        <span class="text-xs mt-1">Join Arisan</span>
      </router-link>
    </div>
  </footer>
</template>

<script setup>
import { useRoute } from "vue-router";
const $route = useRoute();
</script>
