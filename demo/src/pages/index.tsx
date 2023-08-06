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
import { IconBox, Flex } from 'components/flex'
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
import { clsx } from 'cva'
import Box, { type BoxProps } from 'components/box'

const CloseButton: React.FC<BoxProps<'button'>> = ({
  className,
  as = 'button',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'p-0 border-none rounded-full w-[30px] h-[30px] inline-flex items-center justify-center relative bg-[var(--color-close)] text-[var(--color-close-text)]',
      className
    )}
  />
)

const Description: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'mx-auto my-0 w-full text-base leading-5 tracking-normal',
      className
    )}
  />
)

const LargeText: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'font-bold text-[32px] leading-9 my-0 tracking-[1px]',
      className
    )}
  />
)

const Text: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'max-w-[300px] font-medium text-xl leading-6 my-0 tracking-[-0.25px]',
      className
    )}
  />
)

const Action: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'no-underline text-[var(--color-link)] font-medium text-base leading-5 w-full tracking-[-0.25px] text-center mx-auto my-0',
      className
    )}
  />
)

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

const Container: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'flex p-[76px_20px_16px] flex-col gap-y-[20px] text-[var(--color-text)]',
      className
    )}
  />
)

const Center: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'flex flex-col justify-center items-center gap-y-8 mt-14 mb-6 sm:mt-20 sm:mb-10',
      className
    )}
  />
)
//marginBottom: '1.6em',
//marginTop: '5.5em',

const Link: React.FC<BoxProps<'a'>> = ({ className, as = 'a', ...rest }) => (
  <Box
    {...rest}
    as={as}
    className={clsx(
      'no-underline text-[var(--color-text)] text-[0.5rem] hover:text-[var(--color-text-hover)] xsm:text-xs sm:text-base !leading-6',
      className
    )}
  />
)

const DocsWrapper: React.FC<BoxProps<'div'>> = ({
  className,
  as = 'div',
  ...rest
}) => <Box {...rest} as={as} className={clsx('docs-wrapper', className)} />

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
    <div className="w-[max-content] flex gap-x-3">
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
  ul: ({ className, ...rest }) => (
    <ul className={clsx('list', className)} {...rest} />
  ),
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
      <div className="rss-backdrop text-[var(--color-text)] bg-[var(--color-background)] min-h-screen">
        <div className="max-w-[1280px] mx-auto my-0 p-[24px_16px_0]">
          <div className="flex flex-col gap-y-4 pl-2">
            <div className="w-full flex justify-between">
              <div className="flex flex-col gap-y-4">
                <LargeText>react-sheet-slide</LargeText>
                <Emojis />
              </div>
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
          </div>
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
                    <div className="flex px-2 gap-x-9 mt-[20px] mb-2">
                      <ThemeButtons />
                      <div className="flex grow justify-center xsm:justify-start">
                        <Button
                          type="button"
                          onClick={openSheet}
                          css={{ flex: 1, maxWidth: '180px' }}
                        >
                          Open sheet
                        </Button>
                      </div>
                    </div>
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
                          <div className="flex justify-between items-center gap-x-2 text-[var(--color-text)]">
                            <div className="text-lg leading-6 mx-0 tracking-normal grow font-semibold">
                              Sheet
                            </div>
                            <CloseButton
                              type="button"
                              onClick={() => setOpen(false)}
                            >
                              <CloseIcon />
                            </CloseButton>
                          </div>
                        </Header>
                        <Content>
                          <Container>
                            <Flex>
                              <Text>Draggable</Text>
                              <IconBox>
                                <Text>⬆</Text>️
                              </IconBox>
                            </Flex>
                            <Description>
                              Can be expanded up and down by dragging the
                              header. Or if <code>scrollingExpands</code> prop
                              is set, the body of the sheet can be used to
                              expand or dismiss the popup.
                            </Description>
                            <Flex>
                              <Text>Accessible</Text>
                              <IconBox>
                                <Text>👪</Text>
                              </IconBox>
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
                              <IconBox>
                                <Text>💅</Text>
                              </IconBox>
                            </Flex>
                            <Description>
                              No need for large styled-in-js libaries, just
                              bundle the small CSS file and sheet component
                              along with your project.
                            </Description>
                            <Flex>
                              <Text>Customizable Detents</Text>
                              <IconBox>
                                <Text>⚙️</Text>
                              </IconBox>
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
      </div>
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
