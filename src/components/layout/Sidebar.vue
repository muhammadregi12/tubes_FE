<template>
  <aside class="w-64 bg-white shadow-md hidden md:block">
    <div class="p-4 flex flex-col h-full">
      <!-- Logo Section -->
      <div class="flex items-center justify-center mb-8 mt-4">
        <div class="relative">
          <div class="absolute inset-0 rounded-full border-4 border-blue-100 transform rotate-45 animate-pulse"></div>
          <div class="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-br from-blue-400 to-blue-600 transform -rotate-12 blur-sm"></div>
          <img 
            src="https://img.icons8.com/ios-filled/100/3B82F6/handshake.png" 
            alt="Logo" 
            class="relative h-24 w-24 rounded-full object-cover border-4 border-white bg-white shadow-xl"
          />
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1">
        <SidebarLink to="/dashboard" icon="home" text="Home" />
        <SidebarLink to="/arisangroup" icon="database" text="Arisan Group" />
        <SidebarLink to="/join" icon="plus-circle" text="Join Arisan" />
        <SidebarLink to="/arisanku" icon="user-group" text="Grup Arisan Saya" />
        <SidebarLink to="/riwayat-pembayaran-saya" icon="database" text="Riwayat Pembayaran Saya" />
      </nav>

      <!-- Logout Button -->
      <div class="mt-auto px-4 py-3">
        <button
          @click="logout"
          class="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-semibold tracking-wide animate-pulse hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h6a1 1 0 010 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4zm13.293 5.293a1 1 0 010 1.414L14.414 13H9a1 1 0 110-2h4.586l-1.293-1.293a1 1 0 011.414-1.414l3 3z" clip-rule="evenodd" />
          </svg>
          Logout
        </button>
        <p class="text-center text-xs text-gray-400 mt-4">© 2023 ArisanQu. All rights reserved.</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { defineComponent, h } from 'vue'

const route = useRoute()
const router = useRouter()

const logout = () => {
  localStorage.clear()
  alert("Anda telah logout")
  router.push("/login")
}

const Icon = defineComponent({
  props: {
    name: String
  },
  setup(props) {
    const icons = {
      home: `<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />`,
      database: `<path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />`,
      "plus-circle": `<path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm4 4a1 1 0 00-1 1v2H7a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 100-2h-2V7a1 1 0 00-1-1z" clip-rule="evenodd" />`,
      "user-group": `<path fill-rule="evenodd" d="M10 8a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 0114 0H3zm11-9a2 2 0 110-4 2 2 0 010 4zm2 9h2a5 5 0 00-4-4.9 6.97 6.97 0 012 4.9z" clip-rule="evenodd" />`
    }
    return () =>
      h("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        class: "h-5 w-5 mr-3",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        innerHTML: icons[props.name] || ""
      })
  }
})

const SidebarLink = defineComponent({
  props: {
    to: String,
    icon: String,
    text: String
  },
  setup(props) {
    return () =>
      h(RouterLink, {
        to: props.to,
        class: [
          'flex items-center px-4 py-3 rounded-lg mb-1 transition-all duration-300 hover:scale-[1.02]',
          route.path === props.to
            ? 'bg-blue-100 text-blue-700 font-semibold'
            : 'text-gray-700 hover:bg-blue-50'
        ]
      }, {
        default: () => [
          h(Icon, { name: props.icon }),
          h('span', null, props.text)
        ]
      })
  }
})
</script>
