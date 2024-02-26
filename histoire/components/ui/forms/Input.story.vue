<template>
  <Story title="forms/Input" icon="vscode-icons:file-type-vue" autoPropsDisabled>
    <div class="min-h-screen flex items-center justify-center">
        <UInput placeholder="Example" />
    </div>

<!--    <template #controls>-->
<!--      <HstJson title="Options" v-model="options" />-->
<!--    </template>-->

    <template #source>
      <textarea>
<UInput placeholder="Example" />
      </textarea>
    </template>
  </Story>
</template>
