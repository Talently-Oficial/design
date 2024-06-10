import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import { HstNuxt } from '@histoire/plugin-nuxt'
import {brand} from "../tailwind.config";

export default defineConfig({
    plugins: [
        HstVue(),
        HstNuxt(),
    ],
    setupFile: './histoire.setup.ts',
    theme: {
        title: 'Talently',
        logo: {
          square: './assets/images/talently-logo-iso.svg',
          light: './assets/images/talently-logo.svg',
          dark: './assets/images/talently-logo-white.svg',
        },
        colors: {
            primary: {
                50: brand.purple["50"],
                100: brand.purple["100"],
                200: brand.purple["200"],
                300: brand.purple["300"],
                400: brand.purple["600"],
                500: brand.purple["700"],
                600: brand.purple["700"],
                700: brand.purple["700"],
                800: brand.purple["700"],
                900: '#4f465b',
            },
        }
    },
    tree: {
        order: (a, b) => {
            if (a === 'Introducción') return -1;
            if (b === 'Introducción') return 1;
            return a.localeCompare(b);
        },
        groups: [
            // {
            //     id: 'top',
            //     title: 'sadas', // No toggle
            // },
            // {
            //     title: 'My Group',
            //     include: file => /Code gen|Controls|Docs/.test(file.title),
            // },
            {
                title: 'Components',
                include: file => /ui/.test(file.path)
                ,
            },
            {
                title: 'Packages',
                include: file => /packages/.test(file.path),
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
