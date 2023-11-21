import CircleLoader from '~/components/loaders/CircleLoader.vue'

export default {
  components: {
    CircleLoader,
  },
  props: {
    size: {
      type: String,
      default: 'md',
    },
    color: {
      type: String,
      default: 'primary',
    },
    colorLoader: {
      type: String,
      default: '',
    },
    rounded: {
      type: String,
      default: 'rounded',
    },
    border: {
      type: String,
      default: 'border',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    classBtn() {
      return [
        this.sizeBtn,
        this.colorBtn,
        this.rounded,
        this.border,
        !this.disabled ? `${this.colorBtnHover}` : null,
        { 'opacity-85': this.loading },
        { 'opacity-50 cursor-default': this.disabled },
      ]
    },
    colorLoaderBtn() {
      if (this.colorLoader) return this.colorLoader
      switch (this.color) {
        case 'primary-outline':
          return '#080863'

        case 'gray-outline':
          return '#718096'

        default:
          return '#ffffff'
      }
    },
    sizeBtn() {
      switch (this.size) {
        case 'sm':
          return 'px-4 py-1.5 text-sm'

        case 'md':
          return 'px-5 py-2 text-base'

        case 'lg':
          return 'px-5 py-2 md:px-6 md:py-3 text-base font-bold'

        default:
          return this.size
      }
    },
    colorBtn() {
      switch (this.color) {
        case 'primary':
          return 'border-primary-500 bg-primary-500 text-white'

        case 'primary-outline':
          return 'border-primary-500 text-primary-500'

        case 'secondary':
          return 'border-secondary-500 bg-secondary-500 text-white'

        case 'secondary-outline':
          return 'border-secondary-500 text-secondary-500'

        case 'success':
          return 'border-green-500 bg-green-500 text-white'

        case 'success-outline':
          return 'border-green-500 text-green-500'

        case 'warning':
          return 'border-yellow-500 bg-yellow-500 text-white'

        case 'warning-outline':
          return 'border-yellow-500 border-yellow-500 text-yellow-600'

        case 'danger':
          return 'border-red-600 bg-red-600 text-white'

        case 'danger-outline':
          return 'border-red-600 text-red-600'

        case 'light-blue':
          return 'border-brand-light-blue-500 bg-brand-light-blue-500 text-primary-500'

        case 'white':
          return 'border-white bg-white text-primary-500'

        case 'white-outline':
          return 'border-white text-white'

        case 'gray-outline':
          return 'border-gray-600 text-gray-800'

        case 'primary-transparent':
          return 'border-none bg-none text-primary-500 red'

        case 'slack':
          return 'border-gray-400 text-gray-700 font-semibold'

        case 'purple':
          return 'border-purple-500 bg-purple-500 text-white'

        case 'flat':
          return 'border-transparent'

        default:
          return this.color
      }
    },
    colorBtnHover() {
      switch (this.color) {
        case 'primary':
          return 'hover:bg-primary-400 hover:border-primary-400 cursor-pointer'

        case 'primary-outline':
          return 'hover:bg-primary-600 hover:text-white cursor-pointer'

        case 'secondary':
          return 'hover:bg-secondary-600 cursor-pointer'

        case 'secondary-outline':
          return 'hover:bg-secondary-500 hover:text-white cursor-pointer'

        case 'success':
          return 'hover:bg-green-600 cursor-pointer'

        case 'success-outline':
          return 'hover:bg-green-600 hover:text-white cursor-pointer'

        case 'warning':
          return 'hover:bg-yellow-600 hover:text-white cursor-pointer'

        case 'warning-outline':
          return 'hover:bg-yellow-600 hover:text-white cursor-pointer'

        case 'danger':
          return 'hover:bg-red-700 cursor-pointer'

        case 'danger-outline':
          return 'hover:bg-red-700 hover:text-white cursor-pointer'

        case 'light-blue':
          return 'hover:border-primary-500 hover:bg-primary-500 hover:text-white cursor-pointer'

        case 'white':
          return 'hover:bg-white hover:text-primary-500'

        case 'white-outline':
          return 'hover:bg-white hover:text-primary-500'

        case 'gray-outline':
          return 'hover:bg-primary-500 hover:text-white cursor-pointer'

        case 'primary-transparent':
          return 'hover:bg-primary-500 hover:text-white cursor-pointer'

        case 'slack':
          return 'hover:bg-gray-100'

        case 'purple':
          return 'hover:border-purple-400 hover:bg-purple-400 cursor-pointer'

        case 'flat':
          return 'hover:border-purple-50 hover:bg-purple-50'

        default:
          return ''
      }
    },
  },
}
