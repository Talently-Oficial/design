<!--

Inspiración y versión para vue 3:
https://github.com/Youhan/maya-nuxt-template/blob/main/components/MasonryWall

-->

<template>
	<div
		ref="wall"
		class="grid"
		:class="gap"
	>
		<div
			v-for="(column, columnIndex) in getColumns"
			:key="`column-${columnIndex}`"
			class="flex items-start flex-nowrap flex-col"
			:class="gap"
			:data-index="columnIndex"
		>
			<div
				v-for="(item, itemIndex) in column"
				:key="`item-${itemIndex}`"
				class="w-full"
			>
				<slot
					:item="item"
					:index="itemIndex"
				>
					{{ item }}
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Masonry',
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		cols: {
			type: [Object, Number, String],
			default: 3,
		},
		gap: {
			type: String,
			default: 'gap-4',
		},
	},
	data() {
		return {
			displayColumns: 3,
			windowWidth: 1440,
		}
	},
	computed: {
		getColumns() {
			const columns = []

			for (let i = 0; i < this.items.length; i++) {
				const columnIndex = i % this.displayColumns

				if (!columns[columnIndex]) {
					columns[columnIndex] = []
				}

				columns[columnIndex].push(this.items[i])
			}

			return columns
		},
	},
	watch: {
		items: {
			handler() {
				this.reCalculate()
			},
			deep: true,
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.reCalculate()
		})

		if (process.client) {
			window.addEventListener('resize', this.reCalculate)
		}
	},
	beforeUnmount() {
		if (process.client) {
			window.removeEventListener('resize', this.reCalculate)
		}
	},
	methods: {
		breakpointValue(mixed, windowWidth) {
			const valueAsNum = parseInt(mixed)

			if (valueAsNum > -1) {
				return mixed
			} else if (typeof mixed !== 'object') {
				return 0
			}

			let matchedBreakpoint = Infinity
			let matchedValue = mixed.default || 0

			for (const k in mixed) {
				const breakpoint = parseInt(k)
				const breakpointValRaw = mixed[breakpoint]
				const breakpointVal = parseInt(breakpointValRaw)

				if (isNaN(breakpoint) || isNaN(breakpointVal)) {
					continue
				}

				const isNewBreakpoint = windowWidth <= breakpoint && breakpoint < matchedBreakpoint

				if (isNewBreakpoint) {
					matchedBreakpoint = breakpoint
					matchedValue = breakpointValRaw
				}
			}

			return matchedValue
		},
		reCalculate() {
			const previousWindowWidth = this.windowWidth
			this.windowWidth = (window ? window.innerWidth : null) || Infinity
			if (previousWindowWidth === this.windowWidth) return
			this.reCalculateColumnCount(this.windowWidth)
		},
		reCalculateColumnCount(windowWidth) {
			let newColumns = this.breakpointValue(this.cols, windowWidth)
			newColumns = Math.max(1, Number(newColumns) || 0)
			this.displayColumns = newColumns
		},
	},
}
</script>
