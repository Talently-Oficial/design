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
	maxlength: {
		type: Number,
		default: null,
	},
	minlength: {
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

const showCounter = computed(() => {
	return props.minlength !== null || props.maxlength !== null
})

const validatorCount = computed(() => {
	if (props.minlength && props.maxlength) {
		return {
			color: 'text-red-500',
			valid: true,
		}
	}

	if (props.minlength === null && props.maxlength) {
		return {
			color: 'text-red-500',
			valid: true,
		}
	}

	if (props.maxlength === null && props.minlength) {
		return {
			color: 'text-red-500',
			valid: true,
		}
	}

	return {
		color: '',
		valid: true,
	}
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

		<div :class="[colorInput, boxInputStyles({ disabled })]">
			<VueEditor
				v-model="value"
				:editor-toolbar="editorToolbar"
				:disabled="disabled"
				:placeholder="placeholder"
				class="ui-editor border-none w-full"
				:class="classes"
			/>
		</div>

		<div
			v-if="showCounter"
			class="mt-1.5 flex items-center justify-between text-gray-600"
		>
			<div class="text-xs">
				<span v-if="minlength && maxlength">
					{{
						$t('Entre {min} y {max} caracteres', {
							min: minlength,
							max: maxlength,
						})
					}}.
				</span>

				<span v-if="minlength === null && maxlength">
					{{ $t('Máximo de {max} caracteres', { max: maxlength }) }}.
				</span>

				<span v-if="maxlength === null && minlength">
					{{ $t('Mínimo de {min} caracteres', { min: minlength }) }}.
				</span>
			</div>

			<div class="text-xs">
				<span
					v-if="false"
					:class="validatorCount.color"
				>
					{{ validatorCount.valid }}
				</span>
				<span>{{ value.length }}{{ maxlength ? `/${maxlength}` : '' }}</span>
			</div>
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
.ui-editor.quillWrapper {
  > .ql-snow.ql-toolbar {
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
