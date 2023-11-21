<script setup>
import { useNuxtApp } from '#app'
import VTour from '../../../packages/tour/src/VTour.vue'

const steps = ref([
  {
    target: `[data-tour='step-1']`,
    content: `<div class="-mx-4 -mt-4 rounded-t-md overflow-hidden">
        <video width="400" controls autoplay>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
            Your browser does not support HTML video.
        </video>
</div>`,
    params: {
      placement: 'top',
    },
  },
])
const options = ref({
  highlight: {
    closeable: true,
    interaction: false,
    radio: 6,
    padding: 4,
  },
})

const startTourHighlight = () => {
  const { $tours } = useNuxtApp()
  $tours.tourContent.start()
}
</script>

<template>
  <Story title="VTour/Content Html" icon="vscode-icons:file-type-vue" autoPropsDisabled :layout="{ type: 'single', iframe: true }">
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div class="flex justify-center flex-wrap items-center gap-5">
        <div data-tour="step-1">
          <UIButton color="outline" @click="startTourHighlight">Iniciar</UIButton>
        </div>
      </div>
    </div>

    <VTour name="tourContent" :steps="steps" :options="options"/>

    <template #controls>
      <HstTextarea title="content" class="h-24" v-model="steps[0].content" />
    </template>

    <template #source>
        <textarea>
<script setup>
const steps = ref([
  {
    target: `[data-tour='1']`,
    content: `{{steps[0].content}}`,
    params: {
      placement: 'top',
    },
  },
])

const options = ref({{options}})
</script>

<template>
  <VTour name="tourContent" :steps="steps" :options="options"/>
</template>
        </textarea>
    </template>
  </Story>
</template>

<docs lang="md">
## Contenido

El `content` y `header` de cada step puede tiene soporte de un string simple hasta un html complejo, esto permite que se pueda personalizar el contenido de cada paso.

En el caso de que exista la necesidad de que el contenido o header sea reactivo que va más alla de un html puede usar un componente personalizado, pero este remplaza todo el componente por lo que se tendrá que incluir los botones de las acciones.

[Más información aquí](/story/components-tour-doc-vtour-story-js#personalizacion-de-componente)
</docs>
