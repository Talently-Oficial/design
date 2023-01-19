import type { NuxtConfig } from '@nuxt/schema'

export const fonts: NuxtConfig['googleFonts'] = {
  download: true,
  families: {
    Inter: [300, 400, 600, 700, 800],
  },
  display: 'swap',
  prefetch: true,
}
