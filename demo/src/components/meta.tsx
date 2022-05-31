import React from 'react'
import Head from 'next/head'

const Meta: React.FC<{}> = () => {
  return (
    <Head>
      <title>react-swipe-sheet</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <link rel="icon" href="/react-swipe-sheet/favicon.ico" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#070708" />
      <meta name="msapplication-navbutton-color" content="#070708" />
    </Head>
  )
}

export default Meta
