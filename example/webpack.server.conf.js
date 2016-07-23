const configuration = require('webpack-react-conf');
const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.js'),
  ],
  devServer: {
    contentBase: 'src/www', 
    devtool: 'eval',
    hot: true, 
    inline: true,
    port: 3000, 
    host: 'localhost',
  },
  devtool: 'eval',
  output: {
    path: buildPath,
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['react-hot', 'babel-loader'], 
        exclude: [nodeModulesPath],
      },
    ],
  },
};

module.exports = config;    