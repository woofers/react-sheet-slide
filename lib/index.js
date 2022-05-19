
if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./react-swipe-sheet.dev.js')
}
else {
  module.exports = require('./react-swipe-sheet.js')
}
