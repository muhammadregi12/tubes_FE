<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <div class="flex flex-1">
      <Sidebar />
      
      <main class="flex-1 p-6">
        <slot /> 
      </main>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/layout/Header.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import Footer from '../components/layout/Footer.vue'
</script>