const query = { 
    presets: ['es2015', 'react']
};
const styling = ['style', 'css'];


exports.stylingLoaders = function() {
    return [{ test: /\.png$/, loader: "url-loader?limit=100000" , exclude: /node_modules/ },
            { test: /\.jpg$/, loader: "file-loader" , exclude: /node_modules/ },
            { test: /\.scss$/, loaders: styling.concat(['sass']) , exclude: /node_modules/}];
}