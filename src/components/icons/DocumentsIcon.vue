<template>
  <svg
    :class="class"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.875 4.875H10.3125L6.37502 8.71154L6.37502 9.25962M10.875 4.875H15.375C16.6176 4.875 17.625 5.85653 17.625 7.06731L17.625 16.9327C17.625 18.1435 16.6176 19.125 15.375 19.125H8.625C7.38236 19.125 6.375 18.1435 6.375 16.9327L6.37502 9.25962M10.875 4.875V9.25962H6.37502"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
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
  stroke: {
    type: String,
    default: 'currentColor'
  }
})
</script>
