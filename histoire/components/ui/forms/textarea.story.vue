<script setup>
const content = ref('')
</script>

<template>
  <Story title="UI/forms/Textarea" icon="vscode-icons:file-type-vue">
    <div class="min-h-screen flex items-center justify-center">
      <UTextarea v-model="content" />
    </div>

<!--    <template #controls>-->
<!--      <HstJson title="Options" v-model="options" />-->
<!--    </template>-->

    <template #source>
      <textarea>
<UTextarea />
      </textarea>
    </template>
  </Story>
</template>
