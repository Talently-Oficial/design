<template>
  <a
    :href="to"
    :target="target"
    :class="[classBtn, classButton]"
    class="inline-flex items-center justify-center outline-none relative focus:outline-none"
    @click.prevent="goTo"
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
  </a>
</template>

<script>
import ButtonMixin from './ButtonMixin'

export default {
  name: 'ButtonLink',
  mixins: [ButtonMixin],
  props: {
    to: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '',
    },
    classButton: {
      type: String,
      default: '',
    },
  },
  methods: {
    goTo() {
      if (this.disabled) return
      this.$emit('click', this.to)
      if (this.target) {
        window.open(this.to, this.target)
        return
      }
      this.$router.push(this.to)
    },
  },
}
</script>
