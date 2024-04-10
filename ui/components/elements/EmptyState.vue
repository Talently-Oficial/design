<template>
  <div class="text-center py-4 px-6">
    <div
      class="rounded-full flex items-center justify-center m-auto mb-4"
      :class="[sizeCircle, colorCircle]"
    >
      <slot name="icon">
        <Icon name="heroicons:exclamation-triangle" size="28" />
      </slot>
    </div>

    <p v-if="title" class="text-gray-800 mb-2">
      {{ title }}
    </p>

    <div><slot /></div>
  </div>
</template>

<script>
export default {
  props: {
    sizeCircle: {
      type: String,
      default: "w-24 h-24",
    },
    colorCircle: {
      type: String,
      default: "bg-yellow-50 text-yellow-600 bg-opacity-50",
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>
