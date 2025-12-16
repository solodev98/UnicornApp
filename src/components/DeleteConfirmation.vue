<template>
  <Modal :show="show" @close="$emit('cancel')">
    <div class="p-6">
      <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
        <DeleteIcon :size="24" class="text-red-600" />
      </div>
      
      <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">
        Delete Unicorn
      </h3>
      
      <p class="text-sm text-gray-600 text-center mb-6">
        Are you sure you want to delete <strong>"{{ unicornName }}"</strong>? This action cannot be undone.
      </p>
      
      <div class="flex gap-3">
        <button
          @click="$emit('cancel')"
          class="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue'
import DeleteIcon from './icons/DeleteIcon.vue'

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  unicornName: {
    type: String,
    required: true
  }
})

defineEmits(['confirm', 'cancel'])
</script>
