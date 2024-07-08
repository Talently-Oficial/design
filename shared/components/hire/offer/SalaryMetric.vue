<script setup>
const {t: $t} = useI18n()

const props = defineProps({
  value: {
    type: String,
    default: 'none',
  },
})

const columnHeights = ['h-4', 'h-6', 'h-12', 'h-16', 'h-11', 'h-4']

const isOpen = ref(false)

const getInfo = computed(() => {
  const levelInfo = {
    high: {
      text: $t('Alto'),
      description: $t('Tu rango salarial está por encima del promedio.'),
      activeColumns: [6],
    },
    competitive: {
      text: $t('Competitivo'),
      description: $t('Tu rango salarial está dentro del promedio.'),
      activeColumns: [4],
    },
    low: {
      text: $t('Bajo'),
      description: $t('Tu rango salarial está por debajo del promedio.'),
      activeColumns: [2],
    },
    none: {
      text: '-',
      description: '-',
      activeColumns: [],
    },
  }

  return levelInfo[props.value] || levelInfo.none
})
</script>

<template>
  <div>
    <UCard
        class="border hover:shadow"
        :ui="{ body: { padding: 'p-3 sm:p-3' } }"
    >
      <div class="text-xs text-neutral-500 flex items-center">
        <span>{{ $t('Rango salarial') }}</span>
        <Icon
            name="uil:exclamation-circle"
            class="ml-1 text-primary-500"
            @click="isOpen = true"
        />
      </div>

      <div class="flex justify-between">
        <div>
          <div class="font-bold text-sm my-0.5 text-neutral-700">{{ getInfo.text }}</div>
          <span class="text-sm text-neutral-400 block leading-5">{{ getInfo.description }}</span>
        </div>

        <div class="flex items-end gap-0.5">
          <div
              v-for="(column, index) in columnHeights.length"
              :key="index"
              :class="[
							getInfo.activeColumns.includes(index + 1) ? 'bg-primary-500' : 'bg-neutral-100',
							'w-3',
							columnHeights[index],
							'rounded-sm',
						]"
          ></div>
        </div>
      </div>
    </UCard>

    <UModal
        v-model="isOpen"
        :ui="{ padding: 'p-0 sm:p-4', rounded: 'rounded-t-2xl sm:rounded-lg' }"
        :title="$t('Rango salarial')"
        hidden-footer
    >
      <div class="space-y-6">
        <slot name="content-modal"></slot>

        <UButton
            class="mt-7"
            variant="outline"
            color="black"
            block
            @click="isOpen = false"
        >
          {{ $t('Listo') }}
        </UButton>
      </div>
    </UModal>
  </div>
</template>
