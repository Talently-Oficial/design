import { cva } from 'class-variance-authority'

export const defaultColor = `border-2 border-gray-200 border-opacity-80 text-gray-700 focus-within:border-primary-400`
export const successColor = `border-2 border-green-500`
export const warningColor = `border-2 border-yellow-500`
export const dangerColor = `border-2 border-red-600`

export const boxInputStyles = cva(
  ['border-2 flex items-center bg-white rounded-lg relative w-full'],
  {
    variants: {
      disabled: {
        true: 'opacity-30',
      },
    },
  }
)

export const inputStyles = cva(
  ['bg-transparent', 'placeholder-gray-300', 'focus:outline-none', 'w-full'],
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-3 py-2 text-base',
        lg: 'px-4 py-2.5 text-base font-semibold',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)
