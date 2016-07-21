/**
 * Created by jpicado on 15/07/16.
 */
const DefaultConfig = require('webpack-react-conf');
const conf = DefaultConfig(
    './src/index.jsx',
    './lib/index.js',
    'PasswordGenerator',
    'umd');
// uncomment or override in order to disable uglify  (the default plugin)
conf.plugins = [];
conf.externals = [
    {
        "react" : true,
        "react-dom" : true,
        "password-generator" : true,
        "react-tap-event-plugin"  : true
    },
    /^material-/
];
module.exports = conf;