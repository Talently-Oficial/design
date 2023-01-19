import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        },
        colors: {
            primary: {
                10: '#FCF9FF',
                50: '#F3F2FF',
                100: '#E8E7FF',
                200: '#D6D4FF',
                300: '#B7B2FF',
                400: '#9286FF',
                500: '#6F55FD', // main
                600: '#5D31F6',
                700: '#4E20E1',
                800: '#411ABD',
                900: '#18112C',
            },
            secondary: {
                10: '#FCF9FF',
                50: '#e0e0ee',
                100: '#a0a0dd',
                200: '#7979BE',
                300: '#53539F',
                400: '#2F2F82',
                500: '#2A1E4F', // main
                600: '#060658',
                700: '#04044C',
                800: '#020240',
            },
            red: {
                50: '#FEF2F2',
                100: '#FEE2E2',
                200: '#FED2D2',
                300: '#FCA5A5',
                400: '#F87171',
                500: '#EE4545',
                600: '#DB2727',
                700: '#B81D1D',
                800: '#991B1B',
                900: '#7F1D1D',
            },
            gray: {
                50: '#F7F7F8',
                100: '#eeeef0',
                200: '#d9d9de',
                300: '#B8B9C1',
                400: '#92939e',
                500: '#747583',
                600: '#5E5F6B',
                700: '#4D4E57',
                800: '#42424A',
                900: '#3A3A40',
            },
            brand: {
                yellow: {
                    500: '#ffcd00',
                },
                green: {
                    500: '#3be8b0',
                },
                orange: {
                    500: '#FF9830',
                },
            },
        },
        extend: {}
    }
}
