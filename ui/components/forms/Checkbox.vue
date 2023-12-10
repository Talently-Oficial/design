<template>
  <div>
    <label
      class="relative cursor-pointer inline-flex"
      :class="classLabel ? classLabel : `items-center`"
    >
      <input
        :id="id"
        v-model="proxyChecked"
        :value="value"
        type="checkbox"
        class="absolute top-0 left-0 opacity-0"
      />

      <span
        class="w-5 h-5 rounded border-2 flex-shrink-0 relative"
        :class="[classCheckbox]"
      >
        <span
          v-if="isChecked"
          class="inline-flex items-center justify-center absolute top-0 left-0 w-full h-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4l-8 8Z"/></svg>
        </span>
      </span>

      <span class="pl-1.5">
        <slot />
      </span>
    </label>

    <div v-if="messageDanger" class="text-sm text-red-500 mt-2 ml-4 pl-4">
      {{ messageDanger }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    modelValue: {
      type: [Object, Array, Number, String, Boolean],
      default: null,
    },
    value: {
      type: [Object, Array, Number, String, Boolean],
      default: null,
    },
    id: {
      type: [String, Number],
      default: null,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    messageDanger: {
      type: String,
      required: false,
      default: '',
    },
    classLabel: {
      type: String,
      required: false,
      default: null,
    },
  },
  emits: ['update:modelValue', 'change'],
  computed: {
    proxyChecked: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
    isChecked() {
      return this.modelValue.some(item =>
          typeof item === 'object' ? JSON.stringify(item) === JSON.stringify(this.value) : item === this.value
      )
    },
    classCheckbox() {
      if (this.dark) {
        return [
          'border-white',
          this.isChecked ? 'bg-white text-primary-500' : '',
        ]
      }

      if (this.messageDanger && !this.isChecked) {
        return ['border-red-600']
      }

      return [
        'border-gray-500 text-white',
        this.isChecked ? 'bg-primary-500 border-primary-500' : '',
      ]
    },
  },
}
</script>
