const configuration = require('webpack-react-conf');
const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
var common = require('./webpack.common');
const query = { 
    presets: ['es2015', 'react']
};
const styling = ['style', 'css'];
const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/demo/app.js'),
  ],
  devServer: {
    contentBase: './www',
    hot: true, 
    inline: true,
    port: 3000, 
    host: 'localhost',
  },
  // devtool: 'eval',
  output: {
    path: buildPath,
    filename: 'app.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: common.stylingLoaders().concat([
        {
        test: /\.js$/, // All .js files
        loaders: ['react-hot', 'babel-loader'], 
        exclude: [nodeModulesPath],
       }  
      ])  
  },
};

module.exports = config;    