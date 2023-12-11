<script setup>
import { computed } from 'vue'
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
  label: {
    type: String,
    default: null,
  },
  styleTextarea: {
    type: [Object],
    default: null,
  },
  type: {
    type: String,
    default: 'text',
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
  color: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'md',
  },
  maxlength: {
    type: Number,
    default: null,
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
})

const emit = defineEmits(['update:modelValue', 'keyup', 'blur', 'paste'])

const colorInput = computed(() => {
  if (props.messageDanger) return dangerColor
  if (props.messageWarning) return warningColor
  if (props.messageSuccess) return successColor
  return defaultColor
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const onKeyup = (event) => emit('keyup', event.target.value)
const onBlur = (event) => emit('blur', event.target.value)
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
      <textarea
        :id="id"
        ref="inputForm"
        v-model="value"
        :placeholder="placeholder"
        :required="required"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :disabled="disabled"
        :class="inputStyles({ size, disabled })"
        :style="styleTextarea"
        :maxlength="maxlength"
        @keyup="onKeyup"
        @blur="onBlur"
        @paste="onPaste"
      />
    </div>

    <div
      v-if="maxlength && required"
      class="mt-1.5 flex items-center justify-between"
    >
      <div class="text-sm text-right text-gray-600">
        {{ value.length }} / {{ maxlength }}
      </div>
      <div></div>
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
