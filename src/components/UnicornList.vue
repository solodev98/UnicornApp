<template>
  <div>
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-600">Loading unicorns...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p>Error: {{ error }}</p>
    </div>

    <div v-else-if="paginatedUnicorns.length === 0" class="text-center py-12 px-4">
      <div class="flex flex-col items-center justify-center max-w-md mx-auto">
        <div class="mb-6">
          <EmptyStateIcon :size="120" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No Unicorns Found</h3>
        <p class="text-gray-600 mb-6">There are no unicorns in the database. Create your first one to get started!</p>
      </div>
    </div>

    <div v-else>
   
      <div>
        <UnicornRow
          v-for="(unicorn, index) in paginatedUnicorns"
          :key="unicorn._id"
          :unicorn="unicorn"
          :index="(currentPage - 1) * 5 + index"
          @edit="$emit('edit', unicorn)"
          @delete="$emit('delete', unicorn)"
        />
      </div>
    </div>

    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="setPage"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import UnicornRow from './UnicornRow.vue'
import Pagination from './Pagination.vue'
import EmptyStateIcon from './icons/EmptyStateIcon.vue'
import { useUnicornStore } from '../stores/unicornStore'

const store = useUnicornStore()

const loading = computed(() => store.loading)
const error = computed(() => store.error)
const paginatedUnicorns = computed(() => store.paginatedUnicorns)
const currentPage = computed(() => store.currentPage)
const totalPages = computed(() => store.totalPages)

const setPage = (page) => {
  store.setPage(page)
}

defineEmits(['edit', 'delete'])
</script>

