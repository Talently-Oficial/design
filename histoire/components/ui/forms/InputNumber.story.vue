<script setup>
const number = ref(0)
</script>

<template>
  <Story title="UI/forms/InputNumber" icon="vscode-icons:file-type-vue" autoPropsDisabled :layout="{ type: 'single' }">
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div>
        <UInputNumber placeholder="Number" :onlyNumbers="true" v-model="number" :min="0" :max="10" />
      </div>
    </div>

<!--    <template #controls>-->
<!--      <HstJson title="Options" v-model="options" />-->
<!--    </template>-->

<!--    <template #source>-->

<!--    </template>-->
  </Story>
</template>
