import React from 'react'
import Head from 'next/head'

const Meta: React.FC<{}> = () => {
  return (
    <Head>
      <title>react-sheet-slide</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <link rel="icon" href="/react-sheet-slide/favicon.ico" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Head>
  )
}

export default Meta
