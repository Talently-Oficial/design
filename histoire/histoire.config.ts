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
    responsivePresets: [
        {
            label: 'Auto',
            width: null,
            height: null,
        },
        {
            label: 'Mobile (Small)',
            width: 320,
            height: 560,
        },
        {
            label: 'Mobile (Medium)',
            width: 360,
            height: 640,
        },
        {
            label: 'Mobile (Large)',
            width: 414,
            height: 896,
        },
        {
            label: 'Tablet',
            width: 768,
            height: 1024,
        },
        {
            label: 'Laptop (Small)',
            width: 1024,
            height: null,
        },
        {
            label: 'Laptop (Large)',
            width: 1366,
            height: null,
        },
        {
            label: 'Desktop',
            width: 1920,
            height: null,
        },
        {
            label: '4K',
            width: 3840,
            height: null,
        },
    ]
});
