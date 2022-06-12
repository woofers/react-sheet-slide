import React, { useState, useEffect } from 'react'
import { styled } from 'stitches'
import { lowlight } from 'lowlight'
import { toHtml } from 'hast-util-to-html'

const Element = styled('div', {
  '.hljs-title.function_': {
    color: '$codeFunction'
  },
  '.hljs-string': { color: '$codeFunction' },
  '.hljs-keyword, .hljs-name, .hljs-link': { color: '$codeKeyword' },
  '.hljs-keyword': { color: '$codeKeyword' },
  '.hljs-attr': { color: '$codeFunction' }
})

const Pre = styled('pre', {
  background: '$codeBackground',
  padding: '8px 14px',
  br: '22px',
  overflowX: 'auto',
  fontSize: '14px',
  lineHeight: '1.4'
})

type ContentProps = {
  html: string
  as: string | React.ComponentType<any>
  className?: string
}

const Content: React.FC<ContentProps> = ({ html, as = 'div', ...rest }) => (
  <Element {...rest} as={as} dangerouslySetInnerHTML={{ __html: html }} />
)

type CodeProps = {
  children: string
  lang?: string
}

const CodeBlock: React.FC<CodeProps> = ({ children, lang = 'language-jsx', ...rest }) => {
  const la = lang === 'language-npm' || lang === 'language-yarn' ? 'language-jsx' : lang
  const shortLang = la.replace(/language-/g, '')
  const [id, setId] = useState(false)
  useEffect(() => {
    setId(true)
  }, [setId])
  return (
    <Pre>
      <Content
        className={`hljs language-${shortLang}`}
        as="code"
        html={toHtml(lowlight.highlight(id ? shortLang : 'c', children))}
        {...rest}
      />
    </Pre>
  )
}

export default CodeBlock
