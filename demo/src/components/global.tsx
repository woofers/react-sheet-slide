import { globalCss } from 'stitches'

const useGlobalStyles = globalCss({
  '@import': [
    `url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')`
  ],
  '::selection': {
    background: '$selection'
  }
})

const Global: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useGlobalStyles()
  return <>{children}</>
}

export default Global
