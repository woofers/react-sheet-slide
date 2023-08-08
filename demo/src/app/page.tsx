import type { Metadata } from 'next'
import Data from './data'

const name = 'Jaxson Van Doorn'
const ogImage = '/meta-image.png'

const title = 'react-sheet-slide'
const author = name
const description = 'Responsive React draggable sheet and dialog component'
const alt = ''

export const metadata = {
  title,
  description,
  creator: name,
  publisher: name,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
  },
  icons: {
    icon: [{ url: '/react-sheet-slide/favicon.ico' }],
    shortcut: ['/react-sheet-slide/favicon.ico'],
    apple: [
      ...[32, 48, 72, 96, 144, 192, 256, 384, 512].map(size => ({
        url: `/react-sheet-slide/icons/apple-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: 'image/png'
      }))
    ],
    other: []
  },
  manifest: '/react-sheet-slide/manifest.webmanifest',
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://jaxs.onl/react-sheet-slide')
      : new URL('http://localhost:3000/react-sheet-slide'),
  twitter: {
    card: 'summary_large_image',
    title,
    description: description,
    creator: '@jaxsonvandoorn',
    images: {
      url: ogImage,
      alt
    }
  },
  openGraph: {
    title,
    description,
    images: [
      {
        type: 'image/png',
        url: ogImage,
        alt,
        width: 1200,
        height: 630
      }
    ]
  }
} satisfies Metadata

const Page: React.FC<Nothing> = () => {
  return <Data />
}

export default Page
