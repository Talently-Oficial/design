<script setup>
import Label from '~/components/forms/Label.vue'

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
    type: [String, Number],
    default: '',
  },
  id: {
    type: String,
    default: null,
  },
  tabindex: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'text',
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
  autocomplete: {
    type: String,
    default: null,
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
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  onlyNumbers: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'keyup', 'blur', 'paste'])

const inputNumber = ref(null)

const colorInput = computed(() => {
  if (props.messageDanger) return dangerColor
  if (props.messageWarning) return warningColor
  if (props.messageSuccess) return successColor
  return defaultColor
})

watch(() => props.modelValue, (value) => {
  if (value < props.min) {
    inputNumber.value.value = props.min
    emit('update:modelValue', props.min)
  }

  if (value > props.max) {
    inputNumber.value.value = props.max
    emit('update:modelValue', props.max)
  }
})

const onInput = (event) => {
  if (props.onlyNumbers && ['e', 'E', '+', '-', '%'].includes(event.data)) {
    inputNumber.value.value = props.modelValue
    return
  }

  emit('update:modelValue', inputNumber.value.value)
}

const onKeyup = (event) => {
  if (props.onlyNumbers && ['e', 'E', '+', '-', '%'].includes(event.data)) {
    inputNumber.value.value = props.modelValue
    return
  }

  emit('update:modelValue', inputNumber.value.value)
}

const onBlur = (event) => {
  if (inputNumber) {
    emit('update:modelValue', event.target.value)
  }
}

const onPaste = (event) => emit('paste', event.target.value)
</script>

<template>
  <div>
    <slot name="label">
      <Label v-if="label" :for="id">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </Label>
    </slot>

    <div :class="[colorInput, boxInputStyles({ disabled })]">
      <span v-if="$slots.slotLeft" class="pl-3 -mr-1 relative z-10">
        <slot name="slotLeft" />
      </span>

      <input
          :id="id"
          ref="inputNumber"
          :value="props.modelValue"
          type="number"
          :tabindex="tabindex"
          :placeholder="placeholder"
          :required="required"
          :autocomplete="autocomplete"
          :disabled="disabled"
          :class="inputStyles({ size, disabled })"
          @input="onInput"
          @keyup="onKeyup"
          @blur="onBlur"
          @paste="onPaste"
      />

      <span v-if="$slots.slotRight" class="pr-3 -ml-1 relative z-10">
        <slot name="slotRight" />
      </span>
    </div>

    <div v-if="messageDanger" class="text-sm text-red-500 mt-1">
      {{ messageDanger }}
    </div>

    <div v-else-if="messageWarning" class="text-sm text-yellow-600 mt-1">
      {{ messageWarning }}
    </div>

    <div v-else-if="messageSuccess" class="text-sm text-green-500 mt-1">
      {{ messageSuccess }}
    </div>
  </div>
</template>
