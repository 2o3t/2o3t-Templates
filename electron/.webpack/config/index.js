'use strict';

const path = require('path');

const APP_NAME = 'Electron-2O3T';

module.exports = {
    TITLE: APP_NAME,
    APP_NAME,
    TEMPLATE: path.resolve(__dirname, '../template/index.ejs'),
    ROOT_CWD: process.cwd(),
    PORT: 9080,
};
