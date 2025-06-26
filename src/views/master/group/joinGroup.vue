<template>
  <DefaultLayout>
    <Notification 
      v-if="showNotification"
      :show="showNotification"
      :message="notificationMessage"
      :type="notificationType"
    />

    <main class="container mx-auto p-4">
      <div class="space-y-6">
        <!-- Search and Filter Section -->
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="w-full md:w-1/2">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search arisan groups..."
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              @input="searchGroups"
            />
          </div>
          <div class="flex gap-2">
            <select 
              v-model="perPage"
              class="px-4 py-2 border rounded-lg"
              @change="fetchGroups"
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>

        <!-- Groups Listing -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="group in groups"
            :key="group.id"
            class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="space-y-3">
              <h3 class="text-xl font-semibold">{{ group.name }}</h3>
              <p class="text-gray-600">Amount: Rp {{ group.amount.toLocaleString() }}</p>
              <p class="text-gray-600">Duration: {{ group.duration }}</p>
              <p class="text-gray-600">Start Date: {{ formatDate(group.start_date) }}</p>
              <p class="text-gray-600">Members: {{ group.members_count || 0 }}</p>
              
              <button 
                @click="handleJoin(group.id)"
                class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join Arisan
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-4">
          <button 
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ lastPage }}</span>
          <button 
            @click="nextPage"
            :disabled="currentPage >= lastPage"
            class="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <!-- Status Messages -->
        <p v-if="status" class="text-sm text-green-700">{{ status }}</p>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      </div>
    </main>
  </DefaultLayout>
</template>

<script>

import DefaultLayout from '../../../components/DefaultLayout.vue'
import Notification from '../../../components/Notification.vue' 
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../../../axios'

import { joinSmartContract } from '../../../utils/blockchain'


export default {
  components: {
    DefaultLayout,
    Notification
  },

  data() {
    return {
      groups: [],
      searchQuery: '',
      perPage: 10,
      currentPage: 1,
      lastPage: 1,
      total: 0,
      status: '',
      error: '',
      showNotification: false,
      notificationMessage: '',
      notificationType: 'success'
    };
  },

  mounted() {
    this.fetchGroups();
  },

  methods: {
    async fetchGroups() {
      try {
        const response = await axios.get('/arisanGroup', {
          params: {
            search: this.searchQuery,
            per_page: this.perPage,
            page: this.currentPage
          }
        });

        this.groups = response.data.data;
        this.currentPage = response.data.meta.current_page;
        this.lastPage = response.data.meta.last_page;
        this.total = response.data.meta.total;
      } catch (error) {
        this.error = 'Failed to fetch arisan groups';
        console.error(error);
      }
    },

    searchGroups() {
      // Debounce the search to avoid too many requests
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1;
        this.fetchGroups();
      }, 500);
    },

    async handleJoin(groupId) {
        try {
        const selectedGroup = this.groups.find(g => g.id === groupId)
        const contractAddress = selectedGroup?.contract_address

        if (!contractAddress) throw new Error('Alamat kontrak tidak ditemukan.')

        // 1. Join Smart Contract
        await joinSmartContract(contractAddress)

        // 2. Join ke Laravel Backend
        const response = await axios.post(`/arisanGroup/${groupId}/join`)

        this.showNotification = true
        this.notificationMessage = 'Berhasil join arisan!'
        this.notificationType = 'success'
        this.status = 'Kamu sudah join arisan'
        this.fetchGroups()

        setTimeout(() => { this.showNotification = false }, 3000)

        } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Gagal join arisan'
        this.showNotification = true
        this.notificationMessage = this.error
        this.notificationType = 'error'
        setTimeout(() => { this.showNotification = false }, 3000)
        }
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    nextPage() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
        this.fetchGroups();
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchGroups();
      }
    }
  }
};
</script>