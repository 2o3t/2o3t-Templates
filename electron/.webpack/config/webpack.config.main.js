'use strict';

const __DEV__ = process.env.NODE_ENV === 'development';

// const { dependencies } = require('../../package.json');

const EntryConfig = require('./entry.config');
const MainEntry = EntryConfig.main;

const config = require('.');
const ROOT_CWD = config.ROOT_CWD;

const path = require('path');
const webpack = require('webpack');
const BabiliWebpackPlugin = require('babili-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const defConfig = {
    mode: process.env.NODE_ENV || 'production',
    devtool: __DEV__ ? '#cheap-module-eval-source-map' : '',
    entry: MainEntry,
    // externals: [
    //     ...Object.keys(dependencies || [])
    // ],
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(ROOT_CWD, './build/electron'),
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true), // 通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小，推荐使用
    ],
    target: 'electron-main',
};

/**
 * Adjust mainConfig for production settings
 */
if (__DEV__) {
    defConfig.plugins.push(
        new webpack.DefinePlugin({
            '__STATIC__': `"${path.join(ROOT_CWD, './static').replace(/\\/g, '\\\\')}"`,
            '__getAssets': `function(name = ''){ return "${path.join(ROOT_CWD, './static', './assets').replace(/\\/g, '\\\\')}/" + name }`,
        })
    );
} else {
    defConfig.plugins.push(
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.join(ROOT_CWD, 'static'),
                to: path.join(ROOT_CWD, './build'),
                ignore: [ '.*' ],
            },
        ]),
        new BabiliWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        })
    );
}

module.exports = webpackMerge(require('./webpack.config.base'), defConfig);
