<template>
  <div class="bg-white rounded-lg shadow-sm mb-4 overflow-hidden relative">
    <!-- Colored Left Border - More prominent -->
    <div :class="['absolute left-0 top-0 bottom-0 w-1.5', borderColorClass]"></div>
    
    <!-- Main Row -->
    <div class="py-6 px-4 pl-6">
      <!-- Labels Row - Left aligned with proper spacing -->
      <div class="flex items-center mb-2">
        <div class="w-12 text-gray-400 text-xs">No</div>
        <div class="w-40 text-gray-400 text-xs">Doctor Name</div>
        <div class="w-20 text-gray-400 text-xs">Age</div>
        <div class="w-24 text-gray-400 text-xs">Color</div>
        <div class="w-32 text-gray-400 text-xs">Status</div>
      </div>
      
      <!-- Values Row - Left aligned with matching spacing -->
      <div class="flex items-center">
        <div class="w-12 text-gray-600 text-sm">{{ index + 1 }}</div>
        <div class="w-40 font-bold text-gray-900 text-sm">{{ unicorn.name }}</div>
        <div class="w-20 font-bold text-gray-900 text-sm">{{ unicorn.age }}</div>
        <div class="w-24 font-bold text-gray-900 text-sm capitalize">{{ unicorn.colour || 'N/A' }}</div>
        <div class="w-32 flex items-center">
          <span :class="['px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap', statusColor]">
            <span>{{ statusEmoji }}</span>
            {{ status }}
          </span>
        </div>
        
        <!-- Actions - Right aligned -->
        <div class="ml-auto flex items-center gap-2">
          <button
            @click="$emit('edit', unicorn)"
            class="px-4 py-2 bg-white border border-black text-gray-900 text-sm rounded-[12px] hover:bg-gray-50 transition-colors font-medium"
            style="border-width: 1px;"
          >
            Edit
          </button>
          <button
            @click="$emit('delete', unicorn)"
            class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center transition-colors"
            title="Delete"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Show Details Link - Below the row, aligned right -->
      <div class="mt-3 flex justify-end">
        <button
          @click="toggleDetails"
          class="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2 transition-colors"
        >
          <span>{{ showDetails ? 'Hide details' : 'Show details' }}</span>
          <div class="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg 
              class="w-3 h-3 text-gray-700 transition-transform"
              :class="{ 'rotate-180': showDetails }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
    
    <!-- Expandable Details Section -->
    <div 
      v-if="showDetails"
      class="border-t border-gray-200 p-6 bg-white"
    >
      <div class="flex flex-col items-center justify-center gap-4 bg-purple-100 rounded-[12px] p-6">
        <!-- Icon with red X -->
        <div class="relative flex-shrink-0">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <!-- Red X overlay -->
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span class="text-white text-xs font-bold">×</span>
          </div>
        </div>
        <!-- Text content - Center aligned -->
        <div class="text-center">
          <p class="text-sm text-purple-900 mb-1">The body copy explains the empty state.</p>
          <p class="text-sm text-purple-900">The icon relates to the situation.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getUnicornStatus, getStatusColor, getStatusEmoji } from '../utils/statusUtils'

const props = defineProps({
  unicorn: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const showDetails = ref(false)

const status = computed(() => getUnicornStatus(props.unicorn.age))
const statusColor = computed(() => getStatusColor(status.value))
const statusEmoji = computed(() => getStatusEmoji(status.value))
const borderColorClass = computed(() => {
  const colors = ['bg-purple-500', 'bg-teal-500', 'bg-green-500', 'bg-orange-500', 'bg-red-800']
  return colors[props.index % colors.length]
})

function toggleDetails() {
  showDetails.value = !showDetails.value
}
</script>
