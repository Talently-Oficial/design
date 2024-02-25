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
