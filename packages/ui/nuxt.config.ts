// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    devtools: {
        enabled: true
    },
    components: [
        { path: './components', prefix: 'UI' }
    ],
})
