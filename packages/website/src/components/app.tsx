import { Children, useMemo } from 'react'
import { getMDXComponent, type MDXContentProps } from 'mdx-bundler/client'
import { clsx } from 'cva'
import { Providers } from 'components/providers'
import { form } from 'app/form'
import { Header as PageHeader } from 'components/header'
import { Documentation } from 'components/documentation'
import { Action } from 'components/helpers'
import CodeBlock from 'components/code-block'

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

type Props = { code: string }

const App: React.FC<Props> = ({ code }) => {
  // <meta name="theme-color" content={meta} />
  // <meta name="msapplication-navbutton-color" content={meta} />
  const Component = useMemo(() => getMDXComponent(code, { form }), [code])
  return (
    <Providers>
      <div className="rss-backdrop text-[var(--color-text)] bg-[var(--color-background)] min-h-screen">
        <div className="max-w-[1280px] mx-auto my-0 p-[24px_16px_0]">
          <PageHeader />
          <Documentation>
            <Component components={components} />
          </Documentation>
        </div>
      </div>
    </Providers>
  )
}

export default App
