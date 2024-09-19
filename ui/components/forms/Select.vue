<template>
	<div>
		<slot name="label">
			<ULabel
				v-if="label"
				:required="required"
			>
				{{ label }}
			</ULabel>
		</slot>

		<slot name="description">
			<p
				v-if="description"
				class="mb-2 -mt-1 text-grey-500 opacity-50"
			>
				{{ description }}
			</p>
		</slot>

		<div class="relative">
			<select
				v-model="proxyChecked"
				:tabindex="tabindex - 1"
				:required="required"
				:disabled="disabled"
				class="absolute top-0 left-0 w-full h-full focus:outline-none opacity-0"
				:multiple="multiple"
				:class="mobileNative && !multiple ? 'z-20 md:z-0' : 'z-0'"
			>
				<option
					v-for="(option, index) in options"
					:key="index"
					:value="option"
				>
					{{ renderNameMobile(option) }}
				</option>
			</select>

			<VueMultiselect
				ref="multiselect"
				v-model="proxyChecked"
				:tabindex="tabindex"
				:class="{
					'select-multiple': multiple,
					'select-error': messageDanger,
					'select-loading': loading,
					'outer-capsules': outerCapsules,
				}"
				:multiple="multiple"
				:close-on-select="closeOnSelect"
				:options="options"
				:loading="loading"
				:disabled="disabled"
				:allow-empty="allowEmpty"
				:custom-label="customLabel"
				:searchable="searchable"
				:select-label="selectLabel"
				:deselect-label="deselectLabel"
				:selected-label="selectedLabel"
				:track-by="trackBy"
				:placeholder="placeholder"
				@search-change="$emit('search-change', $event)"
			>
				<template #singleLabel="{ option }">
					<slot
						name="singleLabel"
						:option="option"
					/>
				</template>

				<template #caret>
					<div class="multiselect__select mr-2">
						<slot name="icon-right"> </slot>
						<Icon
							class="multiselect__select--caret"
							name="carbon:chevron-down"
							size="16"
						/>
					</div>
				</template>

				<template #option="{ option }">
					<slot
						name="option"
						:option="option"
					>
						<div class="whitespace-normal">{{ option.label || option.name }}</div>
					</slot>
				</template>

				<template #noOptions>Sin opciones</template>

				<template #noResult>No se encontraron elementos</template>
			</VueMultiselect>
		</div>

		<div
			v-if="outerCapsules"
			class="mt-1"
		>
			<div
				v-for="(item, index) in proxyChecked"
				:key="index"
				class="bg-gray-100 text-xs px-2 py-1 m-1 rounded-lg inline-block"
			>
				{{ item.name }}
				<Icon
					name="uil:times-circle"
					class="ml-1 text-sm cursor-pointer"
					@click="removeSelectedItem(index)"
				/>
			</div>
		</div>

		<div
			v-if="messageDanger"
			class="text-sm text-red-500 mt-1"
		>
			{{ messageDanger }}
		</div>
	</div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
	name: 'Select',
	components: {
		VueMultiselect,
	},
	props: {
		outerCapsules: {
			type: Boolean,
			default: false,
		},
		modelValue: {
			type: [Object, Array, Number, String, Boolean],
			default: () => [],
		},
		tabindex: {
			type: Number,
			default: 1,
		},
		placeholder: {
			type: String,
			default: 'Buscar',
		},
		options: {
			type: Array,
			required: true,
		},
		searchable: {
			type: Boolean,
			default: true,
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		trackBy: {
			type: String,
			default: 'label',
		},
		selectLabel: {
			type: String,
			default: '',
		},
		deselectLabel: {
			type: String,
			default: '',
		},
		selectedLabel: {
			type: String,
			default: '',
		},
		required: {
			type: Boolean,
			default: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		allowEmpty: {
			type: Boolean,
			default: true,
		},
		messageDanger: {
			type: String,
			required: false,
			default: '',
		},
		closeOnSelect: {
			type: Boolean,
			default: true,
		},
		customLabel: {
			type: Function,
			default(option) {
				if (typeof option === 'object') {
					if (Object.prototype.isPrototypeOf.call(option, 'label')) {
						return 'Objeto sin label'
					}
					return option.label || option.name
				}
				return option
			},
		},
		mobileNative: {
			type: Boolean,
			default: true,
		},
		customLabelMobile: {
			type: Function,
			default(option) {
				if (typeof option === 'object') {
					if (Object.prototype.isPrototypeOf.call(option, 'label')) {
						return 'Objeto sin label'
					}
					return option.label || option.name
				}
				return option
			},
		},
	},
	emits: ['update:modelValue', 'select', 'scroll-end', 'search-change'],
	data: () => ({
		lastScrollTop: 0,
		elementListBox: null,
	}),
	computed: {
		proxyChecked: {
			get() {
				return this.modelValue
			},
			set(val) {
				this.$emit('update:modelValue', val || this.modelValue)
				this.$emit('select', val || this.modelValue)
			},
		},
	},
	mounted() {
		this.elementListBox = this.$refs.multiselect.$el.querySelector('.multiselect__content-wrapper')
		this.elementListBox.addEventListener('scroll', this.handleScrollSelect)
	},
	unmounted() {
		this.elementListBox.removeEventListener('scroll', this.handleScrollSelect)
	},
	methods: {
		renderNameMobile(option) {
			return this.customLabelMobile(option)
		},
		handleScrollSelect() {
			const element = this.elementListBox

			if (element.scrollTop < this.lastScrollTop) return

			this.lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop
			if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
				this.$emit('scroll-end')
			}
		},
		removeSelectedItem(index) {
			this.proxyChecked.splice(index, 1)
			this.$emit('select', this.modelValue)
		},
	},
}
</script>

<style>
fieldset[disabled] .multiselect {
  pointer-events: none;
}

.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  display: block;
  height: calc(100% - 2px);
  border-radius: 4px;
}

.multiselect.select-loading {
  .multiselect__select {
    opacity: 0;
  }
}

.multiselect__spinner:before,
.multiselect__spinner:after {
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  border-color: theme('colors.primary.700') transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}

.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}

.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}

/*
.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}

.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}
*/

.multiselect,
.multiselect__input,
.multiselect__single {
  touch-action: manipulation;
}

.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 42px;
  text-align: left;
  color: #35495e;
}

.multiselect * {
  box-sizing: border-box;
}

.multiselect:focus {
  outline: none;
}

.multiselect--disabled {
  background: #ededed;
  cursor: not-allowed;
  opacity: 0.6;
}

.multiselect--active {
  z-index: 50;
}

.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.multiselect--active .multiselect__select .multiselect__select--caret {
  transform: rotateZ(180deg);
}

.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  border: none;
  border-radius: 5px;
  background: #fff;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  vertical-align: top;
}

.multiselect__input::placeholder {
  color: #35495e;
}

.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}

.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}

.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}

/*
.multiselect__single {
}
*/

.multiselect__tags-wrap {
  display: inline;
}

.multiselect__tags {
  min-height: 42px;
  display: block;
  padding: 8px 40px 0 12px;
  @apply border-2;
  @apply border-gray-200;
  @apply border-opacity-80;
  @apply rounded-lg;
  background: #fff;
}

.select-error .multiselect__tags {
  border: 1px solid theme('colors.red.600');
}

.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 1px 26px 1px 13px;
  border-radius: 100px;
  margin-right: 4px;
  color: theme('colors.primary.700');
  background: theme('colors.primary.50');
  margin-bottom: 1px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  font-size: 0.9rem;
}

.multiselect__tag-icon {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 24px;
  text-align: center;
  transition: all 0.2s ease;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.multiselect__tag-icon:after {
  content: '×';
  font-size: 14px;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: theme('colors.primary.700');
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: white;
}

.multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
}

.multiselect__select {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  box-sizing: border-box;
  width: 34px;
  height: calc(100% - 2px);
  right: 1px;
  top: 1px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.multiselect__placeholder {
  color: rgb(160 174 192 / 1);
  display: inline-block;
}

.multiselect--active .multiselect__placeholder {
  display: none;
}

.multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: #fff;
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 5px 14px -2px #0000002e;
  border: 1px solid theme('colors.gray.300');
  border-top: none;
}

.multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
  @apply z-10;
}

.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: none;
  border-top: 1px solid #00000017;
  box-shadow: 0 0 14px -3px #0000002e;
}

.multiselect__content::webkit-scrollbar {
  display: none;
}

.multiselect__element {
  display: block;
}

.multiselect__option {
  display: block;
  padding: 10px 12px;
  line-height: 17px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 16px;
  padding-left: 10px;
  font-size: 13px;
  height: 100%;
}

.multiselect__option--highlight {
  background: theme('colors.primary.50');
  outline: none;
  color: theme('colors.primary.700');
}

.multiselect__option--highlight:after {
  content: attr(data-select);
  background: theme('colors.primary.50');
  color: theme('colors.primary.700');
}

.multiselect__option--selected {
  background: #f3f3f3;
  color: #35495e;
}

.multiselect__option--selected:after {
  content: attr(data-selected);
  color: theme('colors.primary.700');
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #f3f3f3;
}

.multiselect__option--selected.multiselect__option--highlight:after {
  background: #f3f3f3;
  content: attr(data-deselect);
}

.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  color: #a6a6a6;
}

.multiselect--disabled .multiselect__tags {
  background: #ededed;
}

.multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}

.multiselect__option--group {
  background: #ededed;
  color: #35495e;
}

.multiselect__option--group.multiselect__option--highlight {
  background: #35495e;
  color: #fff;
}

.multiselect__option--group.multiselect__option--highlight:after {
  background: #35495e;
}

.multiselect__option--disabled.multiselect__option--highlight {
  background: #dedede;
}

.multiselect__option--group-selected.multiselect__option--highlight {
  /*background: #ff6a6a; color: #fff;*/
}

.multiselect__option--group-selected.multiselect__option--highlight:after {
  /*background: #ff6a6a; content: attr(data-deselect);*/
  color: #fff;
}

.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}

.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}

.multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}

.select-multiple.multiselect--active {
  .multiselect__tags {
    padding: 8px 40px 8px 12px;
  }
}

.multiselect__input,
.multiselect__single {
  background-color: transparent;
}

@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}

.outer-capsules {
	.multiselect__tags-wrap {
		display: none;
	}

	.multiselect__input {
		width: 100% !important;
	}
}
</style>
