import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import { HstNuxt } from '@histoire/plugin-nuxt'

export default defineConfig({
    plugins: [
        HstVue(),
        HstNuxt(),
    ],
    setupFile: {
        browser: './histoire.setup.ts',
    },
    theme: {
        title: 'Talently',
        logo: {
          square: './assets/images/square.png',
          light: './assets/images/light-logo.png',
          dark: './assets/images/dark-logo.png',
        },
        logoHref: 'https://talently.tech',
        colors: {
            primary: {
                // 50: '#e0e0ee',
                // 100: '#a0a0dd',
                // 200: '#7979BE',
                // 300: '#53539F',
                // 400: '#2F2F82',
                // 500: '#2A1E4F',
                // 600: '#060658',
                // 700: '#04044C',
                // 800: '#020240',
                // 900: '#5D31F6',
            }
        }
    }
});
