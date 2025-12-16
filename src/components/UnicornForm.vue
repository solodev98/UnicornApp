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
          @blur="validateField('name')"
          :class="['w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent', errors.name ? 'border-red-500' : 'border-gray-300']"
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
          max="150"
          required
          @blur="validateField('age')"
          :class="['w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent', errors.age ? 'border-red-500' : 'border-gray-300']"
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
          @blur="validateField('colour')"
          :class="['w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent', errors.colour ? 'border-red-500' : 'border-gray-300']"
          placeholder="Enter colour"
        />
        <p v-if="errors.colour" class="mt-1 text-sm text-red-600">{{ errors.colour }}</p>
      </div>

      <div class="flex justify-end gap-4 pt-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="bg-white border border-black text-gray-900 px-6 py-2 rounded-md transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
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
  age: '',
  colour: ''
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
  errors.colour = ''
}, { immediate: true })

function validateForm() {
  errors.name = ''
  errors.age = ''
  errors.colour = ''
  
  let isValid = true
  
  // Name validation
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required'
    isValid = false
  } else {
    const trimmedName = formData.name.trim()
    if (trimmedName.length < 2) {
      errors.name = 'Name must be at least 2 characters long'
      isValid = false
    } else if (trimmedName.length > 50) {
      errors.name = 'Name must not exceed 50 characters'
      isValid = false
    }
  }
  
  // Age validation
  if (formData.age === null || formData.age === undefined) {
    errors.age = 'Age is required'
    isValid = false
  } else {
    const age = Number(formData.age)
    if (isNaN(age)) {
      errors.age = 'Age must be a valid number'
      isValid = false
    } else if (age < 0) {
      errors.age = 'Age must be a positive number'
      isValid = false
    } else if (age < 1) {
      errors.age = 'Age must be at least 1'
      isValid = false
    } else if (age > 150) {
      errors.age = 'Age must not exceed 150'
      isValid = false
    } else if (!Number.isInteger(age)) {
      errors.age = 'Age must be a whole number'
      isValid = false
    }
  }
  
  // Colour validation (optional field, but validate length if provided)
  if (formData.colour && formData.colour.trim().length > 30) {
    errors.colour = 'Colour must not exceed 30 characters'
    isValid = false
  }
  
  return isValid
}

function validateField(fieldName) {
  // Clear the error for this field first
  errors[fieldName] = ''
  
  switch (fieldName) {
    case 'name':
      if (!formData.name || formData.name.trim() === '') {
        errors.name = 'Name is required'
      } else {
        const trimmedName = formData.name.trim()
        if (trimmedName.length < 2) {
          errors.name = 'Name must be at least 2 characters long'
        } else if (trimmedName.length > 50) {
          errors.name = 'Name must not exceed 50 characters'
        }
      }
      break
      
    case 'age':
      if (formData.age === null || formData.age === undefined) {
        errors.age = 'Age is required'
      } else {
        const age = Number(formData.age)
        if (isNaN(age)) {
          errors.age = 'Age must be a valid number'
        } else if (age < 0) {
          errors.age = 'Age must be a positive number'
        } else if (age < 1) {
          errors.age = 'Age must be at least 1'
        } else if (age > 150) {
          errors.age = 'Age must not exceed 150'
        } else if (!Number.isInteger(age)) {
          errors.age = 'Age must be a whole number'
        }
      }
      break
      
    case 'colour':
      if (formData.colour && formData.colour.trim().length > 30) {
        errors.colour = 'Colour must not exceed 30 characters'
      }
      break
  }
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

