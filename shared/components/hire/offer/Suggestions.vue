<script setup>
const props = defineProps({
	list: {
		type: Array,
		required: true,
	},
})

const { t: $t } = useI18n()

const isOpen = ref(false)

const suggestions = computed(() => props.list.slice(0, 6))
</script>

<template>
	<div v-if="suggestions.length > 0">
		<UCard
			class="border hover:shadow xl:hidden"
			:ui="{ body: { padding: 'p-3 sm:p-3' } }"
			@click="isOpen = true"
		>
			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<UIcon
						name="i-ic-baseline-batch-prediction"
						class="mr-1 text-orange-300"
						size="20"
					/>
					<span class="font-semibold text-sm">{{ $t('Ver sugerencias') }}</span>
				</div>

				<UIcon
					name="i-ic-baseline-arrow-forward"
					class="text-primary-500"
				/>
			</div>
		</UCard>

		<UCard
			:ui="{ body: { padding: 'p-3 sm:p-3' } }"
			class="border hidden xl:block"
		>
			<div class="mb-2">
				<span class="font-semibold text-sm">{{ $t('Sugerencias') }}</span>
			</div>

			<div class="mb-2 grid gap-4">
				<div
					v-for="(suggest, index) in suggestions"
					:key="index"
					class="flex items-start gap-2"
				>
					<div class="w-8">
						<Icon
							name="ic:baseline-batch-prediction"
							class="mr-1 text-orange-300"
							size="20"
						/>
					</div>

					<div class="text-neutral-400 text-sm">
						{{ $t(suggest) }}
					</div>
				</div>
			</div>
		</UCard>

		<UModal
			v-model="isOpen"
			:ui="{ padding: 'p-0 sm:p-4', rounded: 'rounded-t-2xl sm:rounded-lg' }"
			:title="$t('Sugerencias')"
			hidden-footer
		>
			<div class="space-y-6">
				<div class="grid gap-4">
					<div
						v-for="(suggest, index) in props.list"
						:key="index"
						class="flex items-start gap-2"
					>
						<div class="w-8">
							<Icon
								name="ic:baseline-batch-prediction"
								class="mr-1 text-orange-300"
								size="20"
							/>
						</div>

						<div class="text-neutral-400 text-sm">
							{{ $t(suggest) }}
						</div>
					</div>
				</div>

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
	</div>
</template>
