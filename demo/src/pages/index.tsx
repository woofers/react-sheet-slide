import { useState } from 'react'
import { styled } from 'stitches'
import { Sheet, Portal } from 'components/react-swipe-sheet'

const Flex = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0 12px'
})

const Box = styled('div', {
  height: '62px',
  width: '92px',
  background: '#0b8aff'
})

const Description = styled('div', {
  margin: '0 auto',
  textAlign: 'center',
  width: '100%',
  maxWidth: '328px',
  fontFamily: '$title',
  fontWeight: 400,
  lineHeight: '20px',
  fontSize: '16px',
  letterSpacing: '-0.25px'
})

const Text = styled('div', {
  fontFamily: '$title',
  fontWeight: 500,
  lineHeight: '24px',
  fontSize: '20px',
  marginTop: 0,
  marginBottom: 0,
  letterSpacing: '-0.5px'
})

const Action = styled('div', {
  color: '#2878f4',
  fontFamily: '$title',
  fontWeight: 400,
  lineHeight: '20px',
  fontSize: '16px',
  marginTop: 0,
  marginBottom: 0,
  width: '100%',
  letterSpacing: '-0.25px',
  textAlign: 'center',
  margin: '0 auto'
})

const Button = styled('button', {
  height: '44px',
  padding: '8px 16px',
  background: '#2878f4',
  color: '#fff',
  border: 'none',
  br: '10px',
  fontFamily: '$title',
  fontWeight: 500,
  lineHeight: '16px',
  fontSize: '16px',
  letterSpacing: '0px'
})

const Container = styled('div', {
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px 0'
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
  const [show, setShow] = useState(true)
  return (
    <Fullscreen>
      <WaveWrapper>
        <Center>
          <Link href="https://github.com/woofers/react-swipe-sheet">
            <Text>react-swipe-sheet</Text>
          </Link>
        </Center>
      </WaveWrapper>
      <Button type="button" onClick={() => setOpen(v => !v)}>
        Open sheet
      </Button>
      {show && (
        <Portal containerRef="#react-swipe-sheet">
          <Sheet
            open={open}
            expandOnContentDrag
            onDismiss={() => setOpen(false)}
            onClose={() => console.log('we closed')}
            defaultSnap={({ maxHeight }) => maxHeight - maxHeight / 10}
            snapPoints={({ maxHeight }) => [
              maxHeight - maxHeight / 10,
              maxHeight / 4,
              maxHeight * 0.6
            ]}
          >
            <Container>
              <Flex>
              <Text>Add more storage to keep everything on online</Text>
              <Box />
              </Flex>
              <Description>
          Online includes plenty of storage to keep all your data safe and features to protect your
          privacy.
              </Description>
              <Action>Learn More About Online</Action>
              <Button type="button" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button type="button">noop</Button>
            </Container>
          </Sheet>
        </Portal>
      )}
    </Fullscreen>
  )
}

export default App
