// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    modules: ['@nuxt/ui'],
    extends: ['../ui'],
    devtools: {
        enabled: true
    },
})
