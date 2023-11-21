<template>
  <span
    :style="{ height, width: computedWidth }"
    class="inline-block skeleton-box overflow-hidden relative"
    :class="[background, { 'rounded-full': rounded }]"
  />
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    background: {
      type: String,
      default: 'bg-gray-100',
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    maxWidth: {
      type: Number,
      default: 100,
    },
    minWidth: {
      type: Number,
      default: 80,
    },
    height: {
      default: '0.8em',
      type: String,
    },
    width: {
      default: '100px',
      type: String,
    },
  },
  computed: {
    computedWidth() {
      if (this.width) return this.width

      return `${Math.floor(
        Math.random() * (this.maxWidth - this.minWidth) + this.minWidth
      )}%`
    },
  },
}
</script>

<style scoped>
.skeleton-box {
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent 0,
      #e2e8f0 50%,
      transparent 100%
    );
    animation: loader 1s infinite cubic-bezier(0.4, 0, 0.2, 1);
  }
}

@keyframes loader {
  from {
    left: -150px;
  }
  to {
    left: 100%;
  }
}
</style>
