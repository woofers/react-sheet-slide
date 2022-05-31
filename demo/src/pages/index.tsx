import { forwardRef, useEffect, useState, useRef } from 'react'
import { styled } from 'stitches'
import { Sheet, Header, Content, Footer, Portal } from 'react-swipe-sheet'
import { animated, useSpring } from '@react-spring/web'

const Split = styled('div', {
  pl: '24px',
  width: 'max-content',
  display: 'flex',
  gap: '0 4px'
})

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
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0 8px',
  color: '#fff'
})

const Box = styled('div', {
  height: '62px',
  width: '92px',
  background: '#e02941'
})

const CloseButton = styled('button', {
  padding: 0,
  border: 'none',
  //backgroundColor: 'rgba(199, 199, 208, 0.26)',
  //color: '#838388',
  br: '$round',
  width: '28px',
  height: '28px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: '#5d5d6047',
  color: '#9f9fa6'
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
  letterSpacing: '0px'
})

const LargeText = styled('div', {
  fontFamily: '$title',
  fontWeight: 700,
  lineHeight: '36px',
  fontSize: '32px',
  marginTop: 0,
  marginBottom: 0,
  letterSpacing: '1px'
})

const Text = styled('div', {
  maxWidth: '300px',
  fontFamily: '$title',
  fontWeight: 500,
  lineHeight: '24px',
  fontSize: '20px',
  marginTop: 0,
  marginBottom: 0,
  letterSpacing: '-0.25px'
})

const ButtonText = styled('div', {
  fontFamily: '$title',
  fontWeight: 600,
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
  fontWeight: 500,
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
  fontWeight: 600,
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
        $$background: '#f92d48',
        $$text: '#ffffff',
        $$hover: '#e02941'
      },
      secondary: {
        $$background: '#1c1c1e',
        $$text: '#ffffff',
        $$hover: 'none'
      }
    }
  },
  defaultVariants: {
    theme: 'primary'
  }
})

const Container = styled('div', {
  padding: '76px 20px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px 0',
  color: '#fff'
})

const Fullscreen = styled('div', {
  background: '$secondary',
  height: '100vh',
  width: '100vw',
  color: '#fff'
})

const Center = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px 0',
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

const Indent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px 0',
  pt: '24px',
  pl: '24px',
})

const App = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  return (
    <Fullscreen>
      <Indent>
        <Link href="https://github.com/woofers/react-swipe-sheet">
          <LargeText>react-sheet-slide</LargeText>
        </Link>
        <LargeText>🏞️ 🎢 🛝</LargeText>
      </Indent>
      <Center>
        <Button type="button" onClick={() => setOpen(v => !v)}>
          Open sheet
        </Button>
      </Center>
      <Split>
        <Button theme="secondary" css={{ flex: '1', textAlign: 'right' }}>☀</Button>️
        <Button theme="secondary" css={{ flex: '1', textAlign: 'left' }}>🌙</Button>
      </Split>
      <Portal containerRef="#react-swipe-sheet">
        <Sheet
          ref={ref}
          open={open}
          onDismiss={() => setOpen(false)}
          onClose={() => console.log('we closed')}
          defaultSnap={({ maxHeight }) => maxHeight - maxHeight * 0.1}
          snapPoints={({ maxHeight }) => [
            maxHeight - maxHeight * 0.1,
          ]}
        >
          <Header>
            <HeaderWrapper>
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
              <Flex>
                <Text>Add more storage to keep everything on online</Text>
                <Box />
              </Flex>
              <Description>
                Online includes plenty of storage to keep all your data safe and
                features to protect your privacy.
              </Description>
              <Action>Learn More About Online</Action>
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
            </FooterWrapper>
          </Footer>
        </Sheet>
      </Portal>
    </Fullscreen>
  )
}

export default App
