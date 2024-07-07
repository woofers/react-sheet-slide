import './global.css'
import 'react-sheet-slide/style.css'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <head />
    <body>
      <div id="__next">{children}</div>
      <div id="react-sheet-slide"></div>
    </body>
  </html>
)

export default RootLayout
