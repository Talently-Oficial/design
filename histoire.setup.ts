import { defineSetupVue3 } from '@histoire/plugin-vue'
import { useNuxtApp } from '#app'

export const setupVue3 = defineSetupVue3(({ app }) => {
    const nuxtApp = useNuxtApp()

    if(!nuxtApp.$tours) {
        nuxtApp.provide('tours', {})
    }
})
