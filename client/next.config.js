/** @type {import('next').NextConfig} */
const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "~@styles/variables.scss";`
  },
  webpack: (config, options) => {
    config.plugins.push(new StylelintPlugin())
    return config
  },
}
