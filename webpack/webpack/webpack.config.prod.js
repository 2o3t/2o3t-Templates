'use strict';

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css插件
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// 是否使用gzip
const PRODUCTION_GZIP = true;
// 需要gzip压缩的文件后缀
const PRODUCTION_GZIP_EXTENSIONS = [ 'js', 'css' ];
// 是否构建分析
const BUNDLE_ANALYZER_REPORT = true;

const config = {
    mode: 'production',
    plugins: [
        new OptimizeCssAssetsPlugin(),
    ],
};

if (PRODUCTION_GZIP) {
    config.plugins.push(
        // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
        new CompressionWebpackPlugin({
            test: new RegExp('\\.(' + PRODUCTION_GZIP_EXTENSIONS.join('|') + ')$'),
            threshold: 8192,
            minRatio: 0.8,
        })
    );
}

if (BUNDLE_ANALYZER_REPORT) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, config);
