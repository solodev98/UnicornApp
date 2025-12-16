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
      d="M4 6h16M4 12h16M4 18h16"
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
