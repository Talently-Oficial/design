<script setup lang="ts">
interface ConfigImage {
	default: string
	mobile: string
	desktop: string
}

interface InfoComputed {
	type: string
	text?: string | null
	html?: string | null
	image?: ConfigImage | null
	link?: string
	css_class?: string
	css_style?: string
}

const props = defineProps<{
	config: InfoComputed
}>()

const getInfo = computed<InfoComputed>(() => {
	const configDefault = {
		type: 'text',
		text: null,
		css_style: 'background: #FDF9CF; color: #584E22',
	}

	const config = props.config

	if (typeof config === 'object' && config !== null) {
		return {
			...configDefault,
			...config,
		}
	}

	return configDefault
})
</script>

<template>
	<div
		v-if="getInfo.text || getInfo.html || getInfo.image"
		class="relative"
	>
		<a
			v-if="getInfo.link"
			:href="getInfo.link"
			class="absolute inset-0 bg-blue"
			target="_blank"
		/>

		<div
			:class="getInfo.css_class"
			:style="getInfo.css_style"
		>
			<template v-if="getInfo.type === 'text'">
				<div class="text-sm px-4 py-3">
					{{ getInfo.text }}
				</div>
			</template>

			<template v-if="getInfo.type === 'image'">
				<picture>
					<source
						media="(min-width: 601px)"
						:srcset="getInfo.image?.desktop"
						class="mx-auto"
					/>
					<source
						media="(max-width: 600px)"
						:srcset="getInfo.image?.mobile"
						class="mx-auto"
					/>
					<img
						:src="getInfo.image?.default || getInfo.image?.desktop"
						alt="Talently"
						class="mx-auto"
					/>
				</picture>
			</template>

			<template v-if="getInfo.type === 'html'">
				<div v-html="getInfo.html" />
			</template>
		</div>
	</div>
</template>

<style scoped></style>
