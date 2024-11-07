<script setup>
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  valueAttribute: {
    type: String,
    default: null,
  },
  optionAttribute: {
    type: String,
    default: 'name',
  },
  searchAttributes: {
    type: [Array, String],
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Seleccionar',
  },
  searchablePlaceholder: {
    type: String,
    default: 'Buscar',
  },
})

const emit = defineEmits(['change'])

const model = defineModel({ default: [] })

const selectedOptions = ref(null)

const uiBadge = {
  color: {
    primary: {
      soft: 'bg-primary-100 bg-opacity-50 text-gray-800'
    },
  },
}

const hasValue = computed(() => {
  if (model.value && props.multiple) {
    return model.value.length > 0
  }

  return model.value !== null
})

const setSelectedSkills = () => {
  if(props.valueAttribute === null) {
    selectedOptions.value = model.value
    return
  }

  if (props.multiple) {
    selectedOptions.value = props.options.filter((skill) => model.value.includes(skill.id))
  }

  if (!props.multiple) {
    selectedOptions.value = props.options.find((skill) => skill.id === model.value)
  }
}

const emitChange = () => {
  emit('change', model.value)
}

const changeSkills = (skills) => {
  if(props.valueAttribute === null) {
    model.value = skills
    emitChange()
    return
  }

  if (props.multiple) {
    model.value = skills.map((skill) => skill[props.valueAttribute])
    emitChange()
  }

  if (!props.multiple) {
    model.value = skills[props.valueAttribute]
    emitChange()
  }
}

const removeSkill = (id) => {
  selectedOptions.value = selectedOptions.value.filter((skill) => skill.id !== id)

  if(props.valueAttribute === null) {
    model.value = selectedOptions.value
    emitChange()
    return
  }

  if (props.multiple) {
    model.value = selectedOptions.value.map((skill) => skill[props.valueAttribute])
    emitChange()
  }

  if (!props.multiple) {
    model.value = selectedOptions.value[props.valueAttribute]
    emitChange()
  }
}

watch(
  () => model.value,
  (newValue, oldValue) => {
    if(!selectedOptions.value || newValue !== oldValue) {
      setSelectedSkills()
    }
  },
)

onMounted(() => {
  if(model.value && !selectedOptions.value) {
    setSelectedSkills()
  }
})
</script>

<template>
    <USelectMenu
        :model-value="selectedOptions"
        searchable
        :multiple="props.multiple"
        trailing-icon="i-material-symbols-search"
        :searchable-placeholder="props.searchablePlaceholder"
        :search-attributes="props.searchAttributes"
        :options="options"
        :disabled="props.disabled"
        :clear-search-on-close="true"
        @change="changeSkills"
    >
      <template #label>
				<span v-if="hasValue">
					<span
              v-if="props.multiple"
              class="flex flex-wrap gap-1"
          >
						<UBadge
                v-for="skill in selectedOptions"
                :key="skill.id"
                variant="soft"
                :ui="uiBadge"
            >
							{{ skill[props.optionAttribute] }}
							<UButton
                  type="button"
                  variant="ghost"
                  size="2xs"
                  class="rounded-full -mr-2 -my-1 hover:bg-transparent"
                  icon="i-material-symbols-close"
                  square
                  @click.stop="removeSkill(skill.id)"
              />
						</UBadge>
					</span>

					<span
              v-else
          >
						{{ selectedOptions?.[props.optionAttribute] || selectedOptions }}
					</span>
				</span>

        <span v-else class="text-gray-400">
					{{ props.placeholder}}
				</span>
      </template>

      <template #option="{ option }">
        <span class="truncate">{{ option[props.optionAttribute] }}</span>
      </template>
    </USelectMenu>
</template>
