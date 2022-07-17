import { createStitches } from '@stitches/react'

type Value = unknown

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config
} = createStitches({
  theme: {
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',

      primary: '#f92d48',
      primaryHover: '#e02941',
      secondary: '#f7f8f8',
      text: '#000',
      textHover: '#78787a',
      buttonText: '#fff',
      link: '#2878f4',
      background: '#f2f2f6',
      close: 'rgba(199, 199, 208, 0.26)',
      closeText: '#838388',
      selection: 'rgba(0, 40, 255, 0.3)',
      codeBackground: '#ebebf4',
      codeKeyword: '#ad3da4',
      codeFunction: '#703daa',
      lineDot: '#e4e4f0',
      switchActive: '#65c062',
      switchHandle: '#fff',
      labelInactive: '#919192',
      labelActive: '#feffff',
      tabBackground: '#e8e8e8',
      tabActive: '#feffff'
    },
    fonts: {
      title: `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
      code: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace'
    },
    space: {

    },
    sizes: {

    },
    fontSizes: {

    },
    fontWeights: {

    },
    lineHeights: {

    },
    letterSpacings: {

    },
    radii: {
      1: '3px',
      2: '4px',
      3: '8px',
      4: '16px',
      round: '50%',
      pill: '9999px'
    },
    shadows: {

    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999'
    },
  },
  media: {
    xsm: '(min-width: 480px)',
    sm: '(min-width: 640px)',
    motion: '(prefers-reduced-motion)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)'
  },
  utils: {
    p: (value: Value) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value
    }),
    pt: (value: Value) => ({
      paddingTop: value
    }),
    pr: (value: Value) => ({
      paddingRight: value
    }),
    pb: (value: Value) => ({
      paddingBottom: value
    }),
    pl: (value: Value) => ({
      paddingLeft: value
    }),
    px: (value: Value) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    py: (value: Value) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    m: (value: Value) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value
    }),
    mt: (value: Value) => ({
      marginTop: value
    }),
    mr: (value: Value) => ({
      marginRight: value
    }),
    mb: (value: Value) => ({
      marginBottom: value
    }),
    ml: (value: Value) => ({
      marginLeft: value
    }),
    mx: (value: Value) => ({
      marginLeft: value,
      marginRight: value
    }),
    my: (value: Value) => ({
      marginTop: value,
      marginBottom: value
    }),

    ta: (value: Value) => ({ textAlign: value }),

    fd: (value: Value) => ({ flexDirection: value }),
    fw: (value: Value) => ({ flexWrap: value }),

    ai: (value: Value) => ({ alignItems: value }),
    ac: (value: Value) => ({ alignContent: value }),
    jc: (value: Value) => ({ justifyContent: value }),
    as: (value: Value) => ({ alignSelf: value }),
    fg: (value: Value) => ({ flexGrow: value }),
    fs: (value: Value) => ({ flexShrink: value }),
    fb: (value: Value) => ({ flexBasis: value }),

    bc: (value: Value) => ({
      backgroundColor: value
    }),

    br: (value: Value) => ({
      borderRadius: value
    }),
    btrr: (value: Value) => ({
      borderTopRightRadius: value
    }),
    bbrr: (value: Value) => ({
      borderBottomRightRadius: value
    }),
    bblr: (value: Value) => ({
      borderBottomLeftRadius: value
    }),
    btlr: (value: Value) => ({
      borderTopLeftRadius: value
    }),

    bs: (value: Value) => ({ boxShadow: value }),

    lh: (value: Value) => ({ lineHeight: value }),

    ox: (value: Value) => ({ overflowX: value }),
    oy: (value: Value) => ({ overflowY: value }),

    pe: (value: Value) => ({ pointerEvents: value }),
    us: (value: Value) => ({ WebkitUserSelect: value, userSelect: value }),

    size: (value: Value) => ({
      width: value,
      height: value
    }),

    linearGradient: (value: Value) => ({
      backgroundImage: `linear-gradient(${value})`
    }),

    appearance: (value: Value) => ({
      WebkitAppearance: value,
      appearance: value
    }),
    userSelect: (value: Value) => ({
      WebkitUserSelect: value,
      userSelect: value
    }),
    backgroundClip: (value: Value) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value
    })
  }
})

export const darkTheme = createTheme('dark-theme', {
  colors: {
    primary: '#f92d48',
    primaryHover: '#e02941',
    secondary: '#1c1c1e',
    text: '#fff',
    textHover: '#5c5750',
    buttonText: '#fff',
    link: '#2878f4',
    background: '#070708',
    close: 'rgba(93, 93, 96, 0.28)',
    closeText: '#9f9fa6',
    selection: 'rgba(47, 76, 232, 0.77)',
    codeBackground: '#333336',
    codeKeyword: '#ff7ab2',
    codeFunction: '#dabaff',
    lineDot: '#333336',
    switchActive: '#67c962',
    switchHandle: '#fff',
    switchInactive: '#3a3b3e',
    labelInactive: '#919192',
    labelActive: '#feffff',
    tabBackground: '#313136',
    tabActive: '#69696f'
  }
})
