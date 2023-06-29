import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import { HstNuxt } from '@histoire/plugin-nuxt'

export default defineConfig({
    plugins: [
        HstVue(),
        HstNuxt(),
    ],
    setupFile: './histoire.setup.ts',
    theme: {
        title: 'Talently',
        logo: {
          square: './assets/images/square.png',
          light: './assets/images/light-logo.png',
          dark: './assets/images/dark-logo.png',
        },
    },
    tree: {
        order: (a, b) => {
            if (a === 'Introducción') return -1;
            if (b === 'Introducción') return 1;
            return a.localeCompare(b);
        },
        groups: [
            {
                id: 'top',
                title: '', // No toggle
            },
            // {
            //     title: 'My Group',
            //     include: file => /Code gen|Controls|Docs/.test(file.title),
            // },
            {
                title: 'Components',
                include: file => !file.title.includes('Serialize'),
            },
            // {
            //     title: 'Others',
            //     include: file => true,
            // },
        ],
    },
});
