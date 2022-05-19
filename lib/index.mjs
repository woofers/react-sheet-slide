import SheetDev from './react-swipe-sheet.dev.mjs'
import Sheet from './react-swipe-sheet.mjs'

export default process.env.NODE_ENV === 'production' ? Sheet : SheetDev
