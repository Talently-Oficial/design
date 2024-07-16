<script setup lang="ts">

</script>

<template>
  <span class="ellipsis-anim">
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </span>
</template>

<style scoped>
.ellipsis-anim span {
  opacity: 0;
  animation: ellipsis-dot 1s infinite;
}

.ellipsis-anim span:nth-child(1) {
  animation-delay: 0.0s;
}

.ellipsis-anim span:nth-child(2) {
  animation-delay: 0.1s;
}

.ellipsis-anim span:nth-child(3) {
  animation-delay: 0.2s;
}

@-webkit-keyframes ellipsis-dot {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes ellipsis-dot {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
