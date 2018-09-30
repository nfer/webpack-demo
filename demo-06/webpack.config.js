var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'index.[hash:7].js'
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
            title: 'webpack-demo-06'
        }),

        new MiniCssExtractPlugin({
          filename: "index.[hash:7].css"
        }),
    ]
}