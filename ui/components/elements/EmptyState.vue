<template>
  <div class="text-center">
    <div class="mb-5">
      <slot name="graphic">
        <div class="rounded-full flex items-center justify-center m-auto w-18 h-18 bg-primary-500 bg-opacity-10">
            <UIcon
                name="i-ic-twotone-inbox"
                class="text-primary-500 w-6 h-6"
            />
        </div>
      </slot>
    </div>

    <h3 v-if="title" class="text-neutral-700 font-semibold mb-1 text-lg">
      {{ title }}
    </h3>

    <p v-if="description" class="text-gray-800 text-sm mb-2">
      {{ description }}
    </p>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
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
  },
};
</script>
