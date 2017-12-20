var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'index.[hash:7].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-05'
        }),

        new ExtractTextPlugin('index.[hash:7].css'),
    ]
}