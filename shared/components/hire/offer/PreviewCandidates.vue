<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  value: null | number
}>()
</script>

<template>
  <UCard :ui="{ background: 'bg-neutral-700', base: 'text-white text-center' }">
    <div class="flex flex-col gap-3 py-2">
      <div class="hidden">
        <UAvatarGroup size="xs">
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
        </UAvatarGroup>
      </div>

      <span class="text-4.6xl font-bold">
        <template v-if="props.value">
          {{ props.value }}
        </template>
        <template v-else>
          ----
        </template>
      </span>

      <div>
        <h3 class="font-medium text-lg mb-3">{{ props.title }}</h3>
        <p class="text-sm opacity-80">
          {{ props.description }}
        </p>
      </div>
    </div>
  </UCard>
</template>

<style scoped>

</style>
