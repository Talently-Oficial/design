<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: false,
  },
})

const getNameFile = computed(() => {
  let texto = props.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  texto = texto.replace(/\s+/g, '_')
  return texto.toLowerCase()
})
</script>

<template>
  <div class="flex border border-gray-200 rounded-lg">
    <a :href="props.url" target="_blank" class="flex-shrink-0 border-r w-16 flex items-center justify-center transition-colors hover:bg-gray-50">
      <UIcon name="i-vscode-icons-file-type-pdf2" dynamic class="size-10"/>
    </a>

    <div class="flex-1 flex justify-between items-center gap-3 p-3">
      <div>
        <div class="text-xs opacity-50">CV:</div>
        <a :href="props.url" target="_blank" class="text-sm font-medium hover:underline hover:text-primary-500">
          {{ getNameFile }}.pdf
        </a>
      </div>

      <div class="flex gap-3">
        <UTooltip :text="$t('Descargar')">
          <a :href="props.url" :download="getNameFile" class="border rounded-full size-10 flex items-center justify-center hover:bg-gray-50">
            <UIcon name="i-heroicons-arrow-down-tray" />
          </a>
        </UTooltip>

        <UTooltip :text="$t('Abrir')">
          <a :href="props.url" target="_blank" class="border rounded-full size-10 flex items-center justify-center hover:bg-gray-50">
            <UIcon name="i-heroicons-arrow-top-right-on-square" />
          </a>
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
