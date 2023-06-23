<script setup>
import VTour from './VTour.vue'
import Button from '~/components/button/Button.vue'

const steps = ref([
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
])

const startTutorial = () => {
  window.$tours.example.start()
}
</script>

<template>
  <Story title="VTour" :layout="{ type: 'single', iframe: false }">
    <Variant title="Example" responsive-disabled autoPropsDisabled>
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <Button @click="startTutorial" color="purple">Iniciar ejemplo</Button>
      </div>

      <div class="absolute top-0 right-0 w-24 h-px">
        <div data-tour="1" class="h-full w-full" />
      </div>
      <div class="absolute top-0 right-0 w-px h-24">
        <div data-tour="2" class="h-full w-full" />
      </div>
      <div class="absolute bottom-0 right-0 w-px h-24">
        <div data-tour="3" class="h-full w-full" />
      </div>
      <div class="absolute bottom-0 left-0 w-px h-full">
        <div data-tour="4" class="h-full w-full" />
      </div>

      <VTour name="example" :steps="steps" :options="{
          highlight: {
                closeable: true,
                interaction: false,
                radio: 0,
                padding: 0,
          },
          enabledButtons: {
              buttonPrevious: false,
          },
        }"
      />
    </Variant>

    <Variant title="highlight">
      <pre>
        <code class="language-html">
          &lt;VTour name="example" :steps="steps" :options="{
            highlight: {
              closeable: true,
              interaction: false,
              radio: 0,
              padding: 0,
            },
            enabledButtons: {
              buttonPrevious: false,
            },
          }"
          /&gt;
        </code>
      </pre>
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
