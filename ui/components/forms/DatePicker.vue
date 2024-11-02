<script setup lang="ts">
import DatePicker from 'vue-datepicker-next'
import UInput from '#ui/components/forms/Input.vue'
import lang from 'vue-datepicker-next/locale/es'

const model = defineModel({default: null})

const props = defineProps({
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  valueType: {
    type: String,
    default: 'date'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'Seleccionar fecha'
  },
  type: {
    type: String,
    default: 'date', // date, month, year
  },
})

const emit = defineEmits(['change', 'clear','open', 'close'])

const change = (date) => {
  if (!date) return
  emit('change', date)
}

const clear = () => {
  emit('clear', model.value)
}

const open = () => {
  emit('open', model.value)
}

const close = () => {
  emit('close',  model.value)
}
</script>

<template>
  <DatePicker
      v-model:value="model"
      data-cy="date-picker"
      :value-type="props.valueType"
      :format="props.format"
      :type="props.type"
      class="ui-datepicker w-full min-w-full"
      @change="change"
      @clear="clear"
      @open="open"
      @close="close"
      :disabled="props.disabled"
      :lang="lang"
  >
    <template #icon-calendar>
      <UIcon name="i-material-symbols-calendar-month-outline"/>
    </template>

    <template #input="{ value }">
      <slot :value="value">
        <UInput
            :disabled="props.disabled"
            autocomplete="off"
            name="date"
            type="text"
            :placeholder="placeholder"
            :model-value="value"
            readonly
        />
      </slot>
    </template>
  </DatePicker>
</template>

<style>
.mx-datepicker-main {
  color: #000;

  .mx-btn {
    color: #000;

    &:hover {
      @apply text-primary-500;
    }
  }
}

.mx-datepicker-popup {
  border-radius: .375rem;
  border: 0;
  box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgb(226, 232, 240) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
}

.mx-calendar {
  width: 250px;

  @media (min-width: 340px) {
    width: 284px;
  }
}

.mx-calendar-panel-date .cell {
  border-radius: 100%;
}

.mx-calendar-panel-month .cell,
.mx-calendar-panel-year .cell {
  border-radius: .375rem;
  padding: 12px 2px;
}

.mx-table-date td, .mx-table-date th {
  font-size: 14px;

  @media (min-width: 640px) {
    height: 38px;
  }
}

.mx-calendar-content {
  height: auto;

  .cell:hover {
    @apply text-primary-500 bg-primary-100 bg-opacity-30;
  }
}
</style>
