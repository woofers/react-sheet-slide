function memoize<T, K extends Array<unknown>>(func: (...args: K) => T): (...args: K) => T {
  let saved: Partial<Record<string, T>> = {}
  return (...args: K) => {
    const key = args.join('-') ?? '-'
    if (key in saved) return saved[key] as T
    const value = func(...args)
    saved[key] = value
    return value
  }
}

export default memoize
