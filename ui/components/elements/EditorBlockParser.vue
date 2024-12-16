<template>
	<div>
		<div
			v-for="(block, index) in blocks"
			:key="index"
			class="content-block"
		>
			<template v-if="block.type === 'warning'">
				<div class="content-block__warning flex">
					<div
						class="content-block__warning-icon"
						v-html="block.data.title"
					/>
					<div>
						<p v-html="block.data.message" />
					</div>
				</div>
			</template>

			<template v-if="block.type === 'paragraph'">
				<p
					class="content-block__paragraph render-html"
					v-html="block.data.text"
				/>
			</template>
			<template v-if="block.type === 'quote'">
				<p
					class="content-block__quote render-html"
					v-html="block.data.text"
				/>
			</template>

			<template v-if="block.type === 'header'">
				<h1
					v-if="block.data.level === 1"
					class="content-block__header h1"
					v-html="block.data.text"
				/>
				<h2
					v-if="block.data.level === 2"
					class="content-block__header h2"
					v-html="block.data.text"
				/>
				<h3
					v-if="block.data.level === 3"
					class="content-block__header h3"
					v-html="block.data.text"
				/>
				<h4
					v-if="block.data.level === 4"
					class="content-block__header h4"
					v-html="block.data.text"
				/>
				<h5
					v-if="block.data.level === 5"
					class="content-block__header h5"
					v-html="block.data.text"
				/>
			</template>

			<template v-if="block.type === 'list'">
				<ul
					class="content-block__list"
					:class="block.data.style"
				>
					<li
						v-for="(item, i) in block.data.items"
						:key="i"
						class="mb-3"
					>
						<div
							class="render-html"
							v-html="item"
						/>
					</li>
				</ul>
			</template>

			<template v-if="block.type === 'image'">
				<img
					:src="block.data.file.url"
					:alt="block.data.caption"
					loading="lazy"
					class="max-w-full block my-2 mx-auto"
					@click="zoomImage($event, block.data.file.url)"
				/>
			</template>

			<template v-if="block.type === 'delimiter'">
				<div class="deli" />
			</template>

			<template v-if="block.type === 'descargable'">
				<div class="my-3 bg-gray-200 rounded-lg flex flex-wrap justify-between px-6 py-4 items-center">
					<div class="flex items-center">
						<div class="flex">
							<svg
								v-if="block.data.icon === 'pdf'"
								class="w-10 h-10"
								viewBox="0 0 60 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M47.25 0h-31.5c-2.887 0-5.25 2.362-5.25 5.25v31.5c0 2.888 2.363 5.25 5.25 5.25h31.5c2.888 0 5.25-2.362 5.25-5.25V5.25C52.5 2.362 50.138 0 47.25 0zM24.937 19.688A3.932 3.932 0 0121 23.625h-2.625v5.25h-3.938v-15.75H21a3.932 3.932 0 013.938 3.938v2.625zm13.125 5.25a3.932 3.932 0 01-3.937 3.937h-6.563v-15.75h6.563a3.932 3.932 0 013.938 3.938v7.875zm10.5-7.875h-3.937v2.625h3.938v3.937h-3.938v5.25h-3.938v-15.75h7.876v3.938zm-30.187 2.625H21v-2.625h-2.625v2.625zM5.25 10.5H0v36.75c0 2.888 2.362 5.25 5.25 5.25H42v-5.25H5.25V10.5zM31.5 24.938h2.625v-7.875H31.5v7.875z"
									fill="#373737"
								/>
							</svg>
							<svg
								v-else-if="block.data.icon === 'imagen'"
								fill="none"
								class="w-10 h-10"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
								/>
								<path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<div class="ml-6">
							<p class="text-sm font-bold">Material descargable</p>
							<p class="text-2xl font-medium">
								{{ block.data.name }}
							</p>
						</div>
					</div>
					<div class="flex my-2">
						<a
							:href="block.data.url"
							target="_blank"
							@click="$emit('downloadMaterial', block.data.name)"
						>
							<button class="bg-primary-500 border-none py-3 px-10 rounded text-white font-bold cursor-pointer">
								Accede al recurso
							</button>
						</a>
					</div>
				</div>
			</template>
		</div>

		<UModal
			v-model="zoomModal"
      hidden-footer
      hidden-header
      :ui="{ width: 'md:max-w-5xl' }"
      :ui-card="{ body: { padding: 'p-0 sm:p-0' } }"
		>
			<a
				href="#"
				class="text-white absolute top-3 right-3 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center"
				@click.prevent="zoomModal = false"
			>
				<Icon
					name="material-symbols:close-rounded"
          class="size-5"
				/>
			</a>

			<div class="overflow-auto">
				<img
					:src="imageZoom"
					alt=""
					class="m-auto block"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup>
const props = defineProps({
	content: {
		type: Object,
		default: null,
	},
})

const zoomModal = ref(false)
const widthModal = ref(null)
const imageZoom = ref(null)

const blocks = computed(() => props.content?.blocks || '')

const zoomImage = (e, url) => {
	widthModal.value = e.target.naturalWidth
	zoomModal.value = true
	imageZoom.value = url
}
const openNewTAb = (e) => {
	e.preventDefault()
	window.open(e.target.href, '_blank')
}

onMounted(() => {
	document.querySelectorAll('.render-html a').forEach((item) => {
		item.addEventListener('click', (e) => openNewTAb(e))
	})
})

onUnmounted(() => {
	document.querySelectorAll('.render-html a').forEach((item) => {
		item.removeEventListener('click', (e) => this.openNewTAb(e))
	})
})
</script>

<style lang="postcss">
.content-block {
	font-size: 17px;
	line-height: 1.6;

	&__warning {
		padding: 18px 13px;
		border-radius: 3px;
		background: #f9f9fa;
		margin: 21px 0;

		&-icon {
			font-size: 18px;
			margin-right: 8px;
		}
	}

	&__header {
		margin: 1.5em 0 0.65em;
	}

	&__paragraph {
		margin-bottom: 14px;
	}

	&__quote {
		background: #f9f9f9;
		border-left: 10px solid #ccc;
		margin: 1.5em 10px;
		padding: 0.5em 10px;
	}

	&__list {
		padding-left: 21px;
		list-style: disc;
	}

	&_delimiter {
		text-align: center;
		margin: 20px;

		&:before {
			display: inline-block;
			content: '***';
			font-size: 30px;
			line-height: 65px;
			height: 30px;
			letter-spacing: 0.2em;
		}
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: 700;
	}

	h1 {
		@apply text-3xl;
		font-weight: 800;
	}

	h2 {
		@apply text-xl;
	}

	h3 {
		font-size: 1.15rem;
	}

	a {
		@apply underline text-primary-500;
	}

	&__typeform {
		iframe {
			min-height: 300px !important;
		}
	}
}

.deli {
	text-align: center;
	margin: 20px;

	&:before {
		display: inline-block;
		content: '***';
		font-size: 30px;
		line-height: 65px;
		height: 30px;
		letter-spacing: 0.2em;
	}
}

.inline-code {
	background: #f5cdcd75 !important;
	font-size: 0.86em;
	color: #b44437 !important;
}
</style>
