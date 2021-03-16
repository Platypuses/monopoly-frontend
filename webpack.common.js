/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/main/index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(scss|css)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      images: path.resolve(__dirname, 'src/static/images'),
      styles: path.resolve(__dirname, 'src/static/styles'),
      presenters: path.resolve(__dirname, 'src/main/presenters'),
    },
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[id].[chunkhash:8].js',
    sourceMapFilename: '[name].[contenthash:8].map',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Monopoly',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/static/index.html'),
      favicon: path.resolve(__dirname, './src/static/images/favicon.png'),
    }),
  ],
};
