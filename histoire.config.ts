import { defineConfig } from "histoire"
import { HstVue} from "@histoire/plugin-vue";
import { HstNuxt } from '@histoire/plugin-nuxt'


export default defineConfig({
    plugins: [
        HstVue(),
        HstNuxt(),
    ],
    theme: {
        title: 'Talently',
        logo: {
          square: '/square.png',
          light: '/light-logo.png',
          dark: '/dark-logo.png',
        },
        logoHref: 'https://talently.tech',
        colors: {
            primary: {
                50: '#e0e0ee',
                100: '#a0a0dd',
                200: '#7979BE',
                300: '#53539F',
                400: '#2F2F82',
                500: '#2A1E4F',
                600: '#060658',
                700: '#04044C',
                800: '#020240',
                900: '#5D31F6',
            }
        }
    }
});
