// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    header: {
        link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    }
})
