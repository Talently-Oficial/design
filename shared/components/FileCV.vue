<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    default: '',
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const loadingFile = ref(false)

const getExtension = computed(() => {
  if (isValidHttpUrl(props.url)) return props.url.split('.').pop()
  return 'pdf'
})

const getURL = computed(() => {
  if (isValidHttpUrl(props.url)) return props.url
  return ''
})

const getNameFile = computed(() => {
  let texto = props.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  texto = texto.replace(/\s+/g, '_')
  return texto.toLowerCase() + '_cv'
})

const downloadFile = () => {
  loadingFile.value = true

  fetch(props.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', `${getNameFile.value}.pdf`)
        document.body.appendChild(link)
        link.click()

        link.parentNode?.removeChild(link)
      })
      .catch((error) => {
        console.error('Error downloading file', error)
      }).finally(() => {
    loadingFile.value = false
  })
}
</script>

<template>
  <div class="flex border border-gray-200 rounded-lg overflow-hidden">
    <span class="flex-shrink-0 border-r w-16 flex items-center justify-center transition-colors">
      <UIcon v-if="getExtension === 'pdf'" name="i-vscode-icons-file-type-pdf2" dynamic class="size-10"/>
      <UIcon v-else name="i-vscode-icons-file-type-word" dynamic class="size-10"/>
    </span>

    <div class="flex-1 flex justify-between items-center gap-3 p-3 truncate">
      <div class="flex-1 truncate">
        <div class="text-xs opacity-50">CV:</div>
        <span class="text-sm font-medium">
          <span v-if="props.disabled" class="opacity-50 cursor-not-allowed">
            {{ getNameFile }}.{{ getExtension }}
          </span>
          <a v-else :href="getURL" target="_blank" class="hover:underline hover:text-primary-500">
            {{ getNameFile }}.{{ getExtension }}
          </a>
        </span>
      </div>

      <div class="flex-shrink-0 flex gap-2">
        <UButton
            icon="i-ic-round-open-in-new"
            :disabled="props.disabled"
            :to="getURL"
            target="_blank"
            color="white"
            size="sm"
        >
          <span class="text-xs font-normal">{{ $t('Abrir') }}</span>
        </UButton>

        <UButton
            icon="i-ic-outline-file-download"
            :disabled="props.disabled"
            @click="downloadFile"
            color="white"
            size="sm"
            :loading="loadingFile"
        >
          <span class="text-xs font-normal">{{ $t('Descargar') }}</span>
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
