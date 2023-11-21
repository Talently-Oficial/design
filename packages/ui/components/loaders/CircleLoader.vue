<template>
  <span
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
    class="animate-spin inline-block rounded-full border-b-transparent"
    :class="[borderWidth, borderColor]"
  />
</template>

<script>
export default {
  name: 'CircleLoader',
  props: {
    size: {
      type: Number,
      default: 38,
    },
    borderWidth: {
      type: String,
      default: 'border-4',
    },
    borderColor: {
      type: String,
      default: 'border-primary-500',
    },
  },
}
</script>
