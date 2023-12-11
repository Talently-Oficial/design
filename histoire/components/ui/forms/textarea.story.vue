<script setup>
const content = ref('')
</script>

<template>
  <Story title="UI/forms/Textarea" icon="vscode-icons:file-type-vue" autoPropsDisabled :layout="{ type: 'single' }">
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div>
        <UTextarea v-model="content" />
      </div>
    </div>

<!--    <template #controls>-->
<!--      <HstJson title="Options" v-model="options" />-->
<!--    </template>-->

<!--    <template #source>-->

<!--    </template>-->
  </Story>
</template>
