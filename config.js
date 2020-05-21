const path = require('path');

module.exports = {
    dev: {
        width: 800,
        height: 600,
        alwaysOnTop: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        frame: true
    },
    prod: {
        width: 230,
        height: 122,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        // x: 3550,
        // y: 0,
        frame: false
    }
}