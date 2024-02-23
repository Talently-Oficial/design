<script setup lang="ts">
const range = ref([0, 500])
</script>

<template>
  <Story title="UI/forms/Range" icon="vscode-icons:file-type-vue" autoPropsDisabled :layout="{ type: 'single' }">
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div class="w-full">
        <URange
            v-model="range"
            class="px-4"
            tooltip="none"
            :step="500"
            :min="500"
            :max="20000"
        />
      </div>
    </div>

    <!--    <template #controls>-->
    <!--      <HstJson title="Options" v-model="options" />-->
    <!--    </template>-->

    <template #source>
      <textarea>
        <URange
            v-model="range"
            tooltip="none"
            :step="500"
            :min="500"
            :max="20000"
        />
      </textarea>
    </template>
  </Story>
</template>
