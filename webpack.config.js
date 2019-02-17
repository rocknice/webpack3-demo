const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: './assets/scripts/index.es'
    },
    output: {
        path: path.join(__dirname, './assets'),
        publicPath: './', // 生产环境下这里是cdn的地址
        filename: 'scripts/[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.es$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    "presets": [
                        ["es2015", {'modules': false}], "stage-0" // 开启tree-shaking，删除没有用到的代码
                    ]
                }
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            })
        }]
    },
    reslove: [],
    plugins: [
        // 从js中提取css
        new ExtractTextPlugin("styles/[name].css"),
        // 提取公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'scripts/[name].js',
            minChunks: 2
        }),
        // 压缩js代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warning: true
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        // 提升作用域、优化编译后的代码，合并函数
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 将js、css插入对应的html模版
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true
        })
    ]
}