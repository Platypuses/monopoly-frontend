/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:gif|png|jpg|jpeg|svg|ttf)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.hbs$/i,
        use: 'handlebars-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      router: path.resolve(__dirname, 'src/router'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      model: path.resolve(__dirname, 'src/model'),
      presenters: path.resolve(__dirname, 'src/presenters'),
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
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/assets/images/favicon.png'),
    }),
  ],
};
