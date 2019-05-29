'use strict';

const path = require('path');

const config = require('.');
const ROOT_CWD = config.ROOT_CWD;

module.exports = {
    '@': path.join(ROOT_CWD, './src'),
    '@config': path.join(ROOT_CWD, './config'),
    '@shared': path.join(ROOT_CWD, './src', 'shared'),
    '@main': path.join(ROOT_CWD, './src', 'main'),
    '@renderer': path.join(ROOT_CWD, './src', 'renderer'),
};
