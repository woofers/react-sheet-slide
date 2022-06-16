
function memoize<T>(func: () => T): () => T {
  let saved: Partial<Record<'l', T>> = {}
  return () => {
    if ('l' in saved) return saved['l'] as T
    const value = func()
    saved['l'] = value
    return value
  }
}

export default memoize
