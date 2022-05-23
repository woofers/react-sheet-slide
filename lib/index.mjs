import { Sheet as SheetDev, Header as HeaderDev, Content as ContentDev, Footer as FooterDev, Portal as PortalDev } from './react-swipe-sheet.dev.mjs'
import { Sheet as SheetProd, Header as HeaderProd, Content as ContentProd, Footer as FooterProd, Portal as PortalProd } from './react-swipe-sheet.mjs'

export const Sheet = process.env.NODE_ENV === 'production' ? SheetProd : SheetDev
export const Header = process.env.NODE_ENV === 'production' ? HeaderProd : HeaderDev
export const Content = process.env.NODE_ENV === 'production' ? ContentProd : ContentDev
export const Footer = process.env.NODE_ENV === 'production' ? FooterProd : FooterDev
export const Portal = process.env.NODE_ENV === 'production' ? PortalProd : PortalDev
