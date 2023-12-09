<script setup>
const form = ref({
  number: 0,
})
</script>

<template>
  <Story title="UI/forms/InputNumber" icon="vscode-icons:file-type-vue" autoPropsDisabled :layout="{ type: 'single' }">
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div>
        <UInputNumber placeholder="Number" :onlyNumbers="true" v-model="form.number" :min="-10" :max="100" />
      </div>
    </div>

<!--    <template #controls>-->
<!--      <HstJson title="Options" v-model="options" />-->
<!--    </template>-->

<!--    <template #source>-->

<!--    </template>-->
  </Story>
</template>
