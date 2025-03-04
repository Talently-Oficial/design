<script setup>
import UInput from '#ui/components/forms/Input.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  textCopy: {
    type: String,
    default: 'Copiar',
  },
  textCopied: {
    type: String,
    default: 'Copiado',
  },
})

const {copy} = useClipboard()

const copied = ref(false)
const uiInput = {
  base: 'disabled:pointer-events-none',
  icon: {
    trailing: {
      wrapper: 'z-10',
      pointer: 'pointer-events-auto',
    },
  },
}

const copyUrl = () => {
  copy(props.modelValue)
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <UInput
      :model-value="modelValue"
      :ui="uiInput"
  >
    <template #trailing>
      <UTooltip :text="copied ? props.textCopied : props.textCopy">
        <UButton
            :color="copied ? 'green' : 'gray'"
            size="xs"
            square
            variant="link"
            class="-mr-2"
            @click="copyUrl"
        >
          <UIcon
              :name="copied ? 'i-material-symbols-check' : 'i-material-symbols-content-copy-outline'"
              class="size-5"
          />
        </UButton>
      </UTooltip>
    </template>
  </UInput>
</template>
