/* eslint-disable import/no-commonjs,no-undef,import/no-nodejs-modules */
const path = require('path');

module.exports = {
  entry: {
    script: path.resolve(__dirname, 'src/index.tsx'),
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true, // wipe output folder every build
    publicPath: '/', //Load static assets
  },
};
