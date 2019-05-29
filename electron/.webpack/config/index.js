'use strict';

const path = require('path');

const APP_NAME = '2O3T-Electron';

module.exports = {
    TITLE: APP_NAME,
    APP_NAME,
    TEMPLATE: path.resolve(__dirname, './index.ejs'),
    ROOT_CWD: process.cwd(),
    PORT: 9080,
};
