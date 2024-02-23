<script setup>
import {
  boxInputStyles,
  inputStyles,
  dangerColor,
  defaultColor,
  successColor,
  warningColor,
} from './input-styles'

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
    if (value.value === val) return 'border-primary-500 bg-primary-500 bg-opacity-5 text-primary-500'
    return 'border bg-white hover:border-primary-500'
  }
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const onChange = (event) => emit('change', event.target.value)
const onKeyup = (event) => emit('keyup', event.target.value)
const onBlur = (event) => emit('blur', event.target.value)
const onPaste = (event) => emit('paste', event.target.value)

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
        {{ label }} {{ step }}
      </ULabel>
    </slot>

    <div class="flex gap-2">
      <template v-if="props.type === 'grid'">
        <div class="bg-white">
          <UButton
              type="button"
              :color="colorButton(1)"
              size="px-3.5 py-3 text-sm"
              @click="changeNumberWithButton(1)"
          >
            1
          </UButton>
        </div>
        <div class="bg-white">
          <UButton
              type="button"
              :color="colorButton(2)"
              size="px-3.5 py-3 text-sm"
              @click="changeNumberWithButton(2)"
          >
            2
          </UButton>
        </div>
        <div class="bg-white">
          <UButton
              type="button"
              :color="colorButton(3)"
              size="px-3.5 py-3 text-sm"
              @click="changeNumberWithButton(3)"
          >
            3
          </UButton>
        </div>
        <div class="bg-white">
          <UButton
              type="button"
              :color="colorButton(4)"
              size="px-3.5 py-3 text-sm"
              @click="changeNumberWithButton(4)"
          >
            4
          </UButton>
        </div>
        <div class="bg-white">
          <UButton
              type="button"
              :color="colorButton(5)"
              size="px-3.5 py-3 text-sm"
              @click="changeNumberWithButton(5)"
          >
            5
          </UButton>
        </div>
        <div
            v-if="!showInputNumber"
            class="bg-white"
        >
          <UButton
              type="button"
              color="border bg-white hover:border-primary-500"
              size="px-3.5 py-3 text-sm"
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
        <div
            class="h-full"
            :class="[colorInput, boxInputStyles({ disabled })]"
        >
          <input
              :id="id"
              ref="inputForm"
              v-model="value"
              type="number"
              :tabindex="tabindex"
              :placeholder="placeholder"
              :required="required"
              :disabled="disabled"
              :class="[inputStyles({ size, disabled }), hideArrows && 'number-input-hide-arrows']"
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
