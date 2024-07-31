<script setup>
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const model = defineModel()
const phone = defineModel('phone')
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

const emit = defineEmits(['validate', 'blur', 'country-changed'])

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
const phoneObjectLocal = ref({})
const countryDataLocal = ref({})

const getMergedPhoneObject = computed(() => {
  return {
    ...phoneObjectLocal.value,
    ...countryDataLocal.value,
  }
})

const countryChanged = (countryObject) => {
  countryDataLocal.value = countryObject

  if (!countryObject.dialCode) return

  country.value = countryObject.dialCode

  emit('country-changed', getMergedPhoneObject.value)
}

const phoneInput = (_, phoneObject) => {
  phoneObjectLocal.value = phoneObject

  if (!phoneObject.nationalNumber) return
  phone.value =phoneObject.nationalNumber
}

const phoneValidate = (phoneObject) => {
  emit('validate', phoneObject?.valid || false)
}

const phoneBlur = () => {
  emit('blur', getMergedPhoneObject.value)
}

onMounted(() => {
  if (model.value) {
    phone.value = model.value
  }
})
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
        v-model="model"
        :tabindex="tabindex"
        class="input-phone"
        :input-options="inputOptions"
        :dropdown-options="dropdownOptions"
        :valid-characters-only="true"
        :default-country="country"
        :auto-default-country="false"
        :auto-format="true"
        :required="required"
        :disabled="disabled"
        @country-changed="countryChanged"
        @on-input="phoneInput"
        @validate="phoneValidate"
        @blur="phoneBlur"
    />
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
    @apply m-0 placeholder-neutral-500 text-gray-900 py-2 px-3 rounded-r-lg;
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
