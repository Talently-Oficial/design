<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'title',
  },
  percentage: {
    type: Number,
    default: 0,
  },
  value: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const is25Percentage = computed(() => {
  if (props.loading) return 'fill-neutral-50'
  return props.percentage > 0 && props.percentage < 25 ? 'fill-red-400' : 'fill-neutral-50'
})

const is50Percentage = computed(() => {
  if (props.loading) return 'fill-neutral-50'
  return props.percentage >= 25 && props.percentage < 50 ? 'fill-orange-300' : 'fill-neutral-50'
})

const is75Percentage = computed(() => {
  if (props.loading) return 'fill-neutral-50'
  return props.percentage >= 50 && props.percentage < 75 ? 'fill-primary-600' : 'fill-neutral-50'
})

const is100Percentage = computed(() => {
  if (props.loading) return 'fill-neutral-50'
  return props.percentage >= 75 && props.percentage <= 100 ? 'fill-primary-700' : 'fill-neutral-50'
})

const getProgress = computed(() => {
  if (props.percentage >= 0 && props.percentage < 25) {
    return {
      rotation: 1,
      stroke: 'stroke-red-400',
    }
  }

  if (props.percentage >= 25 && props.percentage < 50) {
    return {
      rotation: 73,
      stroke: 'stroke-orange-300',
    }
  }

  if (props.percentage >= 50 && props.percentage < 75) {
    return {
      rotation: 145,
      stroke: 'stroke-primary-600',
    }
  }

  if (props.percentage >= 75 && props.percentage <= 100) {
    return {
      rotation: 217,
      stroke: 'stroke-primary-700',
    }
  }

  return {
    rotation: 0,
    stroke: 'stroke-neutral-50',
  }
})
</script>

<template>
  <div class="relative">
    <svg width="699" height="699" viewBox="0 0 699 699" fill="none" xmlns="http://www.w3.org/2000/svg"
         class="w-full h-auto">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M508.153 602.772C516.525 620.501 508.939 641.659 491.21 650.031C446.894 670.957 398.51 681.858 349.511 681.955C300.512 682.052 252.105 671.342 207.745 650.585C189.987 642.275 182.328 621.143 190.637 603.385C198.947 585.627 220.079 577.967 237.837 586.277C272.728 602.603 310.811 611.032 349.371 610.955C387.93 610.879 426.011 602.3 460.894 585.829C478.623 577.457 499.782 585.043 508.153 602.772Z"
            fill="none"/>

      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M158.727 579.961C144.534 593.487 122.063 592.947 108.537 578.753C74.7263 543.275 49.1505 500.782 33.6366 454.304C18.1227 407.826 13.0526 358.508 18.7931 309.869C21.0912 290.398 38.7385 276.477 58.2094 278.775C77.6804 281.073 91.6018 298.72 89.3037 318.191C84.7886 356.447 88.7753 395.248 100.984 431.824C113.193 468.4 133.321 501.845 159.935 529.771C173.461 543.964 172.92 566.435 158.727 579.961Z"
            :class="is25Percentage"/>

      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M72.4536 235.965C55.3215 226.432 49.1618 204.815 58.6956 187.683C82.5266 144.858 115.503 107.813 155.273 79.1908C195.043 50.5689 240.629 31.0755 288.776 22.1066C308.051 18.5161 326.587 31.2306 330.177 50.5051C333.768 69.7796 321.053 88.3154 301.778 91.9059C263.908 98.9603 228.044 114.295 196.747 136.818C165.45 159.342 139.494 188.499 120.736 222.207C111.203 239.339 89.5856 245.499 72.4536 235.965Z"
            :class="is50Percentage"/>

      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M369.691 50.9504C373.344 31.6876 391.92 19.033 411.183 22.6856C459.334 31.8159 504.88 51.4463 544.571 80.1776C584.262 108.909 617.121 146.035 640.798 188.907C650.276 206.07 644.047 227.667 626.884 237.145C609.722 246.623 588.125 240.394 578.646 223.231C560.023 189.51 534.174 160.301 502.939 137.691C471.704 115.081 435.857 99.6293 397.956 92.4426C378.693 88.7899 366.038 70.2132 369.691 50.9504Z"
            :class="is75Percentage"/>

      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M639.534 277.269C658.988 274.835 676.732 288.632 679.166 308.087C685.25 356.716 680.542 406.089 665.375 452.681C650.208 499.274 624.955 541.938 591.415 577.628C577.989 591.915 555.522 592.613 541.235 579.186C526.948 565.76 526.25 543.293 539.677 529.006C566.057 500.935 585.926 467.369 597.862 430.704C609.798 394.038 613.504 355.179 608.715 316.901C606.281 297.447 620.079 279.703 639.534 277.269Z"
            :class="is100Percentage"/>
    </svg>

    <!-- Loader -->
    <svg v-if="loading" width="699" height="699" viewBox="0 0 699 699" fill="none" xmlns="http://www.w3.org/2000/svg"
         class="w-full h-auto absolute inset-0 animate-spin opacity-20">
      <path
          d="M644.767 313.043C650.084 356.118 645.879 399.833 632.449 441.112C619.02 482.39 596.691 520.229 567.035 551.964"
          stroke="#6621DA" stroke-width="71" stroke-miterlimit="2.3662" stroke-linecap="round"/>
    </svg>

    <!-- Pointer -->
    <template v-if="!loading">
      <svg v-if="props.percentage" width="699" height="699" viewBox="0 0 699 699" fill="none" xmlns="http://www.w3.org/2000/svg"
           class="w-full h-auto absolute inset-0 circle-style"
           :style="{ 'transform': `rotate(${getProgress.rotation}deg)`}">
        <circle cx="68.7845" cy="449.015" r="37" fill="white" :class="getProgress.stroke" stroke-width="30"/>
      </svg>
    </template>

    <div class="absolute inset-0 w-full h-full flex items-center justify-center">
      <div class="space-y-1.5 text-center">
        <div
            class="uppercase text-xs font-bold text-neutral-500"
            style="letter-spacing: 0.16rem"
        >
          {{ props.title }}
        </div>
        <div class="font-bold text-6xl text-neutral-700">{{ props.percentage ?? '---' }}</div>
        <div class="text-xl text-neutral-500">{{ props.value ? props.value : '--' }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.circle-style {
  filter: drop-shadow(0px 0px 5px rgb(0 0 0 / 0.4));
}
</style>
