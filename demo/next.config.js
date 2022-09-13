const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  distDir: 'build',
  swcMinify: true,
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
  webpack(config, { isServer }) {
    config.plugins.push(new DefinePlugin({ '__isDev__': false }))
    config.plugins.push(new ESLintPlugin())
    config.module.rules.push({
      test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: ['preset-default', { name: 'removeViewBox', enabled: false }]
              }
            }
          },
          'file-loader'
        ],
    })
    return config
  },
  basePath: '/react-sheet-slide',
  assetPrefix: '/react-sheet-slide/',
  trailingSlash: true
})
