<template>
  <div class="mb-6 flex flex-wrap gap-4 items-center">
    <span class="text-gray-700 font-medium">Sort by:</span>
    
    <button
      @click="handleSort('name')"
      :class="[
        'px-4 py-2 rounded-md transition-colors flex items-center gap-2',
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
        'px-4 py-2 rounded-md transition-colors flex items-center gap-2',
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
      class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
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
  // Reset sort by setting to null
  store.setSort(null)
}
</script>

