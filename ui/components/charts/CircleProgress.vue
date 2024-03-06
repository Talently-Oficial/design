<template>
	<svg
		:width="sqSize"
		:height="sqSize"
		:viewBox="viewBox"
		fill="none"
	>
		<circle
			:cx="sqSize / 2"
			:cy="sqSize / 2"
			:r="radius"
			:stroke="border"
			:stroke-width="`${strokeWidth}px`"
		/>
		<circle
			class="animation-circle"
			:cx="sqSize / 2"
			:cy="sqSize / 2"
			:r="radius"
			:stroke="colorProgress"
			:stroke-width="`${strokeWidth}px`"
			:transform="`rotate(-90 ${sqSize / 2} ${sqSize / 2})`"
			stroke-linecap="round"
			stroke-linejoin="round"
			:style="{
				strokeDasharray: dashArray,
				strokeDashoffset: dashOffset,
			}"
		/>
	</svg>
</template>

<script>
export default {
	name: 'CircleProgress',
	props: {
		sqSize: {
			type: Number,
			default: 200,
		},
		progress: {
			type: Number,
			default: 0,
		},
		strokeWidth: {
			type: Number,
			default: 10,
		},
		border: {
			type: String,
			default: '#C4C4C4',
		},
		color: {
			type: String,
			default: '',
		},
	},
	computed: {
		radius() {
			return (this.sqSize - this.strokeWidth) / 2
		},
		viewBox() {
			return `0 0 ${this.sqSize} ${this.sqSize}`
		},
		dashArray() {
			return this.radius * Math.PI * 2
		},
		dashOffset() {
			return this.dashArray - (this.dashArray * this.progress) / 100
		},
		colorProgress() {
			if (this.color) return this.color

			if (this.progress >= 70) {
				return '#28C76F'
			}

			if (this.progress >= 20) {
				return '#ffb700'
			}

			return '#ff3c00'
		},
	},
}
</script>

<style scoped>
.animation-circle {
	transition: stroke-dashoffset 0.25s;
}
</style>
