import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { ThemeProvider } from 'components/theme-provider'
import Global from 'components/global'
import Meta from 'components/meta'
import type { AppProps } from 'next/app'
import '../styles/index.css'
import 'react-sheet-slide/style.css'

const noop = () => {}

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary
}) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
)

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={noop}>
    <ThemeProvider>
      <Meta />
      <Component {...pageProps} />
    </ThemeProvider>
  </ErrorBoundary>
)

export default MyApp
