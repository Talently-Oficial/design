<script setup lang="ts">
const { t: $t } = useI18n()

const props = defineProps<{ percentage: number; text: string; level: string }>()
</script>

<template>
	<div class="text-center">
		<div class="relative p-1 2xl:p-2">
			<svg
				width="254"
				height="229"
				viewBox="0 0 254 229"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="w-full h-auto"
			>
				<path
					d="M65.1008 223.088C61.3023 228.985 53.3954 230.733 47.9076 226.365C31.4165 213.239 18.3964 196.167 10.1052 176.645C1.81399 157.122 -1.42943 135.899 0.57601 114.917C1.24337 107.935 7.99197 103.459 14.8727 104.82V104.82C21.7534 106.181 26.1434 112.868 25.6508 119.865C24.5274 135.822 27.1844 151.882 33.4842 166.716C39.7839 181.549 49.4961 194.614 61.7587 204.886C67.1356 209.389 68.8992 217.192 65.1008 223.088V223.088Z"
					:class="percentage >= 0 && percentage < 25 && props.level !== 'none' ? 'fill-red-400' : 'fill-neutral-50'"
				/>
				<path
					d="M18.109 92.2546C11.4269 90.1225 7.6801 82.9435 10.4687 76.5076C18.8485 57.1676 31.9408 40.1517 48.6313 27.0633C65.3217 13.9749 84.9685 5.31738 105.749 1.79054C112.664 0.616897 118.742 5.96734 119.22 12.9651V12.9651C119.697 19.9628 114.384 25.9425 107.5 27.2887C91.8014 30.3588 76.9865 37.106 64.305 47.0507C51.6235 56.9953 41.5385 69.7742 34.8138 84.2883C31.8652 90.6525 24.7911 94.3868 18.109 92.2546V92.2546Z"
					:class="percentage >= 25 && percentage < 50 && props.level !== 'none' ? 'fill-orange-300' : 'fill-neutral-50'"
				/>
				<path
					d="M135.071 12.9853C135.566 5.9888 141.658 0.653881 148.571 1.84516C169.342 5.425 188.966 14.1326 205.623 27.2636C222.281 40.3945 235.329 57.4438 243.66 76.8052C246.432 83.2481 242.667 90.4175 235.979 92.5326V92.5326C229.292 94.6477 222.227 90.8953 219.295 84.5237C212.607 69.9924 202.555 57.1879 189.899 47.2109C177.243 37.2339 162.445 30.4489 146.754 27.3388C139.874 25.9751 134.576 19.9818 135.071 12.9853V12.9853Z"
					:class="
						percentage >= 50 && percentage < 75 && props.level !== 'none' ? 'fill-primary-600' : 'fill-neutral-50'
					"
				/>
				<path
					d="M239.075 104.557C245.953 103.18 252.712 107.64 253.395 114.621C255.45 135.598 252.256 156.829 244.011 176.371C235.765 195.913 222.785 213.015 206.325 226.18C200.847 230.561 192.936 228.831 189.124 222.943V222.943C185.312 217.056 187.057 209.249 192.423 204.733C204.662 194.432 214.344 181.345 220.609 166.497C226.874 151.649 229.493 135.582 228.332 119.627C227.823 112.632 232.198 105.935 239.075 104.557V104.557Z"
					:class="
						percentage >= 75 && percentage <= 100 && props.level !== 'none' ? 'fill-primary-700' : 'fill-neutral-50'
					"
				/>
			</svg>

			<div
				v-if="percentage >= 0 && percentage < 25 && props.level !== 'none'"
				class="absolute"
				style="bottom: 21%; left: 4%"
			>
				<div class="circle-style bg-red-400">
					<div class="bg-white size-3.5 2xl:size-4 rounded-full"></div>
				</div>
			</div>

			<div
				v-if="percentage >= 25 && percentage < 50 && props.level !== 'none'"
				class="absolute"
				style="top: 11%; left: 17%"
			>
				<div class="circle-style bg-orange-300">
					<div class="bg-white size-3.5 2xl:size-4 rounded-full"></div>
				</div>
			</div>

			<div
				v-if="percentage >= 50 && percentage < 75 && props.level !== 'none'"
				class="absolute"
				style="top: 11%; right: 17%"
			>
				<div class="circle-style bg-primary-600">
					<div class="bg-white size-3.5 2xl:size-4 rounded-full"></div>
				</div>
			</div>

			<div
				v-if="percentage >= 75 && percentage <= 100 && props.level !== 'none'"
				class="absolute"
				style="bottom: 21%; right: 4%"
			>
				<div class="circle-style bg-primary-700">
					<div class="bg-white size-3.5 2xl:size-4 rounded-full"></div>
				</div>
			</div>

			<div class="absolute inset-0 w-full h-full flex items-center justify-center pt-8">
				<div class="space-y-1.5 text-center">
					<div
						class="uppercase text-xs font-bold text-neutral-500"
						style="letter-spacing: 0.16rem"
					>
						{{ $t('Potencial') }}
					</div>
					<div class="font-bold text-6xl">{{ props.level !== 'none' ? percentage : '&nbsp;' }}</div>
					<div class="text-2.5xl text-neutral-500">{{ text }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.circle-style {
	@apply p-1.5 2xl:p-2.5 rounded-full;
	box-shadow: 3px 5px 8px -1px #00000067;
}
</style>
