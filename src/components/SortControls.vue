<template>
  <div class="mb-4 sm:mb-6 flex flex-wrap gap-2 sm:gap-4 items-center">
    <span class="text-gray-700 font-medium text-sm sm:text-base">Sort by:</span>
    
    <button
      @click="handleSort('name')"
      :class="[
        'px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors flex items-center gap-2 text-sm',
        sortField === 'name'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
    >
      Name
      <span v-if="sortField === 'name'" class="text-xs">
        {{ sortOrder === 'asc' ? '↑' : '↓' }}
      </span>
    </button>
    
    <button
      @click="handleSort('age')"
      :class="[
        'px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors flex items-center gap-2 text-sm',
        sortField === 'age'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
    >
      Age
      <span v-if="sortField === 'age'" class="text-xs">
        {{ sortOrder === 'asc' ? '↑' : '↓' }}
      </span>
    </button>
    
    <button
      v-if="sortField"
      @click="clearSort"
      class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-sm"
    >
      Clear Sort
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUnicornStore } from '../stores/unicornStore'

const store = useUnicornStore()

const sortField = computed(() => store.sortField)
const sortOrder = computed(() => store.sortOrder)

const handleSort = (field) => {
  store.setSort(field)
}

const clearSort = () => {

  store.setSort(null)
}
</script>

