'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件

const DIST_PATH = path.resolve(process.cwd(), 'public', 'dist');
const STATIC_PATH = path.resolve(process.cwd(), 'static');

const entrys = require('./webpack.entry');

const OPEN_CSS_MODULES = false;

const config = {
    entry: entrys.reduce((obj, curr) => {
        const key = curr.name;
        obj[key] = curr.entry;
        return obj;
    }, {}),
    output: {
        path: DIST_PATH,
        publicPath: '/public/dist/',
        // publicPath: '/_static_/', //最终访问的路径就是：localhost:3000/_static_/js/*.js
        chunkFilename: '[name]/index.[chunkhash:8].js',
        filename: '[name]/index.js',
    },
    resolve: {
        extensions: [ '.js', 'jsx', '.vue', '.json', '.ts', '.tsx', '.css', '.scss', 'less' ],
        alias: {
            '~': process.cwd(),
            '@': path.resolve(process.cwd(), 'app'),
            '@src': path.resolve(process.cwd(), 'src'),
            // vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
            // 'vue-router$': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.esm.js'),
            // '@': path.resolve(__dirname, 'src'),
            // '@shared': path.resolve(__dirname, 'src/shared'),
            // '@client': path.resolve(__dirname, 'src/client'),
            // '@server': path.resolve(__dirname, 'src/server'),
        },
    },
    externals: {// 引入三方包
        // testPlugin: 'testPlugin',
    },
    optimization: {
        splitChunks: {
            // chunks: 'all',
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                },
            },
        },
        runtimeChunk: true,
        // runtimeChunk: {
        //     name: 'manifest',
        // },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {// 图片
                test: /\.(png|jpe?g|gif|svg|ico)$/i, // i不区分大小写
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './static/img/', // 图片输出位置
                        },
                    },
                    'image-webpack-loader', // 图片压缩工具
                ],
            },
            {// 字体图标
                test: /\.(eot|woff|woff2|ttf)$/i,
                // include: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30000,
                        outputPath: './static/font/', // 图片输出位置
                    },
                },
            },
            {// 数据
                test: [ /\.json$/i ], // i不区分大小写
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './static/data/', // 图片输出位置
                        },
                    },
                ],
            },
            {// 音乐
                test: [ /\.mp3$/i ], // i不区分大小写
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './static/music/', // 图片输出位置
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: OPEN_CSS_MODULES,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        },
                    }, {
                        loader: 'px2rem-loader',
                        // options here
                        options: {
                            remUnit: 50,
                            remPrecision: 8,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                // include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: OPEN_CSS_MODULES,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    }, {
                        loader: 'px2rem-loader',
                        // options here
                        options: {
                            remUnit: 50,
                            remPrecision: 8,
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.scss$/,
                // include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: OPEN_CSS_MODULES,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    }, {
                        loader: 'px2rem-loader',
                        // options here
                        options: {
                            remUnit: 50,
                            remPrecision: 8,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'tslint-loader',
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [ /\.vue$/ ],
                },
            },
            // svg-sprite-loader
        ],
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
        new CleanWebpackPlugin('./**/*', {
            root: DIST_PATH,
            verbose: true,
            dry: false,
        }),
        new copyWebpackPlugin([{// 复制static到dist
            from: STATIC_PATH, // 打包的静态资源目录地址
            to: './static', // 打包到dist下面的static
        }]),

        new MiniCssExtractPlugin({
            filename: '[name]/style.css',
            chunkFilename: '[name]/style-[contenthash].css',
        }),

        // new HtmlWebpackPlugin({
        //     template: path.resolve(ENTRY_PATH, 'index.html'), // 模板
        //     chunks: [  'commons', 'vendor', 'entry', 'runtime~entry'  ],
        //     filename: 'index.html',
        //     inject: true, // 允许插件修改哪些内容，包括head与body
        //     hash: true, // 是否添加hash值
        //     minify: { // 压缩HTML文件
        //         removeComments: true, // 移除HTML中的注释
        //         collapseWhitespace: true, // 删除空白符与换行符
        //     },
        //     chunksSortMode: 'none', // 如果使用webpack4将该配置项设置为'none'
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(ENTRY_PATH, 'view', 'template.ejs'), // 模板
        //     chunks: [  'commons', 'vendor', 'home', 'runtime~home'  ],
        //     filename: 'index.ejs',
        //     inject: true, // 允许插件修改哪些内容，包括head与body
        //     hash: true, // 是否添加hash值
        //     minify: { // 压缩HTML文件
        //         removeComments: true, // 移除HTML中的注释
        //         collapseWhitespace: true, // 删除空白符与换行符
        //     },
        //     chunksSortMode: 'none', // 如果使用webpack4将该配置项设置为'none'
        // }),
    ],
};

// HtmlWebpackPlugin
entrys.forEach(item => {
    const name = item.name;
    config.plugins.push(
        new HtmlWebpackPlugin({
            template: item.template, // 模板
            chunks: [ 'commons', 'vendor', name, `runtime~${name}` ],
            filename: item.filename,
            inject: false, // 允许插件修改哪些内容，包括head与body
            hash: true, // 是否添加hash值
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
            },
            chunksSortMode: 'none', // 如果使用webpack4将该配置项设置为'none'
        })
    );
});

module.exports = config;
