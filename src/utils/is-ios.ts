import hasWindow from './has-window'

const isIosDevice = () =>
  hasWindow() &&
  window.navigator &&
  window.navigator.platform &&
  (/iP(ad|hone|od)/.test(window.navigator.platform) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1))

export default isIosDevice
