<script setup>
const options = [{
  value: 'email',
  label: 'Email'
}, {
  value: 'sms',
  label: 'Phone (SMS)'
}, {
  value: 'push',
  label: 'Push notification'
}]

const value = ref([])
</script>

<template>
  <Story title="UI/forms/Checkbox" icon="vscode-icons:file-type-vue" autoPropsDisabled>
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div>
        <div>
          <div v-for="item in options">
            <UCheckbox v-model="value" :value="item.value">
              {{ item.label }}
            </UCheckbox>
          </div>
        </div>
      </div>
    </div>

    <template #source>
      <textarea>
<div v-for="item in options">
  <UCheckbox v-model="value" :value="item.value">
    name
  </UCheckbox>
</div>
      </textarea>
    </template>
  </Story>
</template>
