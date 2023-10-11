const webpack = require('webpack')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

const nextConfig = {
  distDir: '../build',
  useFileSystemPublicRoutes: false,
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    })
  ]
}

module.exports = withPlugins([[optimizedImages], withSass()], nextConfig)
