'use strict';

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css插件

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new OptimizeCssAssetsPlugin(),
    ],
});
