<template>
  <div class="p-6">
    <!-- Modal Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">
        {{ isEditing ? 'Edit Unicorn' : 'Create New Unicorn' }}
      </h2>
      <button
        @click="$emit('cancel')"
        class="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter unicorn name"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>

      <div>
        <label for="age" class="block text-sm font-medium text-gray-700 mb-1">
          Age *
        </label>
        <input
          id="age"
          v-model.number="formData.age"
          type="number"
          min="0"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter age"
        />
        <p v-if="errors.age" class="mt-1 text-sm text-red-600">{{ errors.age }}</p>
      </div>

      <div>
        <label for="colour" class="block text-sm font-medium text-gray-700 mb-1">
          Colour
        </label>
        <input
          id="colour"
          v-model="formData.colour"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter colour"
        />
      </div>

      <div class="flex gap-4 pt-4">
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
        </button>
        <button
          type="button"
          @click="$emit('cancel')"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, reactive, computed } from 'vue'
import { useUnicornStore } from '../stores/unicornStore'

const props = defineProps({
  unicorn: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['success', 'cancel'])

const store = useUnicornStore()
const loading = computed(() => store.loading)

const isEditing = computed(() => !!props.unicorn)

const formData = reactive({
  name: '',
  age: null,
  colour: ''
})

const errors = reactive({
  name: '',
  age: ''
})

// Populate form when editing
watch(() => props.unicorn, (newUnicorn) => {
  if (newUnicorn) {
    formData.name = newUnicorn.name || ''
    formData.age = newUnicorn.age || null
    formData.colour = newUnicorn.colour || ''
  } else {
    // Reset form
    formData.name = ''
    formData.age = null
    formData.colour = ''
  }
  // Clear errors
  errors.name = ''
  errors.age = ''
}, { immediate: true })

function validateForm() {
  errors.name = ''
  errors.age = ''
  
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required'
    return false
  }
  
  if (formData.age === null || formData.age === undefined || formData.age < 0) {
    errors.age = 'Age must be a positive number'
    return false
  }
  
  return true
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }
  
  const success = isEditing.value
    ? await store.editUnicorn(props.unicorn._id, formData)
    : await store.addUnicorn(formData)
  
  if (success) {
    emit('success', { ...formData })
    // Reset form
    formData.name = ''
    formData.age = null
    formData.colour = ''
  }
}
</script>

