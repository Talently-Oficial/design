<template>
  <div
      ref="v-step"
      :class="[isSticky ? 'v-step--sticky' : '', stepStyle]"
      class="v-step"
  >
    <div class="space-y-4">
      <slot name="header">
        <div
            v-if="step.header"
            class="v-step__header"
        >
          <div
              v-if="step.header.title"
              v-html="step.header.title"
          />
        </div>
      </slot>

      <slot name="content">
        <div class="v-step__content">
          <div
              v-if="step.content"
              v-html="step.content"
          />
          <div v-else>
            This is a demo step! The id of this step is v-step and it targets
            {{ step.target }}.
          </div>
        </div>
      </slot>

      <slot
          name="actions"
          :is-button-enabled="isButtonEnabled"
          :is-first="isFirst"
          :is-last="isLast"
          :skip="skip"
          :previous-step="previousStep"
          :next-step="nextStep"
          :finish="finish"
      >
        <div class="v-step__buttons">
          <div
              class="flex gap-2 pt-1"
              :class="{
							'justify-end': !isButtonEnabled('buttonPrevious'),
							'justify-between': isButtonEnabled('buttonPrevious'),
						}"
          >
            <div>
              <UButton
                  v-if="!isLast && isButtonEnabled('buttonSkip')"
                  class="v-step__button v-step__button-skip"
                  size="sm"
                  variant="ghost"
                  @click.prevent="skip"
              >
                <span class="font-semibold"> {{ labels.buttonSkip }}</span>
              </UButton>
            </div>

            <div>
              <UButton
                  v-if="!isFirst && isButtonEnabled('buttonPrevious')"
                  class="v-step__button v-step__button-previous"
                  size="sm"
                  variant="ghost"
                  @click.prevent="previousStep"
              >
                <span class="font-semibold"> {{ labels.buttonPrevious }} wsd</span>
              </UButton>

              <UButton
                  v-if="!isLast && isButtonEnabled('buttonNext')"
                  class="v-step__button v-step__button-next"
                  size="sm"
                  color="primary"
                  @click.prevent="nextStep"
              >
                {{ labels.buttonNext }}
              </UButton>

              <UButton
                  v-if="isLast && isButtonEnabled('buttonStop')"
                  class="v-step__button v-step__button-stop"
                  size="sm"
                  color="primary"
                  @click.prevent="finish"
              >
                {{ labels.buttonStop }}
              </UButton>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <div
        class="v-step__arrow"
        data-popper-arrow
    />
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { DEFAULT_OPTIONS, DEFAULT_STEP_OPTIONS, HIGHLIGHT } from './constants'

export default {
  name: 'VStep',
  props: {
    step: {
      type: Object,
      required: true,
    },
    previousStep: {
      type: Function,
      default: function () {},
    },
    nextStep: {
      type: Function,
      default: function () {},
    },
    stop: {
      type: Function,
      default: function () {},
    },
    skip: {
      type: Function,
      default: function () {},
    },
    finish: {
      type: Function,
      default: function () {
        this.stop()
      },
    },
    isFirst: {
      type: Boolean,
    },
    isLast: {
      type: Boolean,
    },
    labels: {
      type: Object,
      default: () => {
        return {
          ...DEFAULT_OPTIONS.labels,
        }
      },
    },
    enabledButtons: {
      type: Object,
      default: () => {
        return {
          buttonSkip: true,
          buttonPrevious: true,
          buttonNext: true,
          buttonStop: true,
        }
      },
    },
    highlight: {
      type: [Object, Boolean],
      default: () => ({
        ...DEFAULT_OPTIONS.highlight,
      }),
    },
    stopOnFail: {
      type: Boolean,
    },
    debug: {
      type: Boolean,
    },
    stepStyle: {
      type: String,
      default: 'v-step--customer',
    },
  },
  data() {
    return {
      elements: [],
      targetElement: document.querySelector(this.step.target),
      observerElement: null,
      popper: null,
    }
  },
  computed: {
    params() {
      return {
        ...DEFAULT_STEP_OPTIONS,
        ...{ highlight: this.highlight }, // Use global tour highlight setting first
        ...{ enabledButtons: Object.assign({}, this.enabledButtons) },
        ...this.step.params, // Then use local step parameters if defined
      }
    },
    /**
     * A step is considered sticky if it has no target.
     */
    isSticky() {
      return !this.step.target
    },
  },
  mounted() {
    this.targetElement.classList.add(HIGHLIGHT.classes.targetActive)

    if (!this.params.highlight.interaction) {
      this.targetElement.classList.add(HIGHLIGHT.classes.targetDisabled)
    }
    this.createStep()
  },
  unmounted() {
    this.targetElement.classList.remove(HIGHLIGHT.classes.targetActive)

    if (!this.params.highlight.interaction) {
      this.targetElement.classList.remove(HIGHLIGHT.classes.targetDisabled)
    }
    // this.removeHighlight()
    this.removeListeners()
  },
  methods: {
    createStep() {
      if (this.debug) {
        console.log(`[Vue Tour] The target element ${this.step.target} of .v-step[id="v-step"] is:`, this.targetElement)
      }

      if (this.isSticky) {
        document.body.appendChild(this.$refs['v-step'])
      } else if (this.targetElement) {
        this.enableScrolling()
        // this.createHighlight()
        this.popper = createPopper(this.targetElement, this.$refs['v-step'], this.params)

        this.elements = this.popper.state.scrollParents.reference.filter((element) => element instanceof HTMLElement)

        this.addListeners()

        this.$emit('mounted', this.targetElement)
      } else {
        if (this.debug) {
          console.error(`[Vue Tour] The target element ${this.step.target} of .v-step[id="v-step"] does not exist!`)
        }
        this.$emit('targetNotFound', this.step)
        if (this.stopOnFail) {
          this.stop()
        }
      }
    },
    enableScrolling() {
      if (this.params.enableScrolling) {
        this.targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    },
    isHighlightEnabled() {
      if (this.debug) {
        console.log(
            `[Vue Tour] Highlight is ${this.params.highlight ? 'enabled' : 'disabled'} for .v-step[id="v-step"]`,
        )
      }
      return this.params.highlight
    },
    reloadPopper() {
      this.popper.forceUpdate()
    },
    createHighlight() {
      if (this.isHighlightEnabled()) {
        document.body.classList.add(HIGHLIGHT.classes.active)

        const transitionValue = window.getComputedStyle(this.targetElement).getPropertyValue('transition')

        // Make sure our background doesn't flick on transitions
        if (transitionValue !== 'all 0s ease 0s') {
          this.targetElement.style.transition = `${transitionValue}, ${HIGHLIGHT.transition}`
        }

        this.targetElement.classList.add(HIGHLIGHT.classes.targetHighlighted)
        // The element must have a position, if it doesn't have one, add a relative position class
      } else {
        document.body.classList.remove(HIGHLIGHT.classes.active)
      }
    },
    removeHighlight() {
      if (this.isHighlightEnabled()) {
        document.body.classList.remove(HIGHLIGHT.classes.active)

        const target = this.targetElement
        const currentTransition = this.targetElement.style.transition
        this.targetElement.classList.remove(HIGHLIGHT.classes.targetHighlighted)
        // Remove our transition when step is finished.
        if (currentTransition.includes(HIGHLIGHT.transition)) {
          setTimeout(() => {
            target.style.transition = currentTransition.replace(`, ${HIGHLIGHT.transition}`, '')
          }, 0)
        }
      }
    },
    isButtonEnabled(name) {
      // eslint-disable-next-line no-prototype-builtins
      return this.params.enabledButtons.hasOwnProperty(name) ? this.params.enabledButtons[name] : true
    },
    addListeners() {
      if (this.isHighlightEnabled()) {
        this.elements.forEach((element) => {
          element.addEventListener('scroll', this.onScroll)
          element.addEventListener('resize', this.onResize)
        })

        window.addEventListener('resize', this.onResize)
        document.addEventListener('scroll', this.onScroll)

        this.observerElement = new ResizeObserver(() => {
          this.onResize()
        })
        this.observerElement.observe(this.targetElement)
      }
    },
    removeListeners() {
      if (this.isHighlightEnabled()) {
        this.elements.forEach((element) => {
          element.removeEventListener('scroll', this.onScroll)
          element.removeEventListener('resize', this.onResize)
        })

        window.removeEventListener('resize', this.onResize)
        document.removeEventListener('scroll', this.onScroll)

        this.observerElement.disconnect()
      }
    },
    onResize() {
      this.$emit('resize', this.targetElement)
      this.reloadPopper()
    },
    onScroll() {
      this.$emit('scroll', this.targetElement)
    },
  },
}
</script>

<style lang="postcss" scoped>
.v-step {
  background: white;

  border-radius: 6px;
  box-shadow:
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  pointer-events: auto;
  z-index: 10000;
  padding: 1rem;

  &--sticky {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & .v-step__arrow {
      display: none;
    }
  }

  &__header {
    font-weight: bold;
  }
}

.v-step__arrow,
.v-step__arrow::before {
  position: absolute;
  width: 10px;
  height: 10px;
  background: inherit;
}

.v-step__arrow {
  visibility: hidden;
}

.v-step__arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.v-step[data-popper-placement^='top'] > .v-step__arrow {
  bottom: -5px;
}

.v-step[data-popper-placement^='bottom'] > .v-step__arrow {
  top: -5px;
}

.v-step[data-popper-placement^='right'] > .v-step__arrow {
  left: -5px;
}

.v-step[data-popper-placement^='left'] > .v-step__arrow {
  right: -5px;
}

.v-step--customer {
  max-width: 330px;
}
</style>
