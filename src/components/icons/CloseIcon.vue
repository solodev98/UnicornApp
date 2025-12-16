<template>
  <svg
    :class="class"
    :width="size"
    :height="size"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 24
  },
  class: {
    type: String,
    default: ''
  },
  strokeWidth: {
    type: [Number, String],
    default: 2
  }
})
</script>
