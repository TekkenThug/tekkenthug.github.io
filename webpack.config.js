const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const {HotModuleReplacementPlugin} = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/main.js',
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            },
            {
                test: /.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['vue-style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new ESLintPlugin({
            fix: true
        }),
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'static/images', to: 'static/images' },
                { from: 'static/css', to: 'static/css' },
            ]
        }),
        new HTMLWebpackPlugin({
            showErrors: true,
            cache: true,
            template: path.join(__dirname, 'index.html')
        })
    ]
}