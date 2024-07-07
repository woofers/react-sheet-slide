'use client'
import React, { useState, useEffect } from 'react'
import { lowlight } from 'lowlight'
import { toHtml } from 'hast-util-to-html'
import Box, { type BoxProps } from './box'
import { cva, clsx } from 'cva'

const code = cva(
  [
    'bg-[var(--color-code-background)]',
    'px-[14px] py-2',
    'rounded-[22px]',
    'overflow-x-auto',
    'text-sm',
    'leading-[1.4]'
  ],
  {
    variants: {
      wrap: {
        true: ['[--wrap:pre-wrap]'],
        false: ['[--wrap:pre]']
      }
    },
    defaultVariants: {
      wrap: false
    }
  }
)

type ContentProps = {
  html: string
  as: string | React.ComponentType<any>
  className?: string
}

const Content: React.FC<BoxProps<'div'>> = ({
  html,
  className,
  as = 'div',
  ...rest
}) => (
  <Box
    className={clsx('code-block', className)}
    {...rest}
    as={as}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

type CodeProps = {
  children: string
  lang?: string
}

const CodeBlock: React.FC<CodeProps> = ({
  children,
  lang = 'language-jsx',
  ...rest
}) => {
  const isInstall = lang === 'language-npm' || lang === 'language-yarn'
  const la = isInstall ? 'language-jsx' : lang
  const shortLang = la.replace(/language-/g, '')
  const [id, setId] = useState(false)
  useEffect(() => {
    setId(true)
  }, [setId])
  return (
    <pre className={clsx('code', code({ wrap: isInstall }))}>
      <Content
        className={`hljs language-${shortLang}`}
        as="code"
        html={toHtml(lowlight.highlight(id ? shortLang : 'c', children))}
        {...rest}
      />
    </pre>
  )
}

export default CodeBlock
