<script setup>
defineProps({
  isHidden: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: null,
  },
  margin: {
    type: String,
    default: 'mb-1',
  },
})
</script>

<template>
  <label
    :for="id"
    class="mb-1.5 inline-block text-sm text-primary-900"
    :class="[{ 'sr-only': isHidden }, margin]"
  >
    <slot />
  </label>
</template>
