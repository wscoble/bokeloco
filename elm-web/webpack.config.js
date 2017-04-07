var path = require('path');
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
    entry: './index.js',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },

    resolve: {
        extensions: ['.js', '.elm']
    },

    module: {
        rules: [{
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/, /Stylesheets\.elm/],
                use: [
                    'elm-hot-loader',
                    'elm-webpack-loader'
                ]
            },
            {
                test: /Stylesheets\.elm$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'elm-css-webpack-loader'
                ]
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
                loader: "file-loader"
            }
        ]
    },

    target: 'web',

    devServer: {
        inline: true,
        stats: 'errors-only',
        historyApiFallback: true
    },

    // plugins: [
    //     new webpackUglifyJsPlugin({
    //         cacheFolder: path.resolve(__dirname, './.cache'),
    //         debug: true,
    //         minimize: true,
    //         sourceMap: false,
    //         output: {
    //             comments: false
    //         },
    //         compressor: {
    //             warnings: false
    //         }
    //     })
    // ]
};