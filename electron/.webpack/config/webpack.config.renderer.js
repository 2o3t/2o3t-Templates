'use strict';

const __DEV__ = process.env.NODE_ENV === 'development';

// const { dependencies } = require('../../package.json');

const EntryConfig = require('./entry.config');
const RendererEntry = EntryConfig.renderer;

const config = require('.');
const ROOT_CWD = config.ROOT_CWD;

const webpack = require('webpack');
const path = require('path');
const BabiliWebpackPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpackMerge = require('webpack-merge');

const defConfig = {
    mode: process.env.NODE_ENV || 'production',
    devtool: __DEV__ ? '#cheap-module-eval-source-map' : '',
    entry: RendererEntry,
    // externals: [
    //     ...Object.keys(dependencies || [])
    // ],
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(ROOT_CWD, './build/electron'),
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        ...Object.keys(RendererEntry).map(key => {
            return new HtmlWebpackPlugin({
                title: config.TITLE,
                filename: `${key}.html`,
                template: config.TEMPLATE,
                // inject: true,
                minify: {
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                },
                nodeModules: process.env.NODE_ENV !== 'production' ?
                    path.resolve(ROOT_CWD, './node_modules') : false,
            });
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true), // 通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小，推荐使用
    ],
    target: 'electron-renderer',
};

if (__DEV__) {
    defConfig.plugins.push(
        new webpack.DefinePlugin({
            '__STATIC__': `"./static"`, // 本地调试启动的是服务, 所以不能绝对路径
            // '__STATIC__': `"${path.join(ROOT_CWD, './static').replace(/\\/g, '\\\\')}"`,
            '__getAssets': `function(name = ''){ return "./static/" + name }`,
            // '__getAssets': `function(name = ''){ return "${path.join(ROOT_CWD, './static', './assets').replace(/\\/g, '\\\\')}/" + name }`
        }),
        new webpack.HotModuleReplacementPlugin(), // 热更相关插件
    );
} else {
    defConfig.plugins.push(
        new BabiliWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        })
    );
}

module.exports = webpackMerge(require('./webpack.config.base'), defConfig);
