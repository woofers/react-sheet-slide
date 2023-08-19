import type { Trinary, FormProps as Props } from 'types/global'

export const trinaryToBool = (tri: Trinary): boolean | undefined => {
  if (tri === 'on') return true
  if (tri === 'off') return false
  return undefined
}

const spaces = (indent: number) => {
  const tab = 2
  return ' '.repeat(tab * indent)
}

const imports = () => {
  const defaultImports = `import React, { useState, useRef } from 'react'
import { Sheet, Header, Content, Footer, detents, Portal } from 'react-sheet-slide'
import 'react-sheet-slide/style.css'`
  return defaultImports
}

const addBooleanOption = (key: string, value: boolean | undefined) => {
  if (typeof value === 'undefined') return ''
  return `${key}={${value}}`
}

const addDetents = (detents: Props['detents']) => {
  const active = detents.selected.map(({ id }) => id)
  const data = active.length > 0 ? active : ['large']
  return data.map(key => `detents.${key}(props)`).join(',\n' + spaces(6))
}

const code = (props: Props) => {
  return `${imports()}

const App = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  return (
    <div className="rss-backdrop" style={{ background: '#f7f8f8', minHeight: '100vh' }}>
      <button type="button" onClick={() => setOpen(true)} style={{ display: 'flex', margin: '28px auto 0' }}>
        Open sheet
      </button>
      <Portal>
        <Sheet
          ref={ref}
          open={open}
          onDismiss={() => setOpen(false)}
          onClose={() => {
            console.log('Component unmounted')
          }}
          selectedDetent={detents.${props.detents.selected[0]?.id ?? 'large'}}
          detents={props => [
            ${addDetents(props.detents)}
          ]}
${[
  addBooleanOption('useDarkMode', trinaryToBool(props.useDarkMode)),
  addBooleanOption('useModal', trinaryToBool(props.useModal)),
  addBooleanOption('scrollingExpands', props.scrollingExpands)
]
  .filter(el => !!el)
  .map(value => spaces(5) + value)
  .join('\n')}
        >
          <Header className="rss-header" scrolledClassName="rss-header-scrolled">Title</Header>
          <Content className="rss-content">
            <div style={{ padding: '54px 16px 24px' }}>
              <div>Add more storage to keep everything on online</div>
              <div>
                Online includes plenty of storage to keep all your data safe and
                features to protect your privacy.
              </div>
              <div>Learn More About Online</div>
            </div>
          </Content>
          <Footer className="rss-footer">
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </Footer>
        </Sheet>
      </Portal>
    </div>
  )
}
`
}

export default code
