'use strict';

const __DEV__ = process.env.NODE_ENV === 'development';

const fs = require('fs');
const path = require('path');

const config = require('.');
const ROOT_CWD = config.ROOT_CWD;

const SRC_CWD = path.resolve(ROOT_CWD, 'src');
const RENDERER_CWD = path.resolve(SRC_CWD, 'renderer');
const rendererKeys = fs.readdirSync(RENDERER_CWD).filter(key => {
    return fs.statSync(path.resolve(RENDERER_CWD, key)).isDirectory();
});

// 主进程只有一个入口
const MAIN_CWD = SRC_CWD;
const mainKeys = [ 'main' ];

module.exports = {
    // 渲染进程
    renderer: rendererKeys.reduce((obj, key) => {
        const entry = [ path.join(RENDERER_CWD, key, 'index.js') ];
        if (__DEV__) {
            entry.unshift(path.join(__dirname, 'dev-client'));
        }
        entry.unshift('babel-polyfill', path.join(__dirname, '../base'));
        obj[key] = entry;
        return obj;
    }, {}),
    // 主进程
    main: mainKeys.reduce((obj, key) => {
        const entry = [ path.join(MAIN_CWD, key, 'index.js') ];
        if (__DEV__) {
            entry.unshift(path.join(__dirname, 'dev-main.js'));
        }
        entry.unshift('babel-polyfill');
        obj[key] = entry;
        return obj;
    }, {}),
};
