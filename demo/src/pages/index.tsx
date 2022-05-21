import { useState } from 'react'
import { styled } from 'stitches'
import { Sheet, Portal } from 'components/react-swipe-sheet'

const Text = styled('span', {
  fontFamily: '$title',
  fontWeight: 600,
  fontSize: '5.5em',
  marginTop: 0,
  marginBottom: 0,
  letterSpacing: '-3px'
})

const Fullscreen = styled('div', {
  background: '$blue',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  opacity: 1
})

const WaveWrapper = styled('div', {
  background: '$secondary',
  width: '100%',
  position: 'absolute',
  zIndex: -1,
  height: '300px',
  '@sm': {
    height: '400px'
  }
})

const Center = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '3.5em',
  marginBottom: '1.6em',
  '@sm': {
    marginTop: '5.5em',
    marginBottom: '2.5em'
  }
})

const Link = styled('a', {
  textDecoration: 'none',
  fontSize: '0.5em',
  color: '$primary',
  '&:hover': {
    color: '$primaryHover'
  },
  '@xsm': {
    fontSize: '0.75em'
  },
  '@sm': {
    fontSize: '16px'
  }
})

const App = () => {
  const [open, setOpen] = useState(false)
  return (
    <Fullscreen>
      <WaveWrapper>
        <Center>
          <Link href="https://github.com/woofers/react-swipe-sheet">
            <Text>react-swipe-sheet</Text>
          </Link>
        </Center>
      </WaveWrapper>
      <button type="button" onClick={() => setOpen(v => !v)}>
        Open sheet
      </button>
      <Portal containerRef="#react-swipe-sheet">
        <Sheet open={open} expandOnContentDrag onDismiss={() => setOpen(false)}>
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
          <button type="button">noop</button>
        </Sheet>
      </Portal>
    </Fullscreen>
  )
}

export default App
