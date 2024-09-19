<script setup>
import {
  dangerColor,
  defaultColor,
  successColor,
  warningColor,
} from './input-styles'
import UInput from '#ui/components/forms/Input.vue'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  id: {
    type: String,
    default: null,
  },
  tabindex: {
    type: String,
    default: null,
  },
  value: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'classic',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
  },
  messageSuccess: {
    type: String,
    required: false,
    default: '',
  },
  messageWarning: {
    type: String,
    required: false,
    default: '',
  },
  messageDanger: {
    type: String,
    required: false,
    default: '',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  hideArrows: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'keyup', 'blur', 'paste', 'change', 'stopEdit'])

const moreThan5 = computed(() => {
  return value.value > 5
})

const colorInput = computed(() => {
  if (props.messageDanger) return dangerColor
  if (props.messageWarning) return warningColor
  if (props.messageSuccess) return successColor
  return defaultColor
})

const showInputNumber = computed(() => {
  if (props.type === 'classic') return true
  return props.type === 'grid' && moreThan5.value
})

const colorButton = computed(() => {
  return (val) => {
    if (value.value === val) return 'primary'
    return 'white'
  }
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', Number(value))
  },
})

const onChange = (event) => emit('change', Number( event.target.value))
const onKeyup = (event) => emit('keyup', Number(event.target.value))
const onBlur = (event) => emit('blur', Number(event.target.value))
const onPaste = (event) => emit('paste', Number(event.target.value))

const changeNumberWithButton = (val) => {
  moreThan5.value = false
  value.value = val
}

const onMoreThan5 = () => {
  moreThan5.value = !moreThan5.value
  if (value.value <= 5) {
    value.value = 6
  }
}
</script>

<template>
  <div>
    <slot name="label">
      <ULabel
          v-if="label"
          :for="id"
          :required="required"
      >
        {{ label }}
      </ULabel>
    </slot>

    <div class="flex gap-2">
      <template v-if="props.type === 'grid'">
          <UButton
              type="button"
              size="lg"
              :color="colorButton(1)"
              @click="changeNumberWithButton(1)"
          >
            1
          </UButton>

          <UButton
              type="button"
              size="lg"
              :color="colorButton(2)"
              @click="changeNumberWithButton(2)"
          >
            2
          </UButton>

          <UButton
              type="button"
              size="lg"
              :color="colorButton(3)"
              @click="changeNumberWithButton(3)"
          >
            3
          </UButton>

          <UButton
              type="button"
              size="lg"
              :color="colorButton(4)"
              @click="changeNumberWithButton(4)"
          >
            4
          </UButton>

          <UButton
              type="button"
              size="lg"
              :color="colorButton(5)"
              @click="changeNumberWithButton(5)"
          >
            5
          </UButton>

        <div
            v-if="!showInputNumber"
            class="bg-white"
        >
          <UButton
              type="button"
              color="white"
              size="lg"
              @click="onMoreThan5"
          >
            Más
          </UButton>
        </div>
      </template>

      <div
          v-if="showInputNumber"
          :class="props.type === 'grid' ? 'inline' : 'w-full h-full'"
      >
          <UInput
              :id="id"
              ref="inputForm"
              v-model="value"
              type="number"
              size="lg"
              :tabindex="tabindex"
              :placeholder="placeholder"
              :required="required"
              :disabled="disabled"
              :min="min"
              :max="max"
              :step="step"
              @keyup="onKeyup"
              @blur="onBlur"
              @paste="onPaste"
              @change="onChange"
          />
      </div>
    </div>

    <div
        v-if="messageDanger"
        class="text-sm text-red-500 mt-1"
    >
      {{ messageDanger }}
    </div>

    <div
        v-else-if="messageWarning"
        class="text-sm text-yellow-600 mt-1"
    >
      {{ messageWarning }}
    </div>

    <div
        v-else-if="messageSuccess"
        class="text-sm text-green-300 mt-1"
    >
      {{ messageSuccess }}
    </div>
  </div>
</template>
