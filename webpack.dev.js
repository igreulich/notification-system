/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  exampleSource: path.join(__dirname, 'src', 'example'),
  libSource: path.join(__dirname, 'src'),
  out: path.join(__dirname, 'dist'),
};

const styleOpts = {
  configFile: path.join(__dirname, '.stylelintrc'),
  context: path.join(__dirname, 'src', 'less'),
  files: '**/*.less',
};

module.exports = {
  entry: {
    'notification-system': [
      'babel-polyfill',
      'react-hot-loader/patch',
      `${PATHS.libSource}/index`,
    ],
    example: [
      'react-hot-loader/patch',
      `${PATHS.exampleSource}/index`,
    ],
  },
  output: {
    path: PATHS.out,
    publicPath: '/dist',
    filename: '[name].js',
  },
  devtool: 'eval',
  module: {
    rules: [
      { test: /\.(js|jsx)?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.(svg|png|jpe?g|gif)$/, use: 'file-loader?name=fonts/[name].[ext]' },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Notification System',
      template: `${PATHS.exampleSource}/index.ejs`,
      filename: path.join(__dirname, 'index.html'),
      inject: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin(styleOpts),
  ],
  devServer: {
    port: 9000,
    hot: true,
    publicPath: 'http://localhost:9000/dist',
    overlay: true,
    open: true,
  },
};
