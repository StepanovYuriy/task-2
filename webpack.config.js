const path = require('path');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'linter.js',
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'umd', // This allowing it to work as global variable
        globalObject: 'this' // To make UMD build available on both browsers and Node.js
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ]
    },
};
