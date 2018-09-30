var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './index.js',
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].[hash:7].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-08'
        }),

        new ExtractTextPlugin('[name].[hash:7].css'),

        new CleanWebpackPlugin(['dist']),
    ]
}