<script setup lang="ts">
import {DatePicker as VCalendarDatePicker} from 'v-calendar'
import 'v-calendar/style.css'
const { $date } = useNuxtApp()

const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: null
  },
  format: {
    type: String,
    default: 'YYYY-MM-DDTHH:mm:ssZ'
  },
})

const emit = defineEmits(['update:modelValue', 'update:formatted', 'close', 'change', 'format'])

const attrs = [{
  key: 'today',
  highlight: {
    color: 'purple',
    fillMode: 'outline',
    class: '!bg-gray-100 dark:!bg-gray-800'
  },
  dates: new Date()
}]

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    if(!value) return

    emit('update:modelValue', value)
    emit('update:formatted', $date(value).format(props.format))
    emit('change', value)
    emit('close')
  }
})
</script>

<template>
  <VCalendarDatePicker
      v-model="date"
      transparent
      borderless
      :attributes="attrs"
      is-dark="system"
      title-position="left"
      trim-weeks
      :first-day-of-week="2"
  />
</template>
