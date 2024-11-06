<script setup>
import { VueEditor } from 'vue3-editor'

import {
	boxInputStyles,
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
	maxLength: {
		type: Number,
		default: null,
	},
	minLength: {
		type: Number,
		default: null,
	},
	autocomplete: {
		type: String,
		default: null,
	},
	editorToolbar: {
		type: Array,
		default: () => [['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
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
	classes: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['update:modelValue', 'input', 'validation', 'focus', 'blur'])

const { t: $t } = useI18n()

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
		emit('input', value)
		emit('validation', value)
	},
})

const showCounterMax = computed(() => {
  return props.maxLength && props.minLength === null
})

const showCounterMin = computed(() => {
  if (props.minLength && props.maxLength === null) {
    return props.minLength > value.value.length
  }

  return false
})

const showCounterRange = computed(() => {
  return props.minLength && props.maxLength
})

const getTextMaxLength = computed(() => {
  const color = ''

  return $t('Caracteres máximos {count} de {max}', {
    count: `<span class="${color}">${value.value.length}</span>`,
    max: props.maxLength
  })
})

const getTextMinLength = computed(() => {
  let color = 'text-red-500'

  const porcentaje = Math.round((value.value.length / props.minLength) * 100)

  if (porcentaje >= 60 && porcentaje < 100) {
    color = 'text-orange-500'
  }

  if (porcentaje >= 100) {
    color = 'text-green-500'
  }

  return $t('Caracteres mínimos {count} de {min}', {
    count: `<span class="${color}">${value.value.length}</span>`,
    min: props.minLength
  })
})

const setPositionHeader = () => {
	const header = document.querySelector('#headerApp')

	if (header) {
		const headerEditor = document.querySelector('.quillWrapper.ui-editor .ql-toolbar')

		headerEditor.style.top = `${header.clientHeight}px`
	}
}

onMounted(() => {
	setPositionHeader()
})
</script>

<template>
	<div translate="no">
		<slot name="label">
			<ULabel
				v-if="label"
				:required="required"
			>
				{{ label }}
			</ULabel>
		</slot>

		<div :class="[colorInput, boxInputStyles({ disabled })]" class="items-stretch">
			<VueEditor
				v-model="value"
				:editor-toolbar="editorToolbar"
				:disabled="disabled"
				:placeholder="placeholder"
				class="ui-editor border-none w-full"
				:class="classes"
			/>
		</div>

		<div class="mt-1.5 text-right text-gray-600 text-xs italic" v-if="showCounterMax" v-html="getTextMaxLength" />

		<div class="mt-1.5 text-right text-gray-600 text-xs italic" v-if="showCounterMin" v-html="getTextMinLength" />

    <div class="mt-1.5 text-right text-gray-600 text-xs italic" v-if="showCounterRange">
      {{
            $t('Caracteres entre {min} y {max}', {
              min: minLength,
              max: maxLength,
            })
        }}
		</div>

		<div
			v-if="messageDanger"
			class="text-sm text-red-500 mt-1"
		>
			{{ messageDanger }}
		</div>
	</div>
</template>

<style>
.ui-editor {
  &.quillWrapper {
    display: flex;
    flex-direction: column;

    .ql-snow.ql-toolbar {
      padding: 4px;
      border: 0;
      border-bottom: 1px solid theme('colors.gray.300');
      top: 0;
      background: #fefefe;
      z-index: 10;
      @apply rounded-t;

      .ql-formats {
        margin: 0;
      }
    }

    .ql-snow .ql-toolbar button,
    .ql-snow.ql-toolbar button {
      padding: 9px 8px;
      width: initial;
      height: initial;

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .ql-toolbar.ql-snow .ql-picker-label {
      border: 0;
    }

    .ql-snow .ql-color-picker .ql-picker-label,
    .ql-snow .ql-icon-picker .ql-picker-label {
      padding: 7px 8px;
      line-height: 1;
    }

    .ql-container.ql-snow {
      border: 0;
    }

    .ql-snow .ql-picker.ql-header {
      top: 6px;
    }
  }

    .ql-editor.ql-blank:before {
      font-style: normal;
      left: 15px;
      pointer-events: none;
      position: absolute;
      right: 15px;
      @apply text-gray-400;
    }
}

  .content-editor,
  .quillWrapper .ql-editor {
    font-family: 'Inter', Helvetica, Arial, sans-serif;

    ol {
      padding-left: 1.5em;
      list-style: decimal;

      li {
        padding-left: 0;
      }
    }

    ul {
      padding-left: 1.5em;
      list-style: disc;

      li {
        padding-left: 0;

        &:not(.ql-direction-rtl) {
          padding-left: 0;
        }
      }
    }

    img {
      max-width: 100%;
    }

    p {
      margin: 13px 0;

      &:first-child {
        margin-top: 0;
      }
    }
  }
</style>
