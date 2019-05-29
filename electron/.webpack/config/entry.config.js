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
        if (__DEV__) {
            obj[key] = [ path.join(__dirname, 'dev-client'), path.join(RENDERER_CWD, key, 'index.js') ];
        } else {
            obj[key] = [ path.join(RENDERER_CWD, key, 'index.js') ];
        }
        return obj;
    }, {}),
    // 主进程
    main: mainKeys.reduce((obj, key) => {
        if (__DEV__) {
            obj[key] = [ path.join(__dirname, 'dev-main.js'), path.join(MAIN_CWD, key, 'index.js') ];
        } else {
            obj[key] = [ path.join(MAIN_CWD, key, 'index.js') ];
        }
        return obj;
    }, {}),
};
