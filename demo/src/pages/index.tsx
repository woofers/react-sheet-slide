import { Children, useMemo, useState, useRef } from 'react'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client'
import { getMarkdownFile } from 'data/local'
import { styled } from 'stitches'
import { detents, Sheet, Header, Content, Footer, Portal } from 'react-sheet-slide'
import { useTheme } from 'components/theme-provider'
import { CloseIcon } from 'icons'
import useIsMounted from 'hooks/use-is-mounted'
import CodeBlock from 'components/code-block'

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
  color: '$text'
})

const Box = styled('div', {
  height: '62px',
  width: '92px',
  background: '$primaryHover'
})

const CloseButton = styled('button', {
  padding: 0,
  border: 'none',
  br: '$round',
  width: '30px',
  height: '30px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: '$close',
  color: '$closeText'
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
  textDecoration: 'none',
  color: '$link',
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
  '&[aria-pressed]': {
    transition: 'none'
  },
  '&[aria-pressed="false"]': {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  variants: {
    theme: {
      primary: {
        $$background: '$colors$primary',
        $$text: '$colors$buttonText',
        $$hover: '$colors$primaryHover'
      },
      secondary: {
        $$background: '$colors$secondary',
        $$text: '$colors$text',
        $$hover: '$colors$secondary'
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
  color: '$text'
})

const Fullscreen = styled('div', {
  background: '$background',
  minHeight: '100vh',
  color: '$text'
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
  color: '$text',
  '&:hover': {
    color: '$textHover'
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

const Docs = styled('div', {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 16px'
})

const ThemeButtons: React.FC<{}> = () => {
  const mounted = useIsMounted()
  const { name, setTheme } = useTheme()
  if (!mounted) return null
  return (
    <Split>
      <Button aria-pressed={name === 'light'} theme="secondary" onClick={() => setTheme('light')} type="button" css={{ flex: '1', textAlign: 'right' }}>☀</Button>️
      <Button aria-pressed={name === 'dark'} theme="secondary" onClick={() => setTheme('dark')} type="button" css={{ flex: '1', textAlign: 'left' }}>🌙</Button>
    </Split>
  )
}

const components: MDXContentProps['components'] = {
  pre: ({ children, ...rest }) => {
    const single = Children.count(children) === 1
    if (single) {
      const el: React.ReactElement = children as React.ReactElement
      if (typeof children !== 'string' && children && el.type === 'code') {
        const { children: content, ...rest } = el.props
        if (typeof content === 'string') {
          const { className } = rest
          return <CodeBlock lang={className}>{content}</CodeBlock>
        }
      }
    }
    return <pre {...rest}>{children}</pre>
  },
  a: ({ href, children }) => (
    <Action
      href={href}
      as="a"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Action>
  )
}

const App: React.FC<{ code: string }> = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const { name } = useTheme()
  const useDarkMode = name === 'dark'
  return (
    <Fullscreen>
      <Indent>
        <Link href="https://github.com/woofers/react-sheet-slide">
          <LargeText>react-sheet-slide</LargeText>
        </Link>
        <LargeText>🏞️ 🎢 🛝</LargeText>
      </Indent>
      <Center>
        <Button type="button" onClick={() => setOpen(v => !v)}>
          Open sheet
        </Button>
      </Center>
      <ThemeButtons />
      <Portal containerRef="#react-sheet-slide">
        <Sheet
          ref={ref}
          open={open}
          onDismiss={() => setOpen(false)}
          onClose={() => console.log('we closed')}
          selectedDetent={detents.large}
          detents={props => [
            detents.large(props),
            detents.medium(props)
          ]}
          useDarkMode={useDarkMode}
          scrollingExpands
        >
          <Header>
            <HeaderWrapper>
              <ButtonText>Online</ButtonText>
              <CloseButton type="button" onClick={() => setOpen(false)}>
                <CloseIcon />
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
      <Docs>
        <Component components={components} />
      </Docs>
      <Center>
        <Button type="button" onClick={() => setOpen(v => !v)}>
          Open sheet
        </Button>
      </Center>
    </Fullscreen>
  )
}

export const getStaticProps = async () => {
  const { content } = getMarkdownFile('../', 'README')
  const { code, frontmatter } = await bundleMDX({ source: content, files: {} })
  return {
    props: { code, frontmatter }
  }
}

export default App
