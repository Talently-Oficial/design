export default defineAppConfig({
    ui: {
        // Config Global https://github.com/nuxt/ui/blob/dev/src/runtime/ui.config/index.ts

        // Colors
        primary: 'purple',
        // gray: 'gray',

        // Components
        container: {
            padding: 'p-4 sm:p-6 lg:p-8',
            constrained: 'w-full max-w-screen-4xl',
        },
        button: {
            default: {
                loadingIcon: 'border-current border-2 rounded-full border-b-transparent opacity-70',
            },
            icon: {
                size: {
                    '2xs': 'h-4 w-4',
                    xs: 'h-4 w-4',
                    sm: 'h-4 w-4',
                    md: 'h-4 w-4',
                    lg: 'h-4 w-4',
                    xl: 'h-4 w-4',
                },
            },
        },
        badge: {
            rounded: 'rounded-full',
        },
        modal: {
            overlay: {
                background: 'bg-neutral-700 bg-opacity-60',
            },
        },
    },
})
