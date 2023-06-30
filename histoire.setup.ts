import { defineSetupVue3 } from '@histoire/plugin-vue'
import { useNuxtApp } from '#app'
import './assets/css/tailwind.css'

export const setupVue3 = defineSetupVue3(({ app }) => {
    const nuxtApp = useNuxtApp()

    if(!nuxtApp.$tours) {
        nuxtApp.provide('tours', {})
    }
})
