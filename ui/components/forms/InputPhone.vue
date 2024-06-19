<script setup>
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const model = defineModel()
const country = defineModel('country')

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  tabindex: {
    type: String,
    default: '1',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Número de celular',
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'on',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['validate', 'blur'])

const dropdownOptions = ref({
  showFlags: true,
  showSearchBox: true,
  showDialCodeInSelection: true,
  tabindex: props.tabindex - 1,
})
const inputOptions = ref({
  placeholder: props.placeholder,
  id: props.id,
  required: true,
  autocomplete: props.autocomplete,
})
const showErrors = ref(false)
const errors = ref({
  phone: '',
  country_code: '',
})

const countryChanged = (data) => {
  if (!data.dialCode) return
  country.value = Number(data.dialCode)
}

const phoneInput = () => {
  let phone =  model.value.replace(/ /g, '')
  const prefix = `+${country.value}`

  if (phone.includes(prefix)) {
    phone = phone.substring(prefix.length)
  }

  model.value = phone
}

const phoneValidate = (phoneObject) => {
  emit('validate', phoneObject?.valid || false)

  if (phoneObject?.valid) {
    errors.value.phone = ''
  } else {
    errors.value.phone = 'Número de teléfono inválido'
  }
}

const phoneBlur = () => {
  showErrors.value = true
  emit('blur')
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

    <VueTelInput
        ref="pluginPhone"
        v-model="model"
        :tabindex="tabindex"
        class="input-phone"
        :input-options="inputOptions"
        :dropdown-options="dropdownOptions"
        :valid-characters-only="true"
        :default-country="country"
        :auto-default-country="false"
        :auto-format="false"
        :required="required"
        :disabled="disabled"
        @country-changed="countryChanged"
        @input="phoneInput"
        @validate="phoneValidate"
        @blur="phoneBlur"
    />

    <div
        v-if="errorMessage || (errors.phone && showErrors)"
        class="text-sm text-red-500 mt-1"
    >
      {{ errorMessage || errors.phone }}
    </div>
  </div>
</template>

<style>
.input-phone.vue-tel-input {
  @apply border-2 border-gray-200 border-opacity-80 bg-white rounded-lg;

  &:focus-within {
    box-shadow: none;
    @apply border-primary-500;
  }

  .vti__dropdown {
    @apply bg-transparent border-r;

    &:hover,
    &:focus {
      @apply bg-transparent;
    }
  }

  .vti__dropdown-arrow {
    transform: scale(.5);
    margin-left: 3px;
  }

  .vti__selection {
    @apply border-0;
  }

  .vti__input {
    @apply m-0 placeholder-neutral-500 border-gray-200 text-sm rounded-l-none rounded-r-lg;
    padding: 0.7rem;
  }

  .vti__dropdown-list {
    z-index: 1000;
    max-height: 250px;
    @apply border-gray-200;

    &.below,
    &.above {
      width: 250px;
      padding: 0;
      @apply rounded-lg;
    }
  }

  .vti__dropdown-list.below {
    top: 48px;
  }

  .vti__search_box {
    @apply rounded-lg p-2;
    box-sizing: border-box;
    margin: 8px;
    width: calc(100% - 16px);
  }

  .vti__dropdown-item {
    padding: 10px 6px;
    @apply flex items-center text-neutral-700 text-sm;

    strong {
      @apply font-medium;
    }
  }

  .vti__dropdown-item .vti__flag {
    @apply mr-2.5;
  }
}
</style>
