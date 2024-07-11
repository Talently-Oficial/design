<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'text-primary-500',
  },
  icon: {
    type: String,
    default: 'i-ic-baseline-favorite',
  },
  title: {
    type: String,
    default: 'title',
  },
  total: {
    type: Number,
    default: 4,
  },
  completed: {
    type: Number,
    default: 0,
  },
  value: {
    type: String,
    default: '',
  },
})

const isOpen = ref(false)
</script>

<template>
  <UCard
      class="border hover:shadow"
      :ui="{ body: { padding: 'p-3 sm:p-3' } }"
      v-bind="$attrs"
  >
    <div
        v-if="props.icon"
        class="hidden xl:block text-neutral-100 mb-0.5"
    >
			<span
          v-for="count in props.total"
          :key="count"
          :class="props.completed >= count ? props.color : 'text-neutral-300'"
      >
				<UIcon :name="props.icon"/>
			</span>
    </div>

    <div class="text-xs text-neutral-500 flex items-center gap-1">
      <UIcon v-if="props.icon" class="xl:hidden flex-shrink-0 size-3"
             :class="props.color" :name="props.icon"/>

      <span>{{ props.title ? props.title : '--' }}</span>

      <UIcon
          name="i-ic-outline-info"
          class="text-primary-500 flex-shrink-0 size-3"
          @click="isOpen = true"
      />
    </div>

    <slot>
      <div class="font-bold text-lg text-neutral-700">{{ props.value ? props.value : '--' }}</div>
    </slot>

    <UModal
        v-model="isOpen"
        :ui="{ padding: 'p-0 sm:p-4', rounded: 'rounded-t-2xl sm:rounded-lg' }"
        :title="props.title"
        hidden-footer
    >
      <div class="space-y-6">
        <slot name="content-modal"/>

        <UButton
            variant="outline"
            color="black"
            block
            @click="isOpen = false"
        >
          {{ $t('Listo') }}
        </UButton>
      </div>
    </UModal>
  </UCard>
</template>
