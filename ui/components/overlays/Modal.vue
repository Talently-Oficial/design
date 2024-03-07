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
          divide : 'divide-y-0',
          header: {padding: 'pb-0 sm:pb-0'},
          footer: {padding: 'pt-0 sm:pt-0'}
        }
    ),
  },
  hiddenCancel: {
    type: Boolean,
    default: false,
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  cancelHandler: {
    type: Function,
    default: null
  },
  okText: {
    type: String,
    default: 'Ok',
  },
  okColor: {
    type: String,
    default: 'primary',
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

const model = defineModel()

const closeModalButton = () => {
  if (props.okLoading) return
  model.value = false
}

const defaultCancelHandler = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
    return
  }
  model.value = false
}

const defaultOkHandler = () => {
  if (props.okHandler) {
    props.okHandler()
    return
  }
  model.value = false
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
  >
    <UCard class="h-full" :ui="props.uiCard">
      <template v-if="!hiddenHeader" #header>
        <slot name="header">
          <div class="flex items-center justify-between">
            <slot name="title">
              <h2 class="font-semibold">{{ props.title }}</h2>
            </slot>

            <button
                v-if="props.showClose"
                @click="closeModalButton"
                class="flex items-center"
                :disabled="props.okLoading"
            >
              <UIcon
                  class="text-xl leading-none"
                  name="i-heroicons-x-mark"
                  size="30"
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
            >
              {{ props.cancelText }}
            </Button>

            <Button
                type="button"
                size="md"
                :color="props.okColor"
                @click="defaultOkHandler"
                :loading="props.okLoading"
            >
              {{ props.okText }}
            </Button>
          </div>
        </slot>
      </template>
    </UCard>
  </Modal>
</template>
