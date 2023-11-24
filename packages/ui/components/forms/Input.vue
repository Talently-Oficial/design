<script setup>
import { computed } from 'vue'
import Label from './Label.vue'
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
  maxLength: {
    type: Number,
    required: false,
    default: 524288,
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
      <span v-if="$slots.slotLeft" class="pl-3 -mr-1 relative z-10">
        <slot name="slotLeft" />
      </span>

      <input
        :id="id"
        ref="inputRef"
        v-model="value"
        :type="type"
        :tabindex="tabindex"
        :placeholder="placeholder"
        :required="required"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :maxlength="maxLength"
        :class="inputStyles({ size, disabled })"
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
