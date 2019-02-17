const path = require('path')

module.exports = {
    entry: {
        index: './assets/scripts/index.es'
    },
    output: {
        path: path.join(__dirname, './assets'),
        publicPath: './',
        filename: 'scripts/[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.es$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    "presets": [
                        ["es2015", {'modules': false}], "stage-0"
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
        new ExtractTextPlugin("styles/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'scripts/[name].js',
            minChunks: 2
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warning: true
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true
        })
    ]
}