import { ThemeProvider } from 'components/theme-provider'
import Global from 'components/global'
import Meta from 'components/meta'
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Global />
    <Meta />
    <Component {...pageProps} />
  </ThemeProvider>
)

export default MyApp
