
const styling = ['style', 'css'];
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

exports.stylingLoaders = function() {
    return [
            { test: /\.png$/, loader: "url-loader?limit=100000" , exclude: /node_modules/ },
            { test: /\.jpg$/, loader: "file-loader" , exclude: /node_modules/ },
            { test: /\.scss$/, loaders: styling.concat(['sass']) , exclude: /node_modules/},
            { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader'}
            ];
}

exports.addStylePlugin = function(){
    return  new ExtractTextPlugin(path.join('style.css'), { allChunks: true });
}