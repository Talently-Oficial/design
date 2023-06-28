<script setup>
import VTour from '~/components/tour/VTour.vue'
import Button from '~/components/button/Button.vue'

const counter = ref(0)
const options = ref({
  highlight: {
    closeable: false,
    interaction: false,
    radio: 0,
    padding: 0,
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

const startTourHighlight = () => {
  window.$tours.tourHighlight.start()
}
</script>

<template>
  <Story title="VTour/Highlight" icon="vscode-icons:file-type-vue" autoPropsDisabled>
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div class="flex justify-center flex-wrap items-center gap-5">
        <div data-tour="step-1">
          <Button color="outline" @click="startTourHighlight">Iniciar</Button>
        </div>

        <div data-tour="step-2">
          <Button color="outline" @click="counter = counter + 1">Count {{ counter }}</Button>
        </div>

        <div data-tour="step-3">
          <Button color="outline" @click="startTourHighlight">Step 3</Button>
        </div>
      </div>
    </div>

    <VTour name="tourHighlight" :steps="steps" :options="options"/>

    <template #controls="{ state }">
      <div class="p-4">
        options: {
        <div class="pl-4 py-3">
          highlight: {
          <HstCheckbox title="closeable" v-model="options.highlight.closeable" />
          <HstCheckbox title="interaction" v-model="options.highlight.interaction"/>
          <HstNumber title="radio" v-model="options.highlight.radio"/>
          <HstNumber title="padding" v-model="options.highlight.padding"/>
          }
        </div>
        }
      </div>
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
  enabledButtons: {
    buttonPrevious: false,
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
