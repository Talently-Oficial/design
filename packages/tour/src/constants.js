export const DEFAULT_CALLBACKS = {
  onStart: () => {},
  onPreviousStep: () => {},
  onNextStep: () => {},
  onStop: () => {},
  onSkip: () => {},
  onFinish: () => {},
}

export const DEFAULT_OPTIONS = {
  highlight: {
    closeable: true,
    interaction: true,
    radio: 6,
    padding: 4,
    enabled: false,
  },
  labels: {
    buttonSkip: 'Omitir',
    buttonPrevious: 'Anterior',
    buttonNext: 'Siguiente',
    buttonStop: 'Finalizar',
  },
  enabledButtons: {
    buttonSkip: true,
    buttonPrevious: true,
    buttonNext: true,
    buttonStop: true,
  },
  startTimeout: 0,
  stopOnTargetNotFound: true,
  useKeyboardNavigation: true,
  enabledNavigationKeys: {
    escape: true,
    arrowRight: true,
    arrowLeft: true,
  },
  debug: false,
}

export const HIGHLIGHT = {
  classes: {
    active: 'v-tour--active',
    targetHighlighted: 'v-tour__target--highlighted',
    targetActive: 'v-tour__target--active',
    targetDisabled: 'v-tour__target--disabled',
  },
  transition: 'box-shadow 0s ease-in-out 0s',
}

export const DEFAULT_STEP_OPTIONS = {
  enableScrolling: true,
  highlight: DEFAULT_OPTIONS.highlight, // By default use the global tour setting
  enabledButtons: DEFAULT_OPTIONS.enabledButtons,
  modifiers: [
    {
      name: 'arrow',
      options: {
        element: '.v-step__arrow',
        padding: 10,
      },
    },
    {
      name: 'preventOverflow',
      options: {
        rootBoundary: 'window',
      },
    },
    {
      name: 'offset',
      options: {
        offset: [0, 10],
      },
    },
  ],
  placement: 'bottom',
}

export const KEYS = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ESCAPE: 27,
}
