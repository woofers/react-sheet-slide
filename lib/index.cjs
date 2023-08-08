'use client'

if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./react-sheet-slide.dev.cjs')
}
else {
  module.exports = require('./react-sheet-slide.cjs')
}
