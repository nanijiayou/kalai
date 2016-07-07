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
        filename: "[name].js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel', 
                query: {
                    presets: ['react','es2015']
                }
            },
            {   
                test: /\.css$/,
                exclude: /(DateRange)/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[local]__[hash:base64:5]'
            },
            {
                test: /\.css$/,
                include: /(DateRange)/,
                loader: 'style-loader!css-loader'
            }, 
            { test: /\.png$/, loader: "url-loader?limit=1000&name=[path][name].[ext]" },
            { test: /\.jpg$/, loader: "file-loader" }
        ]
    }
};