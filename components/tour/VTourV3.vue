<template>
  <div class="v-tour">
    <svg
      v-if="isRunning"
      class="fixed w-full h-full top-0 left-0 pointer-events-none"
      style="z-index: 9999"
      @click="stop"
    >
      <defs>
        <clipPath id="v-tour-mask">
          <path fill-rule="evenodd" clip-rule="evenodd" :d="styleMsk.path" />
        </clipPath>
      </defs>

      <rect
        x="0"
        y="0"
        :width="styleMsk.width"
        :height="styleMsk.height"
        fill="black"
        class="pointer-events-auto"
        fill-opacity="0.3"
        clip-path="url(#v-tour-mask)"
      />
    </svg>

    <slot
      :current-step="currentStep"
      :steps="steps"
      :previous-step="previousStep"
      :next-step="nextStep"
      :stop="stop"
      :skip="skip"
      :finish="finish"
      :is-first="isFirst"
      :is-last="isLast"
      :labels="customOptions.labels"
      :enabled-buttons="customOptions.enabledButtons"
      :highlight="customOptions.highlight"
      :debug="customOptions.debug"
      @mounted="mountedStep"
      @scroll="overlayStep"
      @resize="overlayStep"
    >
      <!--Default slot {{ currentStep }}-->
      <VStep
        v-if="steps[currentStep]"
        :key="currentStep"
        :step="steps[currentStep]"
        :previous-step="previousStep"
        :next-step="nextStep"
        :stop="stop"
        :skip="skip"
        :finish="finish"
        :is-first="isFirst"
        :is-last="isLast"
        :labels="customOptions.labels"
        :enabled-buttons="customOptions.enabledButtons"
        :highlight="customOptions.highlight"
        :stop-on-fail="customOptions.stopOnTargetNotFound"
        :debug="customOptions.debug"
        @mounted="mountedStep"
        @scroll="overlayStep"
        @resize="overlayStep"
        @targetNotFound="$emit('targetNotFound', $event)"
      >
        <!--<div v-if="index === 2" slot="actions">
          <a @click="nextStep">Next step</a>
        </div>-->
      </VStep>
    </slot>
  </div>
</template>

<script setup>
import { DEFAULT_CALLBACKS, DEFAULT_OPTIONS, KEYS } from './constants'
import VStep from './VStep.vue'

const props = defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
  },
  options: {
    type: Object,
    default: () => {
      return DEFAULT_OPTIONS
    },
  },
  callbacks: {
    type: Object,
    default: () => {
      return DEFAULT_CALLBACKS
    },
  },
})

const currentStep = ref(-1)
const styleMsk = ref({
  path: '',
  width: 0,
  height: 0,
})

const isFirst = computed(() => currentStep.value === 0)
const isRunning = computed(() => currentStep.value > -1 && currentStep.value < numberOfSteps.value)

const customOptions = computed(() =>{
  return {
    ...DEFAULT_OPTIONS,
    ...props.options,
  }
})

const customCallbacks = computed(() =>{
  return {
    ...DEFAULT_CALLBACKS,
    ...props.callbacks,
  }
})


const isLast = computed(() =>{
  return currentStep.value === props.steps.length - 1
})

const numberOfSteps = computed(() =>{
  return props.steps.length
})

const step = computed(() =>{
  return props.steps[currentStep.value]
})

onMounted( () => {
  window.$tours = {}
  $tours[props.name] = {start,  stop}
})

onUnmounted( () => {
  if (customOptions.value.useKeyboardNavigation) {
    window.removeEventListener('keyup', handleKeyup)
  }
})

const mountedStep = (element) => {
  if (customOptions.value.highlight) {
    overlayStep(element)
  }
}

const overlayStep = (element) => {
  if (!element) {
    return
  }

  const rect = element.getBoundingClientRect()

  const radio = 6
  const anchoViewport = window.innerWidth
  const altoViewport = window.innerHeight

  const y = rect.y
  const x = rect.x
  const ancho = rect.width
  const alto = rect.height

  const path = `
                  M0 0
                  H${anchoViewport}
                  V${altoViewport}
                  H0
                  V0
                  M${x + radio} ${y}

                  H${x + ancho - radio}
                  A${radio} ${radio} 0 0 1 ${x + ancho} ${y + radio}

                  V${y + alto - radio}
                  A${radio} ${radio} 0 0 1 ${x + ancho - radio} ${y + alto}

                  H${x + radio}
                  A${radio} ${radio} 0 0 1 ${x} ${y + alto - radio}

                  V${y + radio}
                  A${radio} ${radio} 0 0 1 ${x + radio} ${y}
                  `

  styleMsk.value = {
    path,
    width: anchoViewport,
    height: altoViewport,
  }
}
const start = async (startStep) => {
  console.log(customCallbacks.value)

  // Register keyup listeners for this tour
  if (customOptions.value.useKeyboardNavigation) {
    window.addEventListener('keyup', handleKeyup)
  }

  // Wait for the DOM to be loaded, then start the tour
  startStep = typeof startStep !== 'undefined' ? parseInt(startStep, 10) : 0
  const step = props.steps[startStep]

  const process = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          customCallbacks.value.onStart()
          currentStep.value = startStep
          resolve()
        }, customOptions.value.startTimeout)
      })

  if (typeof step.before !== 'undefined') {
    try {
      await step.before('start')
    } catch (e) {
      return Promise.reject(e)
    }
  }
  await process()

  return Promise.resolve()
}
const previousStep = async () => {
  const futureStep = currentStep.value - 1

  const process = () =>
      new Promise((resolve) => {
        customCallbacks.value.onPreviousStep(currentStep.value)
        currentStep.value = futureStep
        resolve()
      })

  if (futureStep > -1) {
    const step = props.steps[futureStep]
    if (typeof step.before !== 'undefined') {
      try {
        await step.before('previous')
      } catch (e) {
        return Promise.reject(e)
      }
    }
    await process()
  }

  return Promise.resolve()
}
const nextStep = async() => {
  const futureStep = currentStep.value + 1

  const process = () =>
      new Promise((resolve, reject) => {
        customCallbacks.value.onNextStep(currentStep.value)
        currentStep.value = futureStep
        resolve()
      })

  if (futureStep < numberOfSteps.value && currentStep.value !== -1) {
    const step = props.steps[futureStep]
    if (typeof step.before !== 'undefined') {
      try {
        await step.before('next')
      } catch (e) {
        return Promise.reject(e)
      }
    }
    await process()
  }

  return Promise.resolve()
}
const stop = () => {
  customCallbacks.value.onStop()
  document.body.classList.remove('v-tour--active')
  currentStep.value = -1
}
const skip = () => {
  customCallbacks.value.onSkip()
  stop()
}
const finish = () => {
  customCallbacks.value.onFinish()
  stop()
}
const handleKeyup = (e) => {
  if (customOptions.value.debug) {
    console.log('[Vue Tour] A keyup event occured:', e)
  }
  switch (e.keyCode) {
    case KEYS.ARROW_RIGHT:
      isKeyEnabled('arrowRight') && nextStep()
      break
    case KEYS.ARROW_LEFT:
      isKeyEnabled('arrowLeft') && previousStep()
      break
    case KEYS.ESCAPE:
      isKeyEnabled('escape') && stop()
      break
  }
}
const isKeyEnabled = (key) => {
  const { enabledNavigationKeys } = customOptions.value

  // eslint-disable-next-line no-prototype-builtins
  return enabledNavigationKeys.hasOwnProperty(key)
      ? enabledNavigationKeys[key]
      : true
}
</script>

<style lang="postcss">
body.v-tour--active {
  pointer-events: none;
}

.v-tour__target--highlighted {
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4);
  pointer-events: auto;
  z-index: 9999;
}

.v-tour__target--active {
  position: relative;
}

.v-tour__target--disabled {
  pointer-events: none;
}
</style>
