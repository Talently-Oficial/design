<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'logo'
  },
  dark: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <div>
    <template v-if="props.type === 'logo'">
      <img
          v-if="!props.dark"
          src="https://cdn.talently.tech/talently-logo.svg"
          alt="Talently"
          class="w-full h-auto block"
          loading="lazy"
      >
      <img
          v-else
          src="https://cdn.talently.tech/talently-logo-white.svg"
          alt="Talently"
          class="w-full h-auto block"
          loading="lazy"
      >
    </template>

    <template v-if="props.type === 'iso'">
      <img
          v-if="!props.dark"
          src="https://cdn.talently.tech/talently-iso_1724347624481.svg"
          alt="Talently"
          class="w-full h-auto"
      >
      <img
          v-else
          src="https://cdn.talently.tech/talently-iso-white_1724347624480.svg"
          alt="Talently"
          class="w-full h-auto"
      >
    </template>

    <template v-if="props.type === 'match'">
      <img
          v-if="!props.dark"
          src="https://cdn.talently.tech/talently-logo-match.svg"
          alt="Talently"
          class="w-full h-auto block"
      >
      <img
          v-else
          src="https://cdn.talently.tech/talently-logo-match-white.svg"
          alt="Talently"
          class="w-full h-auto block"
          loading="lazy"
      >
    </template>

    <template v-if="props.type === 'hire'">
      <img
          v-if="!props.dark"
          src="https://cdn.talently.tech/talently-logo-hire.svg"
          alt="Talently"
          class="w-full h-auto block"
          loading="lazy"
      >
      <img
          v-else
          src="https://cdn.talently.tech/talently-logo-hire-white.svg"
          alt="Talently"
          class="w-full h-auto block"
          loading="lazy"
      >
    </template>
  </div>
</template>
