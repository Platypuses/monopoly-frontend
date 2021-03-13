/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge');
const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const common = require('./webpack.common');

// noinspection JSCheckFunctionSignatures
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 3000,
    open: true,
    hot: true,
    compress: true,
  },
  plugins: [new HotModuleReplacementPlugin()],
});
