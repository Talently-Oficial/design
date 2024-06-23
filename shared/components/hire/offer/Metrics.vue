<script setup lang="ts">
const props = defineProps({
	info: {
		type: Object,
		required: true,
	},
})

const isOpen = ref(false)
</script>

<template>
	<UCard
		class="border hover:shadow"
		:ui="{ body: { padding: 'p-3 sm:p-3' } }"
		v-bind="$attrs"
	>
		<div
			v-if="props.info.icon"
			class="hidden xl:block text-neutral-100 mb-0.5"
		>
			<span
				v-for="count in props.info.value.total"
				:key="count"
				:class="props.info.value.completed >= count ? props.info.color : 'text-neutral-300'"
			>
				<Icon :name="props.info.icon" />
			</span>
		</div>

		<div class="text-xs text-neutral-500 flex items-center">
			<template v-if="props.info.icon">
				<slot name="icon">
					<span
						class="mr-0.5 flex items-center xl:hidden"
						:class="props.info.color"
					>
						<Icon :name="props.info.icon" />
					</span>
				</slot>
			</template>

			<span>{{ props.info.title }}</span>

			<Icon
				name="uil:exclamation-circle"
				class="lg:hidden ml-1 text-primary-500"
				@click="isOpen = true"
			/>
		</div>

		<slot>
			<div class="font-bold text-lg">{{ props.info.value.text }}</div>
		</slot>
	</UCard>

	<UModal
		v-model="isOpen"
		:ui="{ padding: 'p-0 sm:p-4', rounded: 'rounded-t-2xl sm:rounded-lg' }"
		:title="props.info.title"
		hidden-footer
	>
		<div class="space-y-6">
			<slot name="content-modal" />

			<UButton
				variant="outline"
				color="black"
				block
				@click="isOpen = false"
			>
				{{ $t('Listo') }}
			</UButton>
		</div>
	</UModal>
</template>
