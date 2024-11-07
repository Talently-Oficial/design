<script setup lang="ts">
import Modal from '#ui/components/overlays/Modal.vue'
import Button from '#ui/components/elements/Button.vue'

const props = defineProps({
  // Nuxt UI
  transition: {
    type: Boolean,
    default: true,
  },
  ui: {
    type: Object,
    default: null,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  preventClose: {
    type: Boolean,
    default: false,
  },
  // Custom
  title: {
    type: String,
    default: 'Title',
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  hiddenHeader: {
    type: Boolean,
    default: false,
  },
  hiddenFooter: {
    type: Boolean,
    default: false,
  },
  uiCard: {
    type: Object,
    default: () => (
        {
          header: { padding: 'p-3 sm:py-4' },
          footer: { padding: 'p-3 sm:py-4' }
        }
    ),
  },
  hiddenCancel: {
    type: Boolean,
    default: false,
  },
  cancelText: {
    type: String,
    default: 'Cancelar',
  },
  cancelClass: {
    type: String,
    default: '',
  },
  cancelHandler: {
    type: Function,
    default: null
  },
  okText: {
    type: String,
    default: 'Aceptar',
  },
  okClass: {
    type: String,
    default: '',
  },
  okColor: {
    type: String,
    default: 'primary',
  },
  okTypeButton: {
    type: String,
    default: 'button',
  },
  okIdForm: {
    type: String,
    default: null,
  },
  okHandler: {
    type: Function,
    default: null
  },
  okLoading: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['close', 'cancel', 'ok'])
const model = defineModel()

const closeModalButton = () => {
  if (props.okLoading) return
  model.value = false
  emit('close', 'close-button')
}

const defaultCancelHandler = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
    return
  }
  model.value = false
  emit('close', 'cancel')
  emit('cancel')
}

const defaultOkHandler = () => {
  if (props.okIdForm && props.okTypeButton === 'submit') {
    return
  }

  if (props.okHandler) {
    props.okHandler()
    return
  }

  model.value = false
  emit('close', 'ok')
  emit('ok')
}
</script>

<template>
  <Modal
      v-model="model"
      :transition="props.transition"
      :overlay="props.overlay"
      :fullscreen="props.fullscreen"
      :preventClose="props.preventClose || props.okLoading"
      :ui="props.ui"
      @close="emit('close', 'overlay')"
  >
    <UCard class="h-full" :ui="props.uiCard">
      <template v-if="!hiddenHeader" #header>
        <slot name="header">
          <div class="flex items-center justify-between">
            <slot name="title">
              <h2 class="font-semibold text-gray-800">{{ props.title }}</h2>
            </slot>

            <button
                v-if="props.showClose"
                @click="closeModalButton"
                class="flex items-center"
                :disabled="props.okLoading"
            >
              <UIcon
                  class="text-xl leading-none text-gray-800"
                  name="i-heroicons-x-mark"
              />
            </button>
          </div>
        </slot>
      </template>

      <slot/>

      <template v-if="!props.hiddenFooter" #footer>
        <slot name="footer">
          <div class="flex items-center flex-wrap justify-end gap-2">
            <Button
                type="button"
                v-if="!props.hiddenCancel"
                color="white"
                size="md"
                @click="defaultCancelHandler"
                :disabled="props.okLoading"
                :class="props.cancelClass"
            >
              {{ props.cancelText }}
            </Button>

            <Button
                :type="okTypeButton"
                :form="okIdForm"
                size="md"
                :color="props.okColor"
                @click="defaultOkHandler"
                :loading="props.okLoading"
                :class="props.okClass"
            >
              {{ props.okText }}
            </Button>
          </div>
        </slot>
      </template>
    </UCard>
  </Modal>
</template>
