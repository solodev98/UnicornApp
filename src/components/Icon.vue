<template>
  <svg
    :class="iconClass"
    :width="size"
    :height="size"
    :viewBox="iconData.viewBox"
    :fill="fill"
    :stroke="stroke"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <component v-if="iconData.component" :is="iconData.component" />
    <g v-else-if="iconData.paths" v-for="(path, index) in iconData.paths" :key="index">
      <path
        v-for="(p, pIndex) in (Array.isArray(path) ? path : [path])"
        :key="pIndex"
        v-bind="p"
      />
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { icons } from '../icons'

const props = defineProps({
  name: {
    type: String,
    required: true,
    validator: (value) => {
      if (!icons[value]) {
        console.warn(`Icon "${value}" not found in icon registry`)
        return false
      }
      return true
    }
  },
  size: {
    type: [Number, String],
    default: 24
  },
  class: {
    type: String,
    default: ''
  },
  fill: {
    type: String,
    default: 'none'
  },
  stroke: {
    type: String,
    default: 'currentColor'
  }
})

const iconData = computed(() => icons[props.name] || icons.placeholder)

const iconClass = computed(() => {
  return [
    props.class,
    iconData.value.class || ''
  ].filter(Boolean).join(' ')
})
</script>
