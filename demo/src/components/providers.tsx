'use client'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { ThemeProvider } from 'components/theme-provider'

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

export const Providers: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={noop}>
    <ThemeProvider>{children}</ThemeProvider>
  </ErrorBoundary>
)
