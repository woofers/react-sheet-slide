import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from 'stitches'
import type { DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
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
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
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
