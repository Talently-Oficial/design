// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    devtools: {
        enabled: true
    },
    components: [
        { path: './components', pathPrefix: false, prefix: 'U' }
    ],
})
