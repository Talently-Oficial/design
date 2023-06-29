<script setup>
import VTour from '~/components/tour/VTour.vue'
import { logEvent } from 'histoire/client'

const stepsTutorial = ref([
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
const optionsTutorial = ref({
  highlight: {
    closeable: true,
    interaction: false,
    radio: 0,
    padding: 0,
  }
})

const dataControls = ref({
  buttonGroup: [
    {
      label: 'Low',
      value: 'Low',
    },
    {
      label: 'Regular',
      value: 'Regular',
    },
    {
      label: 'High',
      value: 'High',
    },
  ],
  checkList: [
    {
      label: 'Crash Bandicoot',
      value: 'crash-bandicoot',
    },
    {
      label: 'The Last of Us',
      value: 'the-last-of-us',
    },
    {
      label: 'Ghost of Tsushima',
      value: 'ghost-of-tsushima',
    },
  ],
  radio: [
    {
      label: 'Crash Bandicoot',
      value: '1',
    },
    {
      label: 'The Last of Us',
      value: '2',
    },
    {
      label: 'Ghost of Tsushima',
      value: '3',
    },
  ],
  select: [
    {
      label: 'Crash Bandicoot',
      value: 'crash-bandicoot',
    },
    {
      label: 'The Last of Us',
      value: 'the-last-of-us',
    },
    {
      label: 'Ghost of Tsushima',
      value: 'ghost-of-tsushima',
    },
  ]
})
const controls = ref({
  text: '',
  textarea: '',
  buttonGroup: '',
  checkbox: false,
  checkboxList: [],
  number: 0,
  radio: '',
  select: '',
  slider: 0,
})

const startTutorial = () => {
  window.$tours.example.start()
  logEvent('Start Tutorial', {
    tutorial: 'example',
  })
}

const customEvent = () => {
    logEvent('click page', {
      page: 'Tutorial',
      date: new Date(),
    })
}
</script>

<template>
  <Story
      icon="carbon:bookmark"
      group="top"
      title="Introducción a histoire"
      :layout="{ type: 'single', iframe: false }"
      responsiveDisabled autoPropsDisabled>
    <div>
      <div class="absolute top-0 right-0 w-24 h-0">
        <div data-tour="1" class="h-full w-full"/>
      </div>
      <div class="absolute top-0 right-0 w-0 h-24">
        <div data-tour="2" class="h-full w-full"/>
      </div>
      <div class="absolute bottom-0 right-0 w-0 h-24">
        <div data-tour="3" class="h-full w-full"/>
      </div>
      <div class="absolute bottom-0 left-0 w-0 h-full">
        <div data-tour="4" class="h-full w-full"/>
      </div>
    </div>

    <VTour name="example" :steps="stepsTutorial" :options="optionsTutorial"/>

    <div @click="customEvent" class="absolute inset-0 text-center h-full w-full flex justify-center items-center overflow-auto">
      <div class="space-y-8">
        <div>
          <img src="https://histoire.dev/logo.svg" alt="histoire" width="176" height="176" loading="lazy" class="w-44 h-auto mb-4 mx-auto" />
          <h1 class="text-2xl">Histoire</h1>
        </div>

        <div class="text-center">
          <HstButton title="Button Group" @click.stop="startTutorial" class="p-2 px-4" color="primary">
            Tutorial
          </HstButton>
        </div>

        <ul class="flex gap-6 flex-wrap">
          <li>
            <a href="https://histoire.dev/reference/config.html" target="_blank" class="text-green-500 hover:underline">Config</a>
          </li>
          <li>
            <a href="https://histoire.dev/reference/vue3/story.html" target="_blank" class="text-green-500 hover:underline">Story</a>
          </li>
          <li>
            <a href="https://histoire.dev/reference/vue3/variant.html" target="_blank" class="text-green-500 hover:underline">Variant</a>
          </li>
          <li>
            <a href="https://controls.histoire.dev/" target="_blank" class="text-green-500 hover:underline">Controls</a>
          </li>
        </ul>
      </div>
    </div>

    <template #controls>
      <HstText title="Input Text" v-model="controls.text" />
      <HstTextarea title="Textarea" v-model="controls.textarea" />
      <HstButtonGroup title="Button Group" v-model="controls.buttonGroup" :options="dataControls.buttonGroup" />
      <HstCheckbox title="Checkbox" v-model="controls.checkbox" />
      <HstCheckboxList title="Checkbox List" v-model="controls.checkboxList" :options="dataControls.checkList" />
      <HstNumber title="Number" v-model="controls.number" />
      <HstRadio title="Radio" v-model="controls.radio" :options="dataControls.radio" />
      <HstSelect title="Select" v-model="controls.select" :options="dataControls.select" />
      <HstSlider title="Slider" v-model="controls.slider" :step="5" :min="0" :max="100" />
      <HstJson title="Json" v-model="controls" />
    </template>

    <template #source>
        <textarea>
<script setup>
const controls = ref({{controls}})
</script>
        </textarea>
    </template>
  </Story>
</template>

<docs lang="md">
# Documentación

Aquí puedes encontrar la documentación del componente X.

## Ejemplo de documentación
El Componente X es un componente de Vue que permite a los usuarios realizar una acción específica en nuestra aplicación.

### Uso
Para utilizar el Componente X en tu proyecto de Vue, sigue estos pasos:
Asegúrate de tener la última versión de nuestro paquete instalada en tu proyecto.
Agrega el Componente X a tu archivo de componentes:

```vue
<template>
  <div>
    <componente-x :prop1="valor1" :prop2="valor2" @eventoX="handleEventoX" />
  </div>
</template>

<script>
  import ComponenteX from 'nombre-paquete';

  export default {
    components: {
      ComponenteX,
    },
    methods: {
      handleEventoX() {
        // Lógica para manejar el evento X
      },
    },
  };
</script>
```

### Propiedades
El Componente X acepta las siguientes propiedades:

| Propiedad | Tipo | Descripción |
| --- | --- | --- |
| prop1 | String | Descripción de la propiedad 1 |
| prop2 | Number | Descripción de la propiedad 2 |

### Eventos
El Componente X emite los siguientes eventos:

#### Evento X
Este evento se dispara cuando ocurre algo importante en el Componente X. Puedes suscribirte a este evento utilizando el modificador @:

```vue
<componente-x @eventoX="handleEventoX" />
```

Donde `handleEventoX` es el método que se ejecutará cuando ocurra el evento X.

### Ejemplo completo
Aquí tienes un ejemplo completo de cómo se utiliza el Componente X en un proyecto de Vue:

```vue
<template>
  <div>
    <h1>Mi Aplicación</h1>
    <componente-x :prop1="valor1" :prop2="valor2" @eventoX="handleEventoX" />
  </div>
</template>

<script>
  import ComponenteX from 'nombre-paquete';

  export default {
    components: {
      ComponenteX,
    },
    data() {
      return {
        valor1: 'valor1',
        valor2: true,
      };
    },
    methods: {
      handleEventoX() {
        // Lógica para manejar el evento X
      },
    },
  };
</script>
```
¡Espero que este ejemplo te ayude a documentar tu componente Vue usando Markdown!
</docs>
