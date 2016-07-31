/**
 * Created by jpicado on 15/07/16.
 */
const DefaultConfig = require('webpack-react-conf');
const conf = DefaultConfig(
    './src/index.js',
    'lib',
    'index.js',
    'PasswordGenerator',
    'umd');
// uncomment or override in order to disable uglify  (the default plugin)
conf.plugins = [];
conf.externals = [
    {
        "react" : true,
        "password-generator" : true,
        "react-tap-event-plugin"  : true
    },
    /^material-/
];
module.exports = conf;