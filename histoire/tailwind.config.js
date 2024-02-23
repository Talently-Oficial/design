const brand = {
    purple: {
        50: '#F6F1FB',
        100: '#E9D8F9',
        200: '#DBBFF8',
        300: '#C79CF7',
        400: '#B37CF4',
        500: '#9854F1',
        600: '#8E45F0',
        700: '#6F1AE3',
    },
    neutral: {
        50: '#EFF4F8',
        100: '#D9DFE5',
        200: '#BECBD7',
        300: '#9DB1C2',
        400: '#8098AD',
        500: '#637B8E',
        600: '#586C7B',
        700: '#021C2B',
    },
    orange: {
        50: '#FCF1E9',
        100: '#FCD7B9',
        200: '#FDBA82',
        300: '#FF8F15',
        400: '#DE7900',
        500: '#B46100',
        600: '#9E5400',
        700: '#814400',
    },
    'quiet-blue': {
        50: '#F5F8FC',
        100: '#D3E0EF',
        200: '#AFC9E6',
        300: '#8AB3DD',
        400: '#699AC9',
        500: '#537CA3',
        600: '#486D8F',
        700: '#3A5874',
    },
    pink: {
        50: '#FBF0F9',
        100: '#FAD2F4',
        200: '#FAB2F1',
        300: '#FB7CEF',
        400: '#FA3EEE',
        500: '#D21DC8',
        600: '#B918B0',
        700: '#971290',
    },
    neon: {
        50: '#F0FFE1',
        100: '#C4FF8A',
        200: '#7FE101',
        300: '#6DC201',
        400: '#5CA700',
        500: '#498601',
        600: '#407600',
        700: '#325F00',
    },
    red: {
        50: '#FBF1EE',
        100: '#F9D6CF',
        200: '#F9BAAD',
        300: '#F9907D',
        400: '#F76250',
        500: '#DC2626',
        600: '#C82121',
        700: '#A31919',
    },
    yellow: {
        50: '#FDF2D9',
        100: '#FFD118',
        200: '#EFC401',
        300: '#CFA901',
        400: '#B29000',
        500: '#8F7400',
        600: '#7E6500',
        700: '#665200',
    },
    green: {
        50: '#DAFCDE',
        100: '#5BFB8A',
        200: '#3BE675',
        300: '#24C761',
        400: '#1DA750',
        500: '#168A41',
        600: '#127938',
        700: '#0D622C',
    },
}

const customTailwind = {
    theme: {
        // fontFamily: {
        //     sans: ['"NB International Pro Book"'],
        //     body: ['"NB International Pro"'],
        // },
        screens: {
            xxs: '320px',
            xs: '375px',
            smm: '480px',
            sm: '640px',
            md: '768px',
            lg: '992px',
            xl: '1024px',
            '2xl': '1200px',
            '3xl': '1280px',
            '4xl': '1366px',
            '5xl': '1440px',
            '6xl': '1920px',
        },
        colors: {
            // Base
            inherit: 'inherit',
            current: 'currentColor',
            transparent: 'transparent',
            black: '#000',
            white: '#fff',

            // Brand
            primary: {
                ...brand.purple,
            },
            neutral: {
                ...brand.neutral,
            },
            purple: {
                ...brand.purple,
            },
            orange: {
                ...brand.orange,
            },
            'quiet-blue': {
                ...brand['quiet-blue'],
            },
            pink: {
                ...brand.pink,
            },
            neon: {
                ...brand.neon,
            },
            red: {
                ...brand.red,
            },
            yellow: {
                ...brand.yellow,
            },
            green: {
                ...brand.green,
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

            // tailwind
            blue: {
                '50': '#eff6ff',
                '100': '#dbeafe',
                '200': '#bfdbfe',
                '300': '#93c5fd',
                '400': '#60a5fa',
                '500': '#3b82f6',
                '600': '#2563eb',
                '700': '#1d4ed8',
                '800': '#1e40af',
                '900': '#1e3a8a',
                '950': '#172554',
            },
            cyan: {
                '50': '#ecfeff',
                '100': '#cffafe',
                '200': '#a5f3fc',
                '300': '#67e8f9',
                '400': '#22d3ee',
                '500': '#06b6d4',
                '600': '#0891b2',
                '700': '#0e7490',
                '800': '#155e75',
                '900': '#164e63',
                '950': '#083344',
            }
        },
        fontSize: {
            0: '0',
            xxs: '0.5rem',
            xs: ['0.75rem', { lineHeight: '1rem' }],
            sm: ['0.875rem', { lineHeight: '1.25rem' }],
            base: ['1rem', { lineHeight: '1.5rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],

            '2xl': ['1.5rem', { lineHeight: '1.75rem' }],
            '2.5xl': ['1.65rem', { lineHeight: '1.85rem' }],
            '2.6xl': ['1.75rem', { lineHeight: '2rem' }],

            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],

            '4xl': ['2rem', { lineHeight: '2.25rem' }],
            '4.2xl': ['2.2rem', { lineHeight: '3.25rem' }],
            '4.6xl': ['2.6rem', { lineHeight: '3.25rem' }],
            '4.7xl': ['2.625rem', { lineHeight: '2.65rem' }],
            '4.8xl': ['2.812rem', { lineHeight: '3.75rem' }],
            '4.9xl': ['2.95rem', { lineHeight: '3.8rem' }],

            '5xl': ['3rem', { lineHeight: '1' }],
            '5.2xl': ['3.25rem', { lineHeight: '1' }],
            '5.8xl': ['3.5rem', { lineHeight: '1' }],

            '6xl': ['3.75rem', { lineHeight: '1' }],
            '6.6xl': ['4rem', { lineHeight: '1' }],

            '7xl': ['4.5rem', { lineHeight: '1' }],
            '7.7xl': ['4.75rem', { lineHeight: '1' }],

            '8xl': ['6rem', { lineHeight: '1' }],

            '9xl': ['8rem', { lineHeight: '1' }],
        },
        extend: {
            letterSpacing: {
                tight: '-0.009em',
            },
            borderWidth: {
                3: '3px',
                6: '6px',
            },
            strokeWidth: {
                3: '3',
            },
            maxWidth: {
                xxs: '250px',
            },
            lineHeight: {
                0: '0',
            },
            zIndex: {
                '-10': '-10',
                100: '100',
                1000: '1000',
            },
            opacity: {
                3: '0.03',
                10: '0.1',
                15: '0.15',
                85: '0.85',
            },
            spacing: {
                4.5: '1.1rem',
                18: '4.5rem',
                22: '5.5rem',
            },
            scale: {
                80: '.80',
            },
            borderRadius: {
                '2.5xl': '1.25rem',
                '3.5xl': '1.75rem',
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                'lg-primary': '0px 6px 18px 6px rgba(129, 140, 248, 0.12), 0px 0px 2px 0px rgba(15, 23, 42, 0.14)',
            },
        },
    },
}

module.exports = customTailwind
