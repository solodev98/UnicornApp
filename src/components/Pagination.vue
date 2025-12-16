<template>
  <div class="flex justify-center items-center gap-2 mt-8">
    <!-- Previous Button -->
    <button
      @click="$emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="w-10 h-10 rounded-xl border border-gray-300 bg-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
    >
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <!-- Page Numbers -->
    <div class="flex items-center gap-2">
      <template v-for="(page, index) in pageNumbers" :key="index">
        <button
          v-if="page !== '...'"
          @click="$emit('page-change', page)"
          :class="[
            'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-colors',
            page === currentPage
              ? 'text-white'
              : 'text-gray-900 hover:text-[#4e46b4]'
          ]"
          :style="page === currentPage ? { backgroundColor: '#4e46b4' } : {}"
        >
          {{ page }}
        </button>
        <span v-else class="text-gray-900">...</span>
      </template>
    </div>
    
    <!-- Next Button -->
    <button
      @click="$emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="w-10 h-10 rounded-xl border border-gray-300 bg-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
    >
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

defineEmits(['page-change'])

const pageNumbers = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage
  
  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    if (current <= 4) {
      // Show pages 1-5 and last page
      for (let i = 2; i <= 5; i++) {
        pages.push(i)
      }
      if (total > 5) {
        pages.push('...')
        pages.push(total)
      }
    } else if (current >= total - 3) {
      // Show first page, ellipsis, and last 5 pages
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
      pages.push('...')
      pages.push(current - 1)
      pages.push(current)
      pages.push(current + 1)
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})
</script>


