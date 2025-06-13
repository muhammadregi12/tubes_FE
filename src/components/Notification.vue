<template>
  <div v-if="show" class="fixed top-4 right-4 z-50">
    <div :class="['px-6 py-4 rounded-lg shadow-lg text-white', type === 'success' ? 'bg-green-500' : 'bg-red-500']">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  message: String,
  type: String // 'success' or 'error'
})

const showNotification = ref(props.show)

watch(() => props.show, (newVal) => {
  showNotification.value = newVal
  if (newVal) {
    setTimeout(() => {
      showNotification.value = false
    }, 3000)
  }
})
</script>