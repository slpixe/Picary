const path = require('path'),
  WorkboxPlugin = require('workbox-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ManifestPlugin = require('webpack-manifest-plugin'),
  cleanPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  dist = 'dist';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, dist)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new cleanPlugin([dist]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true
    }),
    new ManifestPlugin({
      seed: {
        name: 'Picary',
        lang: 'en-GB',
        start_url: '/',
        display: 'browser'
      }
    }),
    new CopyWebpackPlugin([
      { from: require.resolve('workbox-sw'), to: 'workbox-sw.prod.js' }
    ]),
    new WorkboxPlugin({
      globDirectory: dist,
      globPatterns: ['**/*.{html,js}'],
      swSrc: './src/sw.js',
      swDest: path.join(dist, 'sw.js')
    })
  ]
};