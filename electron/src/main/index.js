import { app, BrowserWindow, dialog } from 'electron';

if (!__DEV__) {
    const path = require('path');
    global.__STATIC__ = path.resolve(__dirname, '../').replace(/\\/g, '\\\\');
    global.__getAssets = path.resolve(__dirname, '../assets').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = __DEV__
    ? 'http://localhost:9080/home.html'
    : `file://${__dirname}/home.html`;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        webPreferences: {
            // nodeIntegrationInWorker: true,
            // webSecurity: false,
            nodeIntegration: true,
            preload: __STATIC__ + '/preload/index.js',
        },
    });

    dialog.showErrorBox('调试', __STATIC__);
    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
