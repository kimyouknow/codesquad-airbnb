const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  },
  entry: `${path.resolve(__dirname, '../src')}/index.tsx`,
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname, '../public')}/index.html`,
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new ReactRefreshWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
};
