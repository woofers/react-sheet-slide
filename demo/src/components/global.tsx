import { globalCss } from 'stitches'

const useGlobalStyles = globalCss({
  '*, *::before, *::after ': { boxSizing: 'border-box' },
  '*': {
    margin: 0
  },
  'html, body': {
    overscrollBehaviorY: 'none'
  },
  body: {
    fontFamily: '$title',
    lineHeight: '1.5',
    '-webkit-font-smoothing': 'antialiased'
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%'
  },
  'input, button, textarea, select': {
    font: 'inherit'
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word'
  },
  code: {
    fontFamily: '$code',
    whiteSpace: 'pre-wrap'
  },
  '#root, #__next': {
    isolation: 'isolate'
  },
  '::selection': {
    background: '$selection'
  }
})

const Global: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useGlobalStyles()
  return <>{children}</>
}

export default Global
