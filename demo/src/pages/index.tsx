import { Children, useMemo, useState, useRef } from 'react'
import Head from 'next/head'
import { Formik, useFormikContext, FormikProps } from 'formik'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client'
import { cwd } from 'data/local'
import { styled } from 'stitches'
import {
  detents,
  Sheet,
  Header,
  Content,
  Footer,
  Portal
} from 'react-sheet-slide'
import { Box, Flex } from 'components/flex'
import { useTheme } from 'components/theme-provider'
import { CloseIcon } from 'icons'
import useIsMounted from 'hooks/use-is-mounted'
import CodeBlock from 'components/code-block'
import supportsEmoji from 'utils/supports-emoji'
import { FaGithub, FaNpm } from 'react-icons/fa'
import { RadioGroup, Radio } from 'components/radio'
import Switch from 'components/switch'
import { Fieldset, Legend } from 'components/fieldset'
import LiveCodeSample from 'components/live-code-sample'
import { trinaryToBool } from 'utils/code'
import { Sortable, SetItems } from 'components/sortable'
import type { FormProps } from 'types/global'

const List = styled('ul', {
  '> li::marker': {
    content: '- '
  }
})

const HeaderWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0 8px',
  color: '$text'
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
  width: '100%',
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
  gap: '20px 0',
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

const Indent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px 0',
  pl: '8px'
})

const LeftTitle = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px 0'
})

const DocsWrapper = styled('div', {
  h2: {
    my: '8px'
  },
  pre: {
    mt: '12px',
    mb: '16px'
  }
})

const ButtonWrappers = styled('div', {
  display: 'flex',
  padding: '0 8px',
  gap: '0 36px',
  marginBottom: '8px',
  marginTop: '20px'
})

const SheetButtonWrapper = styled('div', {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  '@xsm': {
    justifyContent: 'flex-start'
  }
})

const SheetThemeMode = () => {
  const { name, setTheme } = useTheme()
  return (
    <Fieldset>
      <Legend>useDarkMode</Legend>
      <RadioGroup>
        <Radio value="auto" name="useDarkMode">
          Auto
        </Radio>
        <Radio
          value="off"
          name="useDarkMode"
          onChange={() => setTheme('light')}
        >
          Light
        </Radio>
        <Radio value="on" name="useDarkMode" onChange={() => setTheme('dark')}>
          Dark
        </Radio>
      </RadioGroup>
    </Fieldset>
  )
}

const ThemeButtons: React.FC<{}> = () => {
  const mounted = useIsMounted()
  const { name, setTheme } = useTheme()
  const { setFieldValue } = useFormikContext<FormProps>()
  if (!mounted) return <div className="min-w-[110px] min-h-[44px]" />
  return (
    <div class="w-[max-content] flex gap-x-3">
      <Button
        aria-pressed={name === 'light'}
        theme="secondary"
        onClick={() => {
          setTheme('light')
          setFieldValue('useDarkMode', 'off')
        }}
        type="button"
        css={{ flex: '1', textAlign: 'right' }}
      >
        ☀
      </Button>
      ️
      <Button
        aria-pressed={name === 'dark'}
        theme="secondary"
        onClick={() => {
          setTheme('dark')
          setFieldValue('useDarkMode', 'on')
        }}
        type="button"
        css={{ flex: '1', textAlign: 'left' }}
      >
        🌙
      </Button>
    </div>
  )
}

const emojis = [`🏞️`, `🎢`, `🛝`]

const Emojis: React.FC<{}> = () => {
  const mounted = useIsMounted()
  if (!mounted) return <div className="min-h-[36px]" />
  return <LargeText>{emojis.join(' ')}</LargeText>
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
    <Action href={href} as="a" target="_blank" rel="noopener noreferrer">
      {children}
    </Action>
  ),
  h1: () => null,
  ul: List,
  p: ({ children, ...rest }) => {
    if (typeof children === 'string' && children.startsWith('🏞️')) return null
    return <p {...rest}>{children}</p>
  }
}

const getDetents = (id: string | number) => {
  return detents[id as keyof typeof detents]
}

const DetentsSelector: React.FC<{}> = () => {
  const { values, setFieldValue } = useFormikContext<FormProps>()
  const items = values.detents
  const setItems: SetItems = data => {
    if (typeof data !== 'function') {
      setFieldValue('detents', data)
      return
    }
    setFieldValue('detents', data(items))
  }
  return <Sortable items={items} setItems={setItems} removable />
}

const form = {
  RadioGroup,
  Radio,
  Switch,
  Fieldset,
  Legend,
  LiveCodeSample,
  SheetThemeMode,
  DetentsSelector
}

const detentsData = {
  selected: [
    { id: 'large', children: 'detents.large' },
    { id: 'medium', children: 'detents.medium' }
  ],
  other: [{ id: 'fit', children: 'detents.fit' }]
}

const App: React.FC<{ code: string }> = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code, { form }), [code])
  const [open, setOpen] = useState(false)
  const [useDarkTitle, setDarkTitle] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const { name, theme } = useTheme()
  const useDarkMode = name === 'dark'
  const lightMeta = '#f2f2f6'
  const darkMeta = '#070708'
  const meta = useDarkMode || useDarkTitle ? darkMeta : lightMeta
  const openSheet = () => {
    setOpen(true)
    setDarkTitle(true)
  }
  return (
    <>
      <Head>
        <meta name="theme-color" content={meta} />
        <meta name="msapplication-navbutton-color" content={meta} />
      </Head>
      <Fullscreen className="rss-backdrop">
        <div className="max-w-[1280px] margin-[0,auto] p-[24px_16px_0]">
          <Indent>
            <div className="w-full flex justify-between">
              <LeftTitle>
                <LargeText>react-sheet-slide</LargeText>
                <Emojis />
              </LeftTitle>
              <div className="flex flex-col gap-x-[20px] gap-y-2 xsm:flex-row-reverse">
                <Link
                  href="https://github.com/woofers/react-sheet-slide"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on GitHub"
                  title="GitHub"
                >
                  <LargeText css={{ fontSize: '32px' }}>
                    <FaGithub />
                  </LargeText>
                </Link>
                <Link
                  href="https://www.npmjs.com/package/react-sheet-slide"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on Node Package Manager"
                  title="npm"
                >
                  <LargeText css={{ fontSize: '40px' }}>
                    <FaNpm />
                  </LargeText>
                </Link>
              </div>
            </div>
          </Indent>
          <DocsWrapper>
            <Formik
              initialValues={{
                scrollingExpands: true,
                useDarkMode: 'auto',
                useModal: 'auto',
                detents: detentsData
              }}
              onSubmit={() => {}}
            >
              {({ values }: FormikProps<FormProps>) => {
                const active = values.detents.selected
                const detentsId =
                  active.length > 0 ? active.map(({ id }) => id) : ['large']
                const detentsProp = detentsId
                  .map(id => getDetents(id))
                  .filter(detent => !!detent)
                const detentsFunc = (
                  props: Parameters<(typeof detents)['large']>[0]
                ) => detentsProp.map(func => func(props))
                const selectedDetent = detentsProp[0]
                return (
                  <>
                    <ButtonWrappers>
                      <ThemeButtons />
                      <SheetButtonWrapper>
                        <Button
                          type="button"
                          onClick={openSheet}
                          css={{ flex: 1, maxWidth: '180px' }}
                        >
                          Open sheet
                        </Button>
                      </SheetButtonWrapper>
                    </ButtonWrappers>
                    <Portal containerRef="#react-sheet-slide">
                      <Sheet
                        ref={ref}
                        open={open}
                        onDismiss={() => setOpen(false)}
                        onClose={() => setDarkTitle(false)}
                        selectedDetent={selectedDetent}
                        detents={detentsFunc}
                        useDarkMode={
                          trinaryToBool(values.useDarkMode) ?? useDarkMode
                        }
                        useModal={trinaryToBool(values.useModal)}
                        scrollingExpands={values.scrollingExpands}
                      >
                        <Header>
                          <HeaderWrapper>
                            <ButtonText>Sheet</ButtonText>
                            <CloseButton
                              type="button"
                              onClick={() => setOpen(false)}
                            >
                              <CloseIcon />
                            </CloseButton>
                          </HeaderWrapper>
                        </Header>
                        <Content>
                          <Container>
                            <Flex>
                              <Text>Draggable</Text>
                              <Box>
                                <Text>⬆</Text>️
                              </Box>
                            </Flex>
                            <Description>
                              Can be expanded up and down by dragging the
                              header. Or if <code>scrollingExpands</code> prop
                              is set, the body of the sheet can be used to
                              expand or dismiss the popup.
                            </Description>
                            <Flex>
                              <Text>Accessible</Text>
                              <Box>
                                <Text>👪</Text>
                              </Box>
                            </Flex>
                            <Description>
                              Prevents focus of background elements when sheet
                              is open. Restores focus to prior selected element
                              once sheet is closed. Sets <code>aria-modal</code>{' '}
                              on sheet and sets <code>aria-hidden</code> on
                              background elements. <code>Esc</code> closes sheet
                              or dialog on desktop.
                            </Description>
                            <Flex>
                              <Text>Styled with CSS Modules</Text>
                              <Box>
                                <Text>💅</Text>
                              </Box>
                            </Flex>
                            <Description>
                              No need for large styled-in-js libaries, just
                              bundle the small CSS file and sheet component
                              along with your project.
                            </Description>
                            <Flex>
                              <Text>Customizable Detents</Text>
                              <Box>
                                <Text>⚙️</Text>
                              </Box>
                            </Flex>
                            <Description>
                              Comes with preset detents that can be used to
                              catch the sheet upon user intereaction. Import{' '}
                              <code>{'{ detents }'}</code> with options of{' '}
                              <code>large</code>, <code>medium</code> or{' '}
                              <code>fit</code>. Or use a custom callback to
                              determine detents depending on{' '}
                              <code>maxHeight</code>, and <code>minHeight</code>{' '}
                              of device.
                            </Description>
                          </Container>
                        </Content>
                        <Footer>
                          <div className="flex flex-col px-4 gap-y-2">
                            <Button
                              type="button"
                              onClick={() => setOpen(false)}
                            >
                              Close
                            </Button>
                          </div>
                        </Footer>
                      </Sheet>
                    </Portal>
                    <Component components={components} />
                  </>
                )
              }}
            </Formik>
          </DocsWrapper>
          <Center>
            <Button type="button" onClick={openSheet}>
              Open sheet
            </Button>
          </Center>
        </div>
      </Fullscreen>
    </>
  )
}

export const getStaticProps = async () => {
  const { code, frontmatter } = await bundleMDX({
    file: cwd('CONTENT.mdx'),
    cwd: cwd(),
    globals: {
      form: {
        varName: 'form',
        namedExports: [
          'Switch',
          'RadioGroup',
          'Radio',
          'Fieldset',
          'Legend',
          'LiveCodeSample',
          'SheetThemeMode',
          'DetentsSelector'
        ],
        defaultExport: false
      }
    }
  })
  return {
    props: { code, frontmatter }
  }
}

export default App
