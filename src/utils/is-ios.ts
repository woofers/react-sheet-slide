import hasWindow from './has-window'
import memoize from './memoize'

const isIosDevice = () =>
  hasWindow() &&
  window.navigator &&
  window.navigator.platform &&
  (/iP(ad|hone|od)/.test(window.navigator.platform) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1))

const memoized = memoize(isIosDevice)

export default memoized
