---
icon: 'carbon:bookmark'
title: 'VTour/Introducción'
---


# VTour

Este componente es una modificación de [vue-tour](https://github.com/pulsardev/vue-tour), es el paquete más popular de vue pero no tenia el feature que necesitábamos.

## Tabla de contenido
* [Uso básico](#uso-basico)
* [Configuración](#configuracion)
* [Callbacks](#callbacks)
* [Features](#callbacks)
  * [UI step functions](#ui-step-functions-before)
  * [Debug](#debug)
  * [Highlight](#highlight)
  * [Disable scroll between steps](#disable-scroll-between-steps)
* [Personalización de componente](#personalizacion-de-componente)

---


### Uso básico
Coloca un componente de `VTour` en tu plantilla en cualquier lugar de tu aplicación (generalmente en App.vue) y pásale una matriz de pasos.
```vue
<template>
  <div>
    <div id="v-step-0">A DOM element on your page. The first step will pop on this element because its ID is 'v-step-0'.</div>
    <div class="v-step-1">A DOM element on your page. The second step will pop on this element because its ID is 'v-step-1'.</div>
    <div data-v-step="2">A DOM element on your page. The third and final step will pop on this element because its ID is 'v-step-2'.</div>

    <VTour name="myTour" :steps="steps" />
  </div>
</template>

<script>
  export default {
    name: 'my-tour',
    data () {
      return {
        steps: [
          {
            target: '#v-step-0',  // We're using document.querySelector() under the hood
            content: `Discover <strong>Vue Tour</strong>!`
          },
          {
            target: '.v-step-1',
            content: 'An awesome plugin made with Vue.js!'
          },
          {
            target: '[data-v-step="2"]',
            content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
            params: {
              placement: 'top'
            }
          }
        ]
      }
    },
    mounted() {
      this.$tours['myTour'].start()
      
      // También están disponibles los siguientes métodos:
      // this.$tours['myTour'].stop()
      // this.$tours['myTour'].skip()
      // this.$tours['myTour'].finish()
    }
  }
</script>
```
El destino de tus pasos puede utilizar cualquier selector válido con `document.querySelector()`, que es lo que utilizamos internamente. Una vez que hayas hecho esto y tus pasos apunten correctamente a algunos elementos del DOM de tu aplicación, puedes iniciar el recorrido llamando al siguiente método.
```js
this.$tours['myTour'].start()
```
Nota: dado que consultamos directamente los elementos del DOM, es importante que el DOM ya esté inicializado cuando llames al método `start`. Por lo tanto, siempre debes iniciar el recorrido en el gancho `mounted` o después de él (no en el gancho `created`).


---


### Configuración
Al inicializar tu recorrido, puedes pasar un objeto a la propiedad "options". Tu objeto de configuración personalizado no necesita (re)declarar todos los valores, solo necesitas definir lo que deseas cambiar.
Esta propiedad actualmente admite las siguientes propiedades:

| Option | Default | Description |
|---|---|---|
| useKeyboardNavigation | true | Si se establece en true, podrás utilizar las teclas ←, → y ESC para navegar a través de tu recorrido. |
| startTimeout | 0 | Define el tiempo de espera antes de que comience el recorrido.|

También puedes personalizar las etiquetas de los botones del recorrido.
```js
labels: {
  buttonSkip: 'Skip tour',
  buttonPrevious: 'Previous',
  buttonNext: 'Next',
  buttonStop: 'Finish'
}
```
#### Example
```html
<template>
  <div>
    <div id="v-step-0">A DOM element on your page.</div>
    <div id="v-step-1">A DOM element on your page.</div>
    <div id="v-step-2">A DOM element on your page.</div>

    <VTour name="myTour" :steps="steps" :options="myOptions" />
  </div>
</template>

<script>
  export default {
    name: 'my-tour',
    data () {
      return {
        myOptions: {
          useKeyboardNavigation: false,
          labels: {
            buttonSkip: 'Skip tour',
            buttonPrevious: 'Previous',
            buttonNext: 'Next',
            buttonStop: 'Finish'
          }
        },
        steps: [
           // ... Your steps array
        ]
      }
    },
    mounted: function () {
      this.$tours['myTour'].start()
    }
  }
</script>
```


---


### Callbacks
Vue Tour proporciona devoluciones de llamada (callbacks) para permitirte realizar acciones personalizadas en diferentes momentos del recorrido. Por ejemplo, si deseas llamar a una API cuando el usuario llegue al segundo paso de tu recorrido, disparar un evento de Google Analytics, etc.
Para utilizar las devoluciones de llamada, agrega una propiedad "callbacks" al componente "VTour":
```html
<VTour name="myTour" :steps="steps" :callbacks="myCallbacks">
```
Donde "myCallbacks" es un objeto que contiene tus métodos. Por ejemplo, aquí definimos un objeto con dos devoluciones de llamada:
```js
data: () => ({
  myCallbacks: {
    onPreviousStep: this.myCustomPreviousStepCallback,
    onNextStep: this.myCustomNextStepCallback
  }
})
```
Y luego, debes declarar tus métodos de la siguiente manera:
```js
methods: {
  myCustomPreviousStepCallback (currentStep) {
    console.log('[Vue Tour] Se ha llamado a una devolución de llamada personalizada "previousStep" en el paso. ' + (currentStep + 1))
  },
  myCustomNextStepCallback (currentStep) {
    console.log('[Vue Tour] Se ha llamado a una devolución de llamada personalizada "nextStep" en el paso. ' + (currentStep + 1))

    if (currentStep === 1) {
      console.log('[Vue Tour] Se ha llamado a una devolución de llamada personalizada "nextStep" desde el paso 2 hasta el paso 3.')
    }
  }
}
```
Actualmente, hay 5 devoluciones de llamada disponibles para ti:

| Name | Called when you... |
| --- | --- |
| onStart | start the tour |
| onPreviousStep | go to a previous step |
| onNextStep | go to a next step |
| onSkip | skip the tour |
| onFinish | end the tour |
| onStop | stop the tour (press ESC key for example) |


---


### Features

#### UI step functions `before()`

Si necesitas realizar tareas de configuración de la interfaz de usuario antes de un paso, hay una función `before` que puedes incluir en cada uno de tus pasos. Esta función se invocará antes de que se renderice el paso de inicio/siguiente/anterior. La función debe devolver una promesa. La función se invoca cuando se activan las acciones `start`, `nextStep` y `previousStep`. Si la promesa es rechazada, no avanzará al siguiente o anterior paso. Si la promesa se resuelve, avanzará en la dirección especificada.

Se utiliza cuando necesitas cambiar lo que se muestra en la pantalla entre pasos. Por ejemplo, es posible que desees ocultar un conjunto de menús y abrir una pantalla, o realizar una operación asíncrona. Esto es especialmente útil en aplicaciones de página única (SPA, por sus siglas en inglés).

```javascript
steps: [
  {
    target: '#v-step-0',  // We're using document.querySelector() under the hood
    content: `Discover <strong>Vue Tour</strong>!`,
    before: type => new Promise((resolve, reject) => {
      // Time-consuming UI/async operation here
      resolve('foo')
    })
  }
]
```

#### Debug

Vue Tour viene con la opción de depuración (debug) que te permite ver los registros del complemento.
De forma predeterminada, no podrás ver los registros de depuración, como: `[Vue Tour] Highlight is disabled for .v-step[id="b4820cfe"]`

 ```html
<VTour name="myTour" :steps="steps" :callbacks="callbacks" :options="{ debug: true }">
```

#### Highlight

Puedes resaltar el elemento destacado por el paso actual configurando la opción `highlight` en true.

```html
<VTour name="myTour" :steps="steps" :options="{ highlight: true }">
```

También puedes desactivar el resaltado en función de cada paso utilizando los parámetros del paso.

```js
data () {
  return {
    steps: [
      {
        target: '#v-step-0',
        content: `Discover <strong>Vue Tour</strong>!`,
        params: {
          highlight: false
        }
      },
      ...
    ]
  }
}
```

**Caveats**

Si estás personalizando la plantilla, no olvides pasar la propiedad "highlight" a las propiedades de `VStep`:

```html
<v-step
  v-if="tour.currentStep === index"
  v-for="(step, index) of tour.steps"
  :key="index"
  :step="step"
  ...
  :highlight="tour.highlight"
>
```

#### Disable scroll between steps

De forma predeterminada, Vue Tour realiza un desplazamiento entre cada paso. Puedes anular este comportamiento agregando `enableScrolling: false` a los parámetros del paso en los que no deseas habilitar el desplazamiento.

```js
{
  target: '#v-step-0',
  content: `Discover <strong>Vue Tour</strong>!`,
  params: {
    enableScrolling: false
  }
}
```


---


### Personalización de componente
Vue Tour hace un uso extenso de la funcionalidad de ranuras (slots) de Vue.js para permitirte personalizar casi todos los aspectos de los pasos de tu recorrido. La forma más sencilla de insertar un recorrido en tu página es utilizando simplemente un componente "VTour".
```html
<VTour name="myTour" :steps="steps" />
```
Este componente contiene una ranura (slot) predeterminada que envuelve un bucle "v-for" sobre los pasos pasados como una propiedad. Y los pasos en sí mismos contienen tres ranuras (slots): `header`, `content` y `actions`. Si deseas anular el DOM de los pasos, puedes hacerlo anulando las ranuras (slots) de la siguiente manera:
```html
<VTour name="myTour" :steps="steps">
  <template slot-scope="tour">
    <transition name="fade">
      <v-step
        v-if="tour.steps[tour.currentStep]"
        :key="tour.currentStep"
        :step="tour.steps[tour.currentStep]"
        :previous-step="tour.previousStep"
        :next-step="tour.nextStep"
        :stop="tour.stop"
        :skip="tour.skip"
        :is-first="tour.isFirst"
        :is-last="tour.isLast"
        :labels="tour.labels"
      >
        <template v-if="tour.currentStep === 2">
          <div slot="actions">
            <button @click="tour.previousStep" class="btn btn-primary">Previous step</button>
            <button @click="tour.nextStep" class="btn btn-primary">Next step</button>
          </div>
        </template>
      </v-step>
    </transition>
  </template>
</VTour>
```
Aquí hemos cambiado únicamente la ranura (slot) actions del tercer paso (el conteo comienza en 0). La ranura (slot) en el componente "VTour" tiene un ámbito (scoped) para que puedas usar sus propiedades y métodos internos.
