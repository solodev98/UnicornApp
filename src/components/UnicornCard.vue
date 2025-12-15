<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-bold text-gray-800">{{ unicorn.name }}</h3>
        <p class="text-sm text-gray-500 mt-1">Age: {{ unicorn.age }}</p>
      </div>
      <span 
        :class="['px-3 py-1 rounded-full text-xs font-semibold', statusColor]"
      >
        {{ status }}
      </span>
    </div>
    
    <p class="text-gray-600 mb-4">{{ unicorn.colour || 'No color specified' }}</p>
    
    <div class="flex gap-2">
      <button
        @click="$emit('edit', unicorn)"
        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Edit
      </button>
      <button
        @click="$emit('delete', unicorn._id)"
        class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getUnicornStatus, getStatusColor } from '../utils/statusUtils'

const props = defineProps({
  unicorn: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const status = computed(() => getUnicornStatus(props.unicorn.age))
const statusColor = computed(() => getStatusColor(status.value))
</script>


