var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-02'
        })
    ]
}