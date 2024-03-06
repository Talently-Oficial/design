<script setup>
const showModal = ref(false)
</script>

<template>
  <Story title="overlays/Modal" icon="vscode-icons:file-type-vue" autoPropsDisabled>
    <div class="min-h-screen flex items-center justify-center">
      <UButton @click="showModal = !showModal">Abrir</UButton>

      <UModal v-model="showModal">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet commodi excepturi facilis labore laboriosam necessitatibus nemo nostrum quod quos similique, sunt suscipit, ut! A dicta dolore incidunt magni omnis.
      </UModal>
    </div>
  </Story>
</template>
