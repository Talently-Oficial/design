<script setup lang="ts">
import { logEvent } from "histoire/client";
const range = ref([0, 500]);
</script>

<template>
  <Story title="forms/Range" icon="vscode-icons:file-type-vue">
    <div class="min-h-screen flex items-center justify-center">
      <URange
        v-model="range"
        class="px-8 w-full"
        tooltip="none"
        :step="500"
        :min="0"
        :max="20000"
        @blur="logEvent('blur', $event)"
        @drag-end="logEvent('drag-end', $event)"
      />
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
            :min="0"
            :max="20000"
            @blur="onBlur"
            @drag-end="onDragEnd"
        />
      </textarea>
    </template>
  </Story>
</template>
