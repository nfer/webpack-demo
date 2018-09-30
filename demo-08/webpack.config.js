var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
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
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    'less-loader',
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-08'
        }),

        new MiniCssExtractPlugin({
          filename: "index.[hash:7].css"
        }),

        new CleanWebpackPlugin(['dist']),
    ]
}