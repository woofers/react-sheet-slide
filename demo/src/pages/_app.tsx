import { ErrorBoundary } from 'react-error-boundary'
import { ThemeProvider } from 'components/theme-provider'
import Global from 'components/global'
import Meta from 'components/meta'
import type { AppProps } from 'next/app'
import 'react-sheet-slide/style.css'


function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
    <ThemeProvider>
      <Global />
      <Meta />
      <Component {...pageProps} />
    </ThemeProvider>
  </ErrorBoundary>
)

export default MyApp
