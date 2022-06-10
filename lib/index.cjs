
if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./react-swipe-sheet.dev.cjs')
}
else {
  module.exports = require('./react-swipe-sheet.cjs')
}
