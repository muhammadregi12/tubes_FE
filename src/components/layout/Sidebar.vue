<template>
  <aside class="w-64 bg-white shadow-md hidden md:block">
    <div class="p-4 flex flex-col h-full">
      <div class="flex items-center justify-center mb-8 mt-4">
        <div class="relative">
          <div class="absolute inset-0 rounded-full border-4 border-blue-100 transform rotate-45"></div>
          <div class="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-br from-blue-400 to-blue-600 transform -rotate-12"></div>
          <img 
            src="https://img.icons8.com/ios-filled/100/3B82F6/handshake.png" 
            alt="Logo" 
            class="relative h-25 w-25 rounded-full object-cover border-4 border-white bg-white shadow-lg"
          />
        </div>
      </div>
      
      <nav class="flex-1">
        <router-link
          to="/dashboard"
          :class="[
            'flex items-center px-4 py-3 rounded-lg mb-1 transition-colors duration-200',
            $route.path === '/dashboard' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Home</span>
        </router-link>
        
        <router-link
          to="/arisangroup"
          :class="[
            'flex items-center px-4 py-3 rounded-lg mb-1 transition-colors duration-200',
            $route.path === '/arisangroup' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          <span>Arisan Group</span>
        </router-link>
        
        <router-link
          to="/join"
          :class="[
            'flex items-center px-4 py-3 rounded-lg mb-1 transition-colors duration-200',
            $route.path === '/join' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd" />
          </svg>
          <span>Join Arisan</span>
        </router-link>

        <router-link
          to="/arisanku"
          :class="[
            'flex items-center px-4 py-3 rounded-lg mb-1 transition-colors duration-200',
            $route.path === '/arisanku' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd" />
          </svg>
          <span>Grup Arisan Saya</span>
        </router-link>
      </nav>
      
      <div class="p-4 mt-auto">
        <div class="text-xs text-gray-500 text-center">
          © 2023 ArisanQu. All rights reserved.
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
const $route = useRoute();
</script>
