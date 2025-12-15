<template>
  <div class="flex justify-center items-center gap-2 mt-8">
    <button
      @click="$emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      :class="[
        'px-4 py-2 rounded-md transition-colors',
        currentPage === 1
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      ]"
    >
      Previous
    </button>
    
    <span class="px-4 py-2 text-gray-700">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    
    <button
      @click="$emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      :class="[
        'px-4 py-2 rounded-md transition-colors',
        currentPage === totalPages
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      ]"
    >
      Next
    </button>
  </div>
</template>

<script setup>
defineProps({
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
</script>


