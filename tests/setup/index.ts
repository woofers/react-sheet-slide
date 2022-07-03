import '@testing-library/jest-dom'
import { format } from 'util'

/* Replaces built-in functions */
const replace = (obj: any, key: string, func: (args: unknown[], original: any) => void): () => void => {
  const original = obj[key]
  const wrapper = (...args: unknown[]) => func(args, original)
  const reset = () => {
    obj[key] = original
  }
  obj[key] = wrapper
  return reset
}

/* Throw error on console.error. Useful for React render errors */
replace(console, 'error', ([message, ...args], error) => {
  error.apply(message, args)
  const formatted = format(message, ...args)
  throw message instanceof Error ? formatted : new Error(formatted)
})
