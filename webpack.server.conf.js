const configuration = require('webpack-react-conf');
const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
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
    devtool: '#source-map',
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
    loaders: [
      { test: /\.png$/, loader: "url-loader?limit=100000" , exclude: /node_modules/ },
      { test: /\.jpg$/, loader: "file-loader" , exclude: /node_modules/ },
      { test: /\.scss$/, loaders: styling.concat(['sass']) , exclude: /node_modules/},
      {
        test: /\.js$/, // All .js files
        loaders: ['react-hot', 'babel-loader'], 
        exclude: [nodeModulesPath],
      },
    ],
  },
};

module.exports = config;    