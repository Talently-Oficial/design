// https://nuxt.com/docs/api/configuration/nuxt-config
import { fonts } from './config/google-fonts'

export default defineNuxtConfig({
    extends: '@nuxt-themes/docus',
    modules: [
        '@nuxtjs/tailwindcss',
        ['@nuxtjs/google-fonts', fonts],
    ],
})
