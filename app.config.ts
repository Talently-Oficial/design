export default defineAppConfig({
    docus: {
        title: 'Docus',
        description: 'My Docus Project',
        url: 'http://docus.dev',
        image: '/social-card-preview.png',
        socials: {
            twitter: '@talently',
            github: 'Talently-Oficial/design',
        },
        github: {
            root: 'content',
            edit: true,
            contributors: false
        },
        aside: {
            level: 0,
            exclude: []
        },
        header: {
            logo: true,
            showLinkIcon: true,
            exclude: []
        },
        footer: {
            credits: {
                icon: 'IconDocus',
                text: 'Powered by Docus',
                href: 'https://docus.dev/',
            },
            icons: [
                {
                    label: 'NuxtJS',
                    href: 'https://nuxtjs.org',
                    component: 'IconNuxtLabs',
                },
                {
                    label: 'Vue Telescope',
                    href: 'https://vuetelescope.com',
                    component: 'IconVueTelescope',
                },
            ],
        }
    }
})
