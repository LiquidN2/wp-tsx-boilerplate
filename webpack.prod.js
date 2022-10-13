const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),

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

      // Load CSS, SASS, SCSS
      {
        test: /\.s?css$/i,
        use: [
          // Extract CSS from JS
          MiniCssExtractPlugin.loader,

          // Translates CSS into CommonJS
          'css-loader',

          // Add PostCSS Autoprefixer (see postcss.config.js)
          'postcss-loader',

          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
});
