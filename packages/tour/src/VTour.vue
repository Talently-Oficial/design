<template>
  <div class="v-tour">
    <svg
      v-if="isRunning && customOptions.highlight.enabled"
      class="fixed w-full h-full top-0 left-0 pointer-events-none"
      style="z-index: 9999"
      @click="clickOverlay"
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

<script>
import { DEFAULT_CALLBACKS, DEFAULT_OPTIONS, KEYS } from './constants'
import VStep from './VStep.vue'
import { useNuxtApp } from '#app'

export default {
  name: 'VTour',
  components: {
    VStep,
  },
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: 'tour',
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
  },
  data() {
    return {
      currentStep: -1,
      styleMsk: {
        path: '',
        width: 0,
        height: 0,
      },
    }
  },
  computed: {
    // Allow us to define custom options and merge them with the default options.
    // Since options is a computed property, it is reactive and can be updated during runtime.
    customOptions() {
      let highlight = DEFAULT_OPTIONS.highlight

      if (typeof this.options.highlight !== 'boolean') {
        highlight = { ...highlight, ...this.options.highlight, enabled: true }
      }

      if (typeof this.options.highlight === 'boolean') {
        highlight = { ...highlight, enabled: this.options.highlight }
      }

      return {
        ...DEFAULT_OPTIONS,
        ...this.options,
        ...{ highlight }, // Use global tour highlight setting first
      }
    },
    customCallbacks() {
      return {
        ...DEFAULT_CALLBACKS,
        ...this.callbacks,
      }
    },
    // Return true if the tour is active, which means that there's a VStep displayed
    isRunning() {
      return this.currentStep > -1 && this.currentStep < this.numberOfSteps
    },
    isFirst() {
      return this.currentStep === 0
    },
    isLast() {
      return this.currentStep === this.steps.length - 1
    },
    numberOfSteps() {
      return this.steps.length
    },
    step() {
      return this.steps[this.currentStep]
    },
  },
  mounted() {
    const { $tours } = useNuxtApp()

    $tours[this.name] = {
      start: this.start,
      stop: this.stop,
      skip: this.skip,
      finish: this.finish,
      previousStep: this.previousStep,
      nextStep: this.nextStep
    }
  },
  unmounted() {
    // Remove the keyup listener if it has been defined
    if (this.customOptions.useKeyboardNavigation) {
      window.removeEventListener('keyup', this.handleKeyup)
    }
  },
  methods: {
    mountedStep(element) {
      if (this.customOptions.highlight) {
        this.overlayStep(element)
      }
    },
    overlayStep(element) {
      if (!element) {
        return
      }

      const radio = this.customOptions.highlight.radio
      const padding = this.customOptions.highlight.padding

      const rect = element.getBoundingClientRect()

      const y = rect.y - padding
      const x = rect.x - padding
      const ancho = rect.width + padding * 2
      const alto = rect.height + padding * 2
      const anchoViewport = window.innerWidth
      const altoViewport = window.innerHeight

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

      this.styleMsk = {
        path,
        width: anchoViewport,
        height: altoViewport,
      }
    },
    async start(startStep) {
      // Register keyup listeners for this tour
      if (this.customOptions.useKeyboardNavigation) {
        window.addEventListener('keyup', this.handleKeyup)
      }

      // Wait for the DOM to be loaded, then start the tour
      startStep = typeof startStep !== 'undefined' ? parseInt(startStep, 10) : 0
      const step = this.steps[startStep]

      const process = () =>
        new Promise((resolve) => {
          setTimeout(() => {
            this.customCallbacks.onStart()
            this.currentStep = startStep
            resolve()
          }, this.customOptions.startTimeout)
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
    },
    async previousStep() {
      const futureStep = this.currentStep - 1

      const process = () =>
        new Promise((resolve) => {
          this.customCallbacks.onPreviousStep(this.currentStep)
          this.currentStep = futureStep
          resolve()
        })

      if (futureStep > -1) {
        const step = this.steps[futureStep]
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
    },
    async nextStep() {
      const futureStep = this.currentStep + 1

      const process = () =>
        new Promise((resolve, reject) => {
          this.customCallbacks.onNextStep(this.currentStep)
          this.currentStep = futureStep
          resolve()
        })

      if (futureStep < this.numberOfSteps && this.currentStep !== -1) {
        const step = this.steps[futureStep]
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
    },
    stop() {
      this.customCallbacks.onStop()
      this.currentStep = -1
    },
    skip() {
      this.customCallbacks.onSkip()
      this.stop()
    },
    finish() {
      this.customCallbacks.onFinish()
      this.stop()
    },
    handleKeyup(e) {
      if (this.customOptions.debug) {
        console.log('[Vue Tour] A keyup event occured:', e)
      }
      switch (e.keyCode) {
        case KEYS.ARROW_RIGHT:
          this.isKeyEnabled('arrowRight') && this.nextStep()
          break
        case KEYS.ARROW_LEFT:
          this.isKeyEnabled('arrowLeft') && this.previousStep()
          break
        case KEYS.ESCAPE:
          this.isKeyEnabled('escape') && this.stop()
          break
      }
    },
    isKeyEnabled(key) {
      const { enabledNavigationKeys } = this.customOptions

      // eslint-disable-next-line no-prototype-builtins
      return enabledNavigationKeys.hasOwnProperty(key)
        ? enabledNavigationKeys[key]
        : true
    },
    clickOverlay() {
      if (this.customOptions.highlight.closeable) {
        this.stop()
      }
    },
  },
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
