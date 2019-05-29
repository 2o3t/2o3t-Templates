'use strict';

const __DEV__ = process.env.NODE_ENV === 'development';
const path = require('path');

if (!__DEV__) {
    global.__STATIC__ = path.resolve(__dirname, '../').replace(/\\/g, '\\\\');
    global.__getAssets = function(name = '') {
        return `${path.resolve(__dirname, '../assets').replace(/\\/g, '\\\\')}/${name}`;
    };
} else {
    // <!-- Add `node_modules/` to global paths so `require` works properly in development -->
    global.__ModuleGlobalPaths__ = require('module').globalPaths;
}
