<script setup>
import { useNuxtApp } from '#app'
import VTour from '../../../packages/tour/src/VTour.vue'

const counter = ref(0)
const options = ref({
  highlight: {
    closeable: true,
    interaction: true,
    radio: 6,
    padding: 4,
  }
})
const steps = ref([
  {
    target: "[data-tour='step-1']",
    header: {
      title: 'Herramientas de previsualización',
    },
    content: `Estas herramientas nos ayuda a simular cosas del navegador y accesos directos al editor.`,
    params: {
      placement: 'top',
    },
  },
  {
    target: '[data-tour="step-2"]',
    header: {
      title: 'Panel interactivo de componente',
    },
    content: `Este panel nos ayuda a interactuar con el componente seleccionado, podemos cambiar sus propiedades y ver los cambios en tiempo real. Además podemos ver la documentación y eventos que emite el componente.`,
    params: {
      placement: 'bottom',
    },
  },
  {
    target: '[data-tour="step-3"]',
    header: {
      title: 'Código de componente',
    },
    content: 'Código de componente escrito para el ejemplo.',
    params: {
      placement: 'left',
    },
  },
])

const startTourHighlight = (step = 0) => {
  const { $tours } = useNuxtApp()
  $tours.tourHighlight.start(step)
}
</script>

<template>
  <Story title="VTour/Highlight" icon="vscode-icons:file-type-vue" autoPropsDisabled>
    <div class="min-h-screen flex items-center justify-center">
      <div class="flex justify-center flex-wrap items-center gap-5">
        <div data-tour="step-1">
          <UButton color="outline" class="w-32" @click="startTourHighlight()">Inicio</UButton>
        </div>

        <div data-tour="step-2">
          <UButton color="outline" class="w-32" @click="counter = counter + 1">Count {{ counter }}</UButton>
        </div>

        <div data-tour="step-3">
          <UButton color="outline" class="w-32" @click="startTourHighlight(2)">Fin</UButton>
        </div>
      </div>
    </div>

    <VTour name="tourHighlight" :steps="steps" :options="options"/>

    <template #controls>
      <p class="p-2 font-strong">highlight properties:</p>
      <HstCheckbox title="closeable" v-model="options.highlight.closeable"/>
      <HstCheckbox title="interaction" v-model="options.highlight.interaction"/>
      <HstNumber title="radio" v-model="options.highlight.radio"/>
      <HstNumber title="padding" v-model="options.highlight.padding"/>
    </template>

    <template #source>
        <textarea>
<script setup>
const options = ref({
  highlight: {
    closeable: {{options.highlight.closeable}},
    interaction: {{options.highlight.interaction}},
    radio: {{options.highlight.radio}},
    padding: {{options.highlight.padding}},
  },
})

const steps = ref([
  {
    target: `[data-tour='1']`,
    header: {
      title: 'Herramientas de previsualización',
    },
    content: `Estas herramientas nos ayuda a simular cosas del navegador y accesos directos al editor.`,
    params: {
      placement: 'top',
    },
  },
  {
    target: `[data-tour="2"]`,
    header: {
      title: 'Panel interactivo de componente',
    },
    content: `Este panel nos ayuda a interactuar con el componente seleccionado, podemos cambiar sus propiedades y ver los cambios en tiempo real. Además podemos ver la documentación y eventos que emite el componente.`,
    params: {
      placement: 'right',
    },
  },
  {
    target: `[data-tour="3"]`,
    header: {
      title: 'Código de componente',
    },
    content: 'Código de componente escrito para el ejemplo.',
    params: {
      placement: 'right',
    },
  },
])
</script>

<template>
  <VTour name="tourHighlight" :steps="steps" :options="options"/>
</template>
        </textarea>
    </template>
  </Story>
</template>
