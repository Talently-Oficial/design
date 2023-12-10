<template>
  <Story title="UI/elements/Button" icon="vscode-icons:file-type-vue" autoPropsDisabled :layout="{ type: 'single' }">
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div class="flex flex-wrap gap-2">
        <UButton class="w-32">Default</UButton>
        <UButton class="w-32">Primary</UButton>
      </div>
    </div>

<!--    <template #controls>-->
<!--      <HstJson title="Options" v-model="options" />-->
<!--    </template>-->

<!--    <template #source>-->
<!--    </template>-->
  </Story>
</template>
