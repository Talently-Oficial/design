<script setup>
const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: null,
  },
  margin: {
    type: String,
    default: 'mb-1.5',
  },
})
</script>

<template>
  <label
      :for="props.id"
      class="inline-block text-sm"
      :class="[props.margin]"
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
