const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),

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

      // Load CSS, SASS, SCSS Module
      {
        test: /\.module\.(css|sass|scss)$/,
        use: [
          // Extract CSS from JS
          MiniCssExtractPlugin.loader,

          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: { modules: true },
          },

          // Add PostCSS Autoprefixer
          'postcss-loader',

          // Compiles Sass to CSS
          'sass-loader',
        ],
      },

      // Load CSS, SASS, SCSS exclude module
      {
        test: /\.(css|sass|scss)$/,
        exclude: /\.module\.(css|sass|scss)$/,
        use: [
          // Extract CSS from JS
          MiniCssExtractPlugin.loader,

          // Translates CSS into CommonJS
          'css-loader',

          // Add PostCSS Autoprefixer
          'postcss-loader',

          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
});
