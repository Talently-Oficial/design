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
          body: { padding: 'px-4 sm:px-6 py-0 sm:py-0' }
        }
    ),
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  okText: {
    type: String,
    default: 'Ok',
  },
  okColor: {
    type: String,
    default: 'primary',
  },
})

const model = defineModel()
</script>

<template>
  <Modal
      v-model="model"
      :transition="props.transition"
      :overlay="props.overlay"
      :fullscreen="props.fullscreen"
      :preventClose="props.preventClose"
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
                v-if="showClose"
                @click="model = false"
                class="flex items-center"
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

      <template v-if="!hiddenFooter" #footer>
        <slot name="footer">
          <div class="flex items-center justify-end gap-2">
            <Button
                color="white"
                size="md"
                @click="model = false"
            >
              {{ cancelText }}
            </Button>

            <Button
                size="md"
                @click="model = false"
            >
              {{ okText }}
            </Button>
          </div>
        </slot>
      </template>
    </UCard>
  </Modal>
</template>
