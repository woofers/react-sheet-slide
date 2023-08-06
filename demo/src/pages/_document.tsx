import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="no-js">
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.className = 'js'`
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="react-sheet-slide"></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
