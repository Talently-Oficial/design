<template>
  <div class="text-center">
    <div class="mb-5">
      <slot name="graphic">
        <div
            class="rounded-full flex items-center justify-center m-auto w-18 h-18 bg-opacity-10"
            :class="color"
        >
          <UIcon :name="props.icon" class=" w-6 h-6"/>
        </div>
      </slot>
    </div>

    <h3 v-if="props.title" class="text-primary-700 font-medium mb-1">
      {{ props.title }}
    </h3>

    <p v-if="props.description" class="text-gray-600 text-sm mb-2">
      {{ props.description }}
    </p>

    <slot />
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "bg-primary-500 text-primary-500",
  },
  icon: {
    type: String,
    required: false,
    default: "i-ic-twotone-inbox",
  },
  title: {
    type: String,
    required: false,
    default: "",
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
})
</script>
