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
      primary: '#fff',
      primaryHover: '#62b39c',
      secondary: '#1c1c1e',
      blue: '#f1f7ff',
      darkBlue: '#3268ce',
      selection: '#fff9cc'
    },
    fonts: {
      title: `'Inter', sans-serif`
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
    xsm: '(min-width: 405px)',
    sm: '(min-width: 550px)',
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
