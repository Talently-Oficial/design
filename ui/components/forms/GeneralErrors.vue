<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Error',
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
})

const isShow = computed(() => Object.keys(props.errors).length > 0)
</script>

<template>
  <UAlert
      color="red"
      :title="props.title"
      variant="subtle"
      v-if="isShow"
  >
    <template #description>
      <slot>
        <ul class="pl-4">
          <li v-for="(error, i) in errors" :key="`errors-${i}`">
            <ul class="list-disc">
              <li v-for="(label, i) in error" :key="`error-${i}`">
                {{ label }}
              </li>
            </ul>
          </li>
        </ul>
      </slot>
    </template>
  </UAlert>
</template>

