<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  value: null | number
}>()

const listUser = [
  'https://d1hazhe1glojgw.cloudfront.net/user-4_1720469756315.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-1_1720469756314.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-3_1720469756315.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-7_1720469756316.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-2_1720469756315.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-5_1720469756315.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-6_1720469756316.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-9_1720469756316.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-8_1720469756316.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-10_1720469756316.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-12_1720469756316.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-11_1720469756316.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-14_1720469756316.png',
  'https://d1hazhe1glojgw.cloudfront.net/user-13_1720469756316.png',
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
  <UCard :ui="{ background: 'bg-neutral-700', base: 'text-white text-center' }">
    <div class="flex flex-col gap-3 py-2">
      <div>
        <UAvatarGroup size="xs">
          <UAvatar v-for="(user, i) in users" :src="user" :key="i"/>
        </UAvatarGroup>
      </div>

      <span class="text-4.6xl font-bold">
        <template v-if="props.value">
          {{ props.value }}
        </template>
        <template v-else>
          ----
        </template>
      </span>

      <div>
        <h3 class="font-medium text-lg mb-3">{{ props.title }}</h3>
        <p class="text-sm opacity-80">
          {{ props.description }}
        </p>
      </div>
    </div>
  </UCard>
</template>

<style scoped>

</style>
