<script setup>
import { useNuxtApp } from '#app'
import VTour from '../../../packages/tour/src/VTour.vue'
import {DEFAULT_OPTIONS} from "../../../packages/tour/src/constants";

const options = ref({...DEFAULT_OPTIONS})
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
  $tours.tourOptions.start(step)
}
</script>

<template>
  <Story title="VTour/Options" icon="vscode-icons:file-type-vue" autoPropsDisabled :layout="{ type: 'single', iframe: true }">
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div class="flex justify-center flex-wrap items-center gap-5">
        <div data-tour="step-1">
          <UIButton color="outline" class="w-32" @click="startTourHighlight()">Inicio</UIButton>
        </div>

        <div data-tour="step-3">
          <UIButton color="outline" class="w-32">Fin</UIButton>
        </div>
      </div>
    </div>

    <VTour name="tourOptions" :steps="steps" :options="options"/>

    <template #controls>
      <HstJson title="Options" v-model="options" />
    </template>

    <template #source>
        <textarea>
<script setup>
const options = ref({{ options }})

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
  <VTour name="tourOptions" :steps="steps" :options="options"/>
</template>
        </textarea>
    </template>
  </Story>
</template>
