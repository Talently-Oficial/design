<template>
  <button
    :class="classBtn"
    :disabled="disabled"
    class="inline-flex items-center justify-center outline-none relative focus:outline-none"
  >
    <span
      :class="[{ 'opacity-0': loading }]"
      class="flex items-center justify-center"
    >
      <slot />
    </span>

    <div
      v-if="loading"
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <CircleLoader
        :size="18"
        :border-color="colorLoaderBtn"
        border-width="border-2"
      />
    </div>
  </button>
</template>

<script>
import ButtonMixin from '~/components/button/ButtonMixin'

export default {
  name: 'Button',
  mixins: [ButtonMixin],
}
</script>
