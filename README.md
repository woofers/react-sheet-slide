# react-sheet-slide

🏞️ 🎢 🛝 A responsive React draggable sheet and dialog component.

No more hard to use and dismiss modal experiences for mobile users.
Instead `react-sheet-slide` provides a fully draggable sheet
that properly blocks weird overscrolling and focus bugs.  Then on desktop
this component optionally supports a fully-featured modal.
Alterativly the sheet can be used on desktop as-well if so desired.

## Features

- Responsive way to display blocking modal-like content on mobile web-apps.
- Accessible with proper scroll & focus blocking, with `Esc` to close on desktop.
- Supports dark and light mode out of the box
- Customizable detents
- Similar API to Apple's UIKit sheet
- Supports Server-Side rendering.
- Built with css-modules (no styled-in-js library needed)

## Screenshots

<h3>Light Mode</h3>
<p align="center">
  <img src="/screenshots/light-mode-1.png" width="45%" alt="react-sheet-slide fully expanded and scrolled up in light mode." />    <img src="/screenshots/light-mode-2.png" width="45%" alt="react-sheet-slide fully expanded and scrolled down in light mode." />
</p>
<h3>Dark Mode</h3>
<p align="center">
  <img src="/screenshots/dark-mode-1.png" width="45%" alt="react-sheet-slide fully expanded and scrolled up in dark mode." />    <img src="/screenshots/dark-mode-2.png" width="45%" alt="react-sheet-slide fully expanded and scrolled down in dark mode." />
</p>


https://user-images.githubusercontent.com/7284672/174498349-04c57aba-9a94-41a5-ac46-92206120ff9e.mov

https://user-images.githubusercontent.com/7284672/174498361-39b9196a-93ab-45ea-bba8-31cc48c02025.mov

## Installation

**Yarn**

```yarn
yarn add react-sheet-slide @react-spring/web@^9 @use-gesture/react@^10
```

**npm**

```npm
npm install react-sheet-slide @react-spring/web@^9 @use-gesture/react@^10
```

## Motivation

This library is largely based on the fantastic [react-spring-bottom-sheet](https://github.com/stipsan/react-spring-bottom-sheet).  While [react-spring-bottom-sheet](https://github.com/stipsan/react-spring-bottom-sheet) is much more feature-packed than `react-sheet-slide`, supporting more props like many different callbacks on sheet snap start/end.
However the extra dependencies like `xstate` and the `resize-observer` polyfill can lead to a larger bundle size.
Also using `react-spring` as a dependencies instead of a peer dependencies limits users of the library from
controlling the version of `react-spring` they use. It can also lead to 2 versions of `react-spring` being bundled,
if the user is using a newer or older major version than the library.

By simplifying the API these libraries can be removed, and by moving `react-spring` to a peer dependencies
makes the library have a much lighther footprint.  Also `react-sheet-slide` includes a
dark mode and a fully-featured desktop modal that can be enabled for non-mobile users.
It also adds support for a backdrop animation similar to Apple's UIKit.

## Usage

```jsx
import React, { useState, useRef } from 'react'
import { Sheet, Header, Content, Footer, detents, Portal } from 'react-sheet-slide'
import 'react-sheet-slide/style.css'

const App = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
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
            detents.medium(props)
          ]}
          useDarkMode={false}
          useModal={false}
        >
          <Header>Title</Header>
          <Content>
            <div>Add more storage to keep everything on online</div>
            <div>
              Online includes plenty of storage to keep all your data safe and
              features to protect your privacy.
            </div>
            <div>Learn More About Online</div>
          </Content>
          <Footer>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </Footer>
        </Sheet>
      </Portal>
    </>
  )
}
```

`react-sheet-slide` includes a `Portal` component however other portal can be used like
`@reach/portal` or `@mui/base`.  The one included is just of modified version of `@reach/portal` however with support for string refs and defaults to `body`.

## Props

- `open`

  Set if the sheet is open.  When this prop is changed the sheet
  will animate and the unmount/remount.  When the component fully unmounts, `onClose` will be called.

- `onDismiss`

  Called when the sheet is dragged down or the user clicks on the backdrop.  Also called when the user presses `Esc`.
  This method should include `setOpen(false)` to ensure `open` is false.  Otherwise the sheet may not close properly.

- `onClose`

  Called when the sheet finishes the close animation and is fully unmounted.

- `selectedDetent`

  The default detent size that the sheet will open to.

- `detents`

  List of available detents that the sheet will catch on.  Reccomened to set to either `detents.large` or `props => [detents.large(props), detents.medium(props)]`
  to mimic the UIKit behaviour however can be customized using the callback.

- `useDarkMode`

  Prop to control if dark mode is enabled.  By default this will use the system `prefers-color-scheme`.

- `useModal`

  Prop to control when a modal should be used instead of a sheet.  If your app will likely only be used on mobile `useModal={false}` is reccomened.
  Otherwise it will default to true on any device larger than `(max-width: 640px)` to use a modal on desktop.

- `ref`

  The sheet also supports forwarding a ref that will be added onto the sheet root.
