'use strict';

const __DEV__ = process.env.NODE_ENV === 'development';

const path = require('path');

const config = require('.');
const ROOT_CWD = config.ROOT_CWD;

const AntdConfig = require('./antd.config');
const aliasConfig = require('./alias.config');
const webpack = require('webpack');

const defConfig = {
    module: {
        rules: [
            {
                test: /\.(jsx?|vue)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                    },
                },
            },
            {
                test: /\.scss$/,
                oneOf: [
                    // this matches `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    localIdentName: '[local]_[hash:base64:5]',
                                },
                            },
                            'postcss-loader',
                            'sass-loader',
                        ],
                    },
                    // this matches plain `<style>` or `<style scoped>`
                    {
                        use: [ 'vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ],
                    },
                ],
            },
            {
                test: /\.sass$/,
                use: [ 'vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader?indentedSyntax' ],
            },
            {
                test: /\.less$/,
                use: [ 'vue-style-loader', 'css-loader', 'postcss-loader', {
                    loader: 'less-loader', options: {
                        javascriptEnabled: true,
                        modifyVars: AntdConfig,
                    },
                }],
            },
            {
                test: /\.css$/,
                use: [ 'vue-style-loader', 'css-loader', 'postcss-loader' ],
            },
            {
                test: /\.html$/,
                use: 'vue-html-loader',
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.node$/,
                use: 'node-loader',
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        extractCSS: process.env.NODE_ENV === 'production',
                        loaders: {
                            sass: 'vue-style-loader!css-loader?modules=true!sass-loader?indentedSyntax=1',
                            scss: 'vue-style-loader!css-loader?modules=true!sass-loader',
                            less: 'vue-style-loader!css-loader?modules=true!less-loader',
                        },
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'imgs/[name]--[folder].[ext]',
                    },
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name]--[folder].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'fonts/[name]--[folder].[ext]',
                    },
                },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'tslint-loader',
            },
        ],
    },
    resolve: {
        alias: aliasConfig,
        extensions: [ '.js', '.jsx', '.vue', '.node', '.json' ],
    },
    plugins: [
        new webpack.DefinePlugin({ // 用途：定义全局常量
            __DEV__,
            'process.env.NODE_ENV': __DEV__ ? '"development"' : '"production"',
        }),
    ],
    node: {
        __dirname: __DEV__,
        __filename: __DEV__,
    },
};

// if (__DEV__) {
const { dependencies } = require(path.resolve(ROOT_CWD, 'package.json'));
defConfig.externals = [
    ...Object.keys(dependencies || [])
];
// }

module.exports = defConfig;
