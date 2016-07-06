/**
 * Created by nani on 15/6/16.
 */
'use strict';
var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: {
        index: "./index.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: './dist/',
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
    // module: {
    //     loaders: [
    //         { test:  /\.js|jsx$/, exclude:/node_modules/, loader: "babel-loader"}
    //         // { test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[local]__[hash:base64:5]'},
    //         // { test: /\.png$/, loader: "url-loader?limit=1000&name=[path][name].[ext]" },
    //         // { test: /\.jpg$/, loader: "file-loader" }
    //     ]
    // }
};