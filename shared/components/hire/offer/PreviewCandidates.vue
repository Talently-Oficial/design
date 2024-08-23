<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  value: null | number
}>()

const listUser = [
  'https://cdn.talently.tech/user-4_1720469756315.png',
  'https://cdn.talently.tech/user-1_1720469756314.png',
  'https://cdn.talently.tech/user-3_1720469756315.png',
  'https://cdn.talently.tech/user-7_1720469756316.png',
  'https://cdn.talently.tech/user-2_1720469756315.png',
  'https://cdn.talently.tech/user-5_1720469756315.png',
  'https://cdn.talently.tech/user-6_1720469756316.png',
  'https://cdn.talently.tech/user-9_1720469756316.png',
  'https://cdn.talently.tech/user-8_1720469756316.png',
  'https://cdn.talently.tech/user-10_1720469756316.png',
  'https://cdn.talently.tech/user-12_1720469756316.png',
  'https://cdn.talently.tech/user-11_1720469756316.png',
  'https://cdn.talently.tech/user-14_1720469756316.png',
  'https://cdn.talently.tech/user-13_1720469756316.png',
]

const users = ref([])

const setListUser = () => {
  const count = Number(props.value) > 6 ? 6 : Number(props.value)
  users.value = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * listUser.length)
    const user = listUser[randomIndex]

    if (!users.value.includes(user)) {
      users.value.push(user)
    } else {
      i--
    }
  }
}

watch(() => props.value, () => {
  setListUser()
})

onMounted(() => {
  setListUser()
})
</script>

<template>
  <div class="rounded-2xl border lg:border-none lg:bg-neutral-700 lg:text-white lg:text-center">
    <div class="flex flex-col gap-2 lg:gap-3 p-4 lg:p-8">
      <div class="flex gap-2 lg:gap-3 items-center justify-end flex-row-reverse lg:flex-col">
        <div class="scale-80 lg:scale-100">
          <UAvatarGroup size="xs">
            <UAvatar v-for="(user, i) in users" :src="user" :key="i"/>
          </UAvatarGroup>
        </div>

        <span class="text-3xl lg:text-4.6xl font-bold leading-none text-neutral-700 lg:text-white">
          <template v-if="props.value">
            {{ props.value }}
          </template>
          <template v-else>
            ----
          </template>
        </span>
      </div>

      <div>
        <h3 class="font-medium text-lg text-neutral-700 lg:text-white mb-1 lg:mb-2">{{ props.title }}</h3>
        <p class="text-sm opacity-80">
          {{ props.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
