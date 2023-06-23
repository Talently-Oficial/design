<script setup>
import VTour from './VTour.vue'
import Button from '~/components/button/Button.vue'

const stepsExample = [
  {
    target: "[data-tour='1']",
    header: {
      title: 'Herramientas de previsualización',
    },
    content: `Estas herramientas nos ayuda a simular cosas del navegador y accesos directos al editor.`,
    params: {
      placement: 'top',
    },
  },
  {
    target: '[data-tour="2"]',
    header: {
      title: 'Panel interactivo de componente',
    },
    content: `Este panel nos ayuda a interactuar con el componente seleccionado, podemos cambiar sus propiedades y ver los cambios en tiempo real. Además podemos ver la documentación y eventos que emite el componente.`,
    params: {
      placement: 'right',
    },
  },
  {
    target: '[data-tour="3"]',
    header: {
      title: 'Código de componente',
    },
    content: 'Código de componente escrito para el ejemplo.',
    params: {
      placement: 'right',
    },
  },
  {
    target: '[data-tour="4"]',
    header: {
      title: 'Ejemplos y variaciones',
    },
    content: `Aquí podemos ver los ejemplos y variaciones del componente seleccionado.`,
    params: {
      placement: 'left',
    },
  },
]

const optionsExample = {
  highlight: {
    closeable: true,
    interaction: false,
    radio: 0,
    padding: 0,
  }
}

const startTutorial = () => {
  window.$tours.example.start()
}

// Highlight
const stepsHighlight = ref([
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

const counter = ref(0)

function initState () {
  return {
    highlight: {
      closeable: false,
      interaction: true,
      radio: 0,
      padding: 0,
    },
    enabledButtons: {
      buttonPrevious: false,
    },
  }
}

const exampleHighlight = `
const options = ref({
  highlight: {
    closeable: true,
    interaction: false,
    radio: 0,
    padding: 0,
  },
  enabledButtons: {
    buttonPrevious: false,
  },
})

const steps = ref([
  {
    target: "[data-tour='1']",
    header: {
      title: 'Herramientas de previsualización',
    },
    content: \`Estas herramientas nos ayuda a simular cosas del navegador y accesos directos al editor.\`,
    params: {
      placement: 'top',
    },
  },
  {
    target: '[data-tour="2"]',
    header: {
      title: 'Panel interactivo de componente',
    },
    content: \`Este panel nos ayuda a interactuar con el componente seleccionado, podemos cambiar sus propiedades y ver los cambios en tiempo real. Además podemos ver la documentación y eventos que emite el componente.\`,
    params: {
      placement: 'right',
    },
  },
  {
    target: '[data-tour="3"]',
    header: {
      title: 'Código de componente',
    },
    content: 'Código de componente escrito para el ejemplo.',
    params: {
      placement: 'right',
    },
  },
])

<VTour name="highlight" :steps="steps" :options="options"/>`;


const startTourHighlight = () => {
  window.$tours.highlight.start()
}
</script>

<template>
  <Story title="VTour" :layout="{ type: 'single', iframe: false }" group="UI">
    <Variant title="Example" responsive-disabled autoPropsDisabled>
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <Button @click="startTutorial" color="purple">Iniciar ejemplo</Button>
      </div>

      <div class="absolute top-0 right-0 w-24 h-0">
        <div data-tour="1" class="h-full w-full" />
      </div>
      <div class="absolute top-0 right-0 w-0 h-24">
        <div data-tour="2" class="h-full w-full" />
      </div>
      <div class="absolute bottom-0 right-0 w-0 h-24">
        <div data-tour="3" class="h-full w-full" />
      </div>
      <div class="absolute bottom-0 left-0 w-0 h-full">
        <div data-tour="4" class="h-full w-full" />
      </div>

      <VTour name="example" :steps="stepsExample" :options="optionsExample"/>
    </Variant>

    <Variant title="highlight" :source="exampleHighlight" responsive-disabled autoPropsDisabled :init-state="initState">
      <template #default="{ state }">
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div class="flex justify-center items-center gap-5">
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

        <VTour name="highlight" :steps="stepsHighlight" :options="{highlight: state.highlight}"/>
      </template>


      <template #controls="{ state }">
          <div class="p-4">
            options: {
              <div class="pl-4 py-3">
                highlight: {
                  <HstCheckbox title="closeable" v-model="state.highlight.closeable" />
                  <HstCheckbox title="interaction" v-model="state.highlight.interaction" />
                  <HstNumber title="radio" v-model="state.highlight.radio" />
                  <HstNumber title="padding" v-model="state.highlight.padding" />
                }
              </div>
            }
          </div>
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Tour

Este componente es una modificación de [vue-tour](https://github.com/pulsardev/vue-tour), es el paquete más popular de vue pero no tenia el feature que necesitábamos.

- [Getting Started](https://github.com/pulsardev/vue-tour/wiki/Getting-Started)
- [Tour Configuration](https://github.com/pulsardev/vue-tour/wiki/Tour-Configuration)
- [Callbacks](https://github.com/pulsardev/vue-tour/wiki/Callbacks)
- [Customizing the Template](https://github.com/pulsardev/vue-tour/wiki/Customizing-the-Template)
- [Features:](https://github.com/pulsardev/vue-tour/wiki/Features)
  - [before()](https://github.com/pulsardev/vue-tour/wiki/Features#before-ui-step-functions-v15x)
  - [Debug](https://github.com/pulsardev/vue-tour/wiki/Features#debug-v13x)
  - [Caveats](https://github.com/pulsardev/vue-tour/wiki/Features#caveats)
  - [Disable scroll between steps](https://github.com/pulsardev/vue-tour/wiki/Features#disable-scroll-between-steps)
  - [~~Highlight~~ (Deprecado/Mejorado)](https://github.com/pulsardev/vue-tour/wiki/Features#highlight-v12x)
  - [~~Customization~~ (no usar para Highlight)](https://github.com/pulsardev/vue-tour/wiki/Features#customization)


</docs>
