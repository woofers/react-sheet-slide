const spaces = (indent: number) => {
  const tab = 2
  return ' '.repeat(tab * indent)
}

const imports = () => {
  const defaultImports = `
import React, { useState, useRef } from 'react'
import { Sheet, Header, Content, Footer, detents, Portal } from 'react-sheet-slide'
import 'react-sheet-slide/style.css'`
  return defaultImports
}

const addBooleanOption = (key: string, value: boolean) => {
  if (typeof value === 'undefined') return ''
  return `${key}={${value}}`
}

type Props = {}

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
          selectedDetent={detents.large}
          detents={props => [
            detents.large(props),
            detents.fit(props)
          ]}
${[
  addBooleanOption('useDarkMode', true),
  addBooleanOption('useModal', true),
  addBooleanOption('scrollingExpands', true)
].filter(el => !!el).map(value => spaces(5) + value).join('\n')}
        >
          <Header>Title</Header>
          <Content>
            <div style={{ padding: '54px 16px 24px' }}>
              <div>Add more storage to keep everything on online</div>
              <div>
                Online includes plenty of storage to keep all your data safe and
                features to protect your privacy.
              </div>
              <div>Learn More About Online</div>
            </div>
          </Content>
          <Footer>
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
