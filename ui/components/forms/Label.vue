<script setup>
import { twMerge } from 'tailwind-merge'

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: null,
  },
  ui: {
    type: Object,
    default: () => {
      return {
        base: '',
        size: '',
        margin: '',
        color: ''
      }
    },
  }
})
</script>

<template>
  <label
      :for="props.id"
      :class="[
          twMerge('inline-block', props.ui.base),
          twMerge('mb-1.5', props.ui.margin),
          twMerge('text-sm', props.ui.size),
          twMerge('opacity-80', props.ui.color)
      ]"
  >
    <slot />
    <span
        v-if="props.required"
        class="text-red-500"
    >
			*
		</span>
  </label>
</template>
