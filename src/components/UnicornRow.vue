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
      <div class="flex flex-col items-center justify-center gap-4 rounded-[12px] p-6" style="background-color: rgba(78, 70, 180, 0.1);">
        <!-- Icon with red notification badge -->
        <div class="relative flex-shrink-0">
          <svg class="w-12 h-12" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6.09375C16.1351 6.09375 17.0553 7.01393 17.0553 8.14904C17.0553 8.33569 17.1769 8.49946 17.3523 8.56354C17.5344 8.6301 17.7129 8.70417 17.8874 8.78538C18.0568 8.86423 18.2589 8.83448 18.3911 8.70233C19.1937 7.8997 20.495 7.8997 21.2977 8.70233C22.1003 9.50497 22.1003 10.8063 21.2977 11.609C21.1655 11.7411 21.1358 11.9432 21.2146 12.1127C21.2958 12.2872 21.3699 12.4656 21.4365 12.6478C21.5006 12.8231 21.6643 12.9447 21.851 12.9447C22.9861 12.9447 23.9062 13.8649 23.9062 15C23.9062 16.1351 22.9861 17.0553 21.851 17.0553C21.6643 17.0553 21.5006 17.1769 21.4365 17.3522C21.3699 17.5344 21.2958 17.7129 21.2146 17.8874C21.1357 18.0568 21.1655 18.2589 21.2977 18.3911C22.1003 19.1937 22.1003 20.495 21.2977 21.2977C20.495 22.1003 19.1937 22.1003 18.3911 21.2977C18.2589 21.1655 18.0568 21.1358 17.8874 21.2146C17.7129 21.2958 17.5344 21.3699 17.3523 21.4365C17.1769 21.5005 17.0553 21.6643 17.0553 21.851C17.0553 22.9861 16.1351 23.9062 15 23.9062C13.8649 23.9062 12.9447 22.9861 12.9447 21.851C12.9447 21.6643 12.8231 21.5005 12.6477 21.4365C12.4656 21.3699 12.2872 21.2958 12.1127 21.2146C11.9432 21.1358 11.7411 21.1655 11.609 21.2977C10.8063 22.1003 9.50497 22.1003 8.70233 21.2977C7.8997 20.495 7.8997 19.1937 8.70233 18.3911C8.83449 18.2589 8.86426 18.0568 8.7854 17.8874C8.70418 17.7129 8.63009 17.5344 8.56352 17.3522C8.49944 17.1769 8.33568 17.0553 8.14904 17.0553C7.01393 17.0553 6.09375 16.1351 6.09375 15C6.09375 13.8649 7.01393 12.9447 8.14904 12.9447C8.33568 12.9447 8.49944 12.8231 8.56352 12.6478C8.63009 12.4656 8.70417 12.2871 8.78539 12.1126C8.86424 11.9432 8.83448 11.7411 8.70233 11.609C7.8997 10.8063 7.8997 9.50497 8.70233 8.70233C9.50497 7.8997 10.8063 7.8997 11.609 8.70233C11.7411 8.83448 11.9432 8.86424 12.1126 8.78539C12.2871 8.70418 12.4656 8.63011 12.6477 8.56354C12.8231 8.49946 12.9447 8.33569 12.9447 8.14904C12.9447 7.01393 13.8649 6.09375 15 6.09375Z" stroke="#928AFF"/>
            <path d="M18.9583 15C18.9583 17.1861 17.1861 18.9583 15 18.9583C12.8139 18.9583 11.0417 17.1861 11.0417 15C11.0417 12.8139 12.8139 11.0417 15 11.0417C17.1861 11.0417 18.9583 12.8139 18.9583 15Z" stroke="#928AFF"/>
            <rect x="18" width="12" height="12" rx="6" fill="white"/>
            <rect x="18" width="12" height="12" rx="6" fill="#FF4E64" fill-opacity="0.12"/>
            <path d="M21.75 3.75L24 6M24 6L21.75 8.25M24 6L26.25 8.25M24 6L26.25 3.75" stroke="#FF4E64" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <!-- Text content - Center aligned -->
        <div class="text-center">
          <p class="text-sm mb-1" style="color: #4e46b4;">The body copy explains the empty state.</p>
          <p class="text-sm" style="color: #4e46b4;">The icon relates to the situation.</p>
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
  const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500']
  return colors[props.index % colors.length]
})

function toggleDetails() {
  showDetails.value = !showDetails.value
}
</script>
