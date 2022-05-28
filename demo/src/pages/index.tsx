import { useState, useRef } from 'react'
import { styled } from 'stitches'
import {
  Sheet,
  Header,
  Content,
  Footer,
  Portal
} from 'react-swipe-sheet'

const Flex = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0 12px'
})

const HeaderWrapper = styled('div', {
  display: 'flex',
  padding: '0 0 4px',
  alignItems: 'center',
  gap: '0 8px'
})

const HeaderBox = styled('div', {
  br: '4px',
  height: '24px',
  width: '24px',
  background: '#0b8aff'
})

const Box = styled('div', {
  height: '62px',
  width: '92px',
  background: '#0b8aff'
})

const CloseButton = styled('button', {
  padding: 0,
  border: 'none',
  backgroundColor: '#eeeeef',
  color: '#838388',
  br: '$round',
  width: '28px',
  height: '28px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
})

const CloseText = styled('span', {
  fontFamily: '$title',
  fontWeight: 500,
  lineHeight: '24px',
  fontSize: '18px',
  width: '12px',
  height: '20px',
  top: '0px',
  left: '8.25px',
  transform: 'scale(1.1, 1)',
  position: 'absolute'
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
  maxWidth: '300px',
  fontFamily: '$title',
  fontWeight: 500,
  lineHeight: '24px',
  fontSize: '20px',
  marginTop: 0,
  marginBottom: 0,
  letterSpacing: '-0.5px'
})

const ButtonText = styled('div', {
  fontFamily: '$title',
  fontWeight: 500,
  lineHeight: '24px',
  fontSize: '18px',
  marginTop: 0,
  marginBottom: 0,
  letterSpacing: '0px',
  flex: 1
})

const Action = styled('div', {
  color: '#2878f4',
  fontFamily: '$title',
  fontWeight: 400,
  lineHeight: '20px',
  fontSize: '16px',
  width: '100%',
  letterSpacing: '-0.25px',
  textAlign: 'center',
  margin: '0 auto'
})

const Button = styled('button', {
  height: '44px',
  padding: '8px 16px',
  backgroundColor: '$$background',
  color: '$$text',
  border: 'none',
  br: '10px',
  fontFamily: '$title',
  fontWeight: 500,
  lineHeight: '16px',
  fontSize: '16px',
  letterSpacing: '0px',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '$$hover'
  },
  variants: {
    theme: {
      primary: {
        $$background: '#2878f4',
        $$text: '#ffffff',
        $$hover: '#67a0f7'
      },
      secondary: {
        $$background: 'none',
        $$text: '#2878f4',
        $$hover: 'none'
      }
    }
  },
  defaultVariants: {
    theme: 'primary'
  }
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

const FooterWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 16px 0',
  gap: '8px 0'
})

const App = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
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
      <Portal containerRef="#react-swipe-sheet">
        <Sheet
          ref={ref}
          open={open}
          expandOnContentDrag
          onDismiss={() => setOpen(false)}
          onClose={() => console.log('we closed')}
          defaultSnap={({ minHeight }) => minHeight}
          snapPoints={({ maxHeight, minHeight }) => [
            minHeight,
            maxHeight - maxHeight * 0.1,
            maxHeight - maxHeight * 0.52
          ]}
        >
          <Header>
            <HeaderWrapper>
              <HeaderBox />
              <ButtonText>Online</ButtonText>
              <CloseButton type="button" onClick={() => setOpen(false)}>
                <CloseText>x</CloseText>
              </CloseButton>
            </HeaderWrapper>
          </Header>
          <Content>
            <Container>
              <Flex>
                <Text>Add more storage to keep everything on online</Text>
                <Box />
              </Flex>
              <Description>
                Online includes plenty of storage to keep all your data safe and
                features to protect your privacy.
              </Description>
              <Action>Learn More About Online</Action>
            </Container>
          </Content>
          <Footer>
            <FooterWrapper>
              <Button type="button" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button
                type="button"
                theme="secondary"
                onClick={() => setOpen(false)}
              >
                Not Now
              </Button>
            </FooterWrapper>
          </Footer>
        </Sheet>
      </Portal>
    </Fullscreen>
  )
}

export default App
