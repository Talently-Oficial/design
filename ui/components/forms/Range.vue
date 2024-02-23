<script setup lang="ts">
import VueSlider from 'vue-slider-component'

const emit = defineEmits(['drag-end'])
const model = defineModel()

const props = defineProps({
  inputBoxClass: {
    type: String,
    default: '',
  },
  showInputs: {
    type: Boolean,
    default: true,
  },
  data: {
    type: [Array, Object],
    default: undefined,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 1000,
  },
  minRange: {
    type: Number,
    default: undefined,
  },
  maxRange: {
    type: Number,
    default: undefined,
  },
  labelMinRange: {
    type: String,
    default: 'Min',
  },
  labelMaxRange: {
    type: String,
    default: 'Max',
  },
  step: {
    type: Number,
    default: 1,
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: String,
    default: 'active',
  },
})

const isShowInputs = computed(() => {
  if (Array.isArray(model.value)) {
    if (model.value.length === 2) {
      if (typeof model.value[0] === 'number' && typeof model.value[1] === 'number') {
        return props.showInputs
      }
    }
  }

  return false
})

const onDragEnd = (event: Event) => {
  emit('drag-end', event)
}

const onchange = (event: Event) => emit('drag-end', event)
</script>

<template>
  <div>
    <VueSlider
        width="100%"
        class="slide-range"
        v-model="model"
        :lazy="lazy"
        :min="props.min"
        :max="props.max"
        :min-range="props.minRange"
        :max-range="props.maxRange"
        :data="props.data"
        @change="onchange"
        @drag-end="onDragEnd"
        :interval="props.step"
        :disabled="props.disabled"
        :tooltip="props.tooltip"
        :dot-size="24"
        :height="8"
    />

    <div v-if="isShowInputs" class="flex gap-2 justify-between" :class="inputBoxClass">
      <div class="w-full max-w-36">
        <ULabel margin="mb-0">{{ props.labelMinRange }}</ULabel>
        <UInputNumber v-model="model[0]" :disabled="props.disabled" />
      </div>

      <div class="w-full max-w-36">
        <ULabel margin="mb-0">{{ props.labelMaxRange }}</ULabel>
        <UInputNumber v-model="model[1]" :disabled="props.disabled" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
/* component style */
.vue-slider-disabled .vue-slider-process {
  background-color: #a7a7a7;
}
.vue-slider-disabled .vue-slider-dot-handle {
  border-color: #a7a7a7;
}
.vue-slider-disabled .vue-slider-mark-step-active {
  box-shadow: 0 0 0 2px #a7a7a7;
}

/* rail style */
.vue-slider-rail {
  background-color: whitesmoke;
  border-radius: 15px;
  transition: background-color 0.3s;
}
.vue-slider:hover .vue-slider-rail {
  background-color: #e1e1e1;
}

/* process style */
.vue-slider-process {
  background-color: theme('colors.primary.500');
  border-radius: 15px;
  transition: background-color 0.3s;
}
.vue-slider:hover .vue-slider-process {
  background-color: theme('colors.primary.500');
}

/* mark style */
.vue-slider-mark-step {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #e8e8e8;
  background-color: #fff;
}
.vue-slider-mark-step-active {
  box-shadow: 0 0 0 2px theme('colors.primary.700');
}
.vue-slider:hover .vue-slider-mark-step-active {
  box-shadow: 0 0 0 2px theme('colors.primary.500');
}

.vue-slider-mark-label {
  font-size: 12px;
  white-space: nowrap;
}
/* dot style */
.vue-slider-dot-handle {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
  border: 4px solid theme('colors.primary.500');
  box-sizing: border-box;
  transition: box-shadow 0.3s, border-color 0.3s;
}
.vue-slider:hover .vue-slider-dot-handle {
  border-color: theme('colors.primary.500');
}

.vue-slider-dot-handle-focus {
  border-color: theme('colors.primary.500');
  box-shadow: 0 0 0 1px theme('colors.primary.500');
}
.vue-slider:hover .vue-slider-dot-handle-focus {
  border-color: theme('colors.primary.500');
}

.vue-slider-dot-handle:hover {
  border-color: theme('colors.primary.500');
}
.vue-slider:hover .vue-slider-dot-handle:hover {
  border-color: theme('colors.primary.500');
}

.vue-slider-dot-handle-disabled {
  cursor: not-allowed;
  border-color: #ddd !important;
}

.vue-slider-dot-tooltip {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}
.vue-slider-dot-tooltip-inner {
  font-size: 14px;
  white-space: nowrap;
  padding: 6px 8px;
  color: #fff;
  border-radius: 5px;
  border-color: rgba(0, 0, 0, 0.75);
  background-color: rgba(0, 0, 0, 0.75);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transform: scale(0.9);
  transition: transform 0.3s;
}
.vue-slider-dot-tooltip-inner::after {
  content: "";
  position: absolute;
}
.vue-slider-dot-tooltip-inner-top::after {
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-top-color: inherit;
}
.vue-slider-dot-tooltip-inner-bottom::after {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-bottom-color: inherit;
}
.vue-slider-dot-tooltip-inner-left::after {
  left: 100%;
  top: 50%;
  transform: translate(0, -50%);
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-left-color: inherit;
}
.vue-slider-dot-tooltip-inner-right::after {
  right: 100%;
  top: 50%;
  transform: translate(0, -50%);
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-right-color: inherit;
}
.vue-slider-dot-tooltip-inner-top {
  transform-origin: 50% 100%;
}
.vue-slider-dot-tooltip-inner-bottom {
  transform-origin: 50% 0;
}
.vue-slider-dot-tooltip-inner-left {
  transform-origin: 100% 50%;
}
.vue-slider-dot-tooltip-inner-right {
  transform-origin: 0% 50%;
}

.vue-slider-dot:hover .vue-slider-dot-tooltip, .vue-slider-dot-tooltip-show {
  opacity: 1;
  visibility: visible;
}
.vue-slider-dot:hover .vue-slider-dot-tooltip .vue-slider-dot-tooltip-inner, .vue-slider-dot-tooltip-show .vue-slider-dot-tooltip-inner {
  transform: scale(1);
}
</style>