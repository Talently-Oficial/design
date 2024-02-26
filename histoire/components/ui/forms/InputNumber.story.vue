<script setup>
const form = ref({
  number: 0,
})
</script>

<template>
  <Story title="forms/InputNumber" icon="vscode-icons:file-type-vue" autoPropsDisabled>
    <div class="min-h-screen flex items-center justify-center">
        <UInputNumber placeholder="Number" :onlyNumbers="true" v-model="form.number" :min="-10" :max="100" />
    </div>

<!--    <template #controls>-->
<!--      <HstJson title="Options" v-model="options" />-->
<!--    </template>-->

    <template #source>
      <textarea>
<UInputNumber placeholder="Number" />
      </textarea>
    </template>
  </Story>
</template>
