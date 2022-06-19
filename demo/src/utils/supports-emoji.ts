import memoize from './memoize'

const supportEmoji = (emoji: string) => {
  if (typeof window === 'undefined') return true
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return true
  ctx.canvas.width = ctx.canvas.height = 1
  ctx.fillText(emoji, -4, 4)
  return ctx.getImageData(0, 0, 1, 1).data[3] > 0
}

const supportsEmoji = memoize(supportEmoji)


export default supportsEmoji
