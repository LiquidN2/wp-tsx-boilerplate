/* eslint-disable import/no-commonjs,no-undef,import/no-nodejs-modules */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    static: { directory: path.resolve(__dirname, 'dist') },
    compress: true,
    watchFiles: ['src/**/*'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'head',
      scriptLoading: 'defer',
    }),
  ],

  module: {
    rules: [
      // Load TS
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },

      // Load CSS, SASS, SCSS modules
      {
        test: /\.module\.(css|sass|scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',

          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: true,
            },
          },

          // Add PostCSS Autoprefixer
          'postcss-loader',

          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },

      // Load CSS, SASS, SCSS
      {
        test: /\.(css|sass|scss)$/,
        exclude: /\.module\.(css|sass|scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',

          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },

          // Add PostCSS Autoprefixer
          'postcss-loader',

          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
});
