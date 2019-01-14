'use strict';

const path = require('path');
const glob = require('glob');

const ENTRY_PATH = path.resolve(process.cwd(), 'src');
const NEW_ENTRY_PATH = path.resolve(process.cwd(), 'app');

// const VIEWS_PATH = path.resolve(process.cwd(), 'views');

// TODO 这里可修改入口
const entrys = [
    {
        name: 'entry',
        entry: [ path.resolve(ENTRY_PATH, 'index.js') ],
        template: path.resolve(ENTRY_PATH, 'template.ejs'),
        filename: 'entry.ejs',
    },
    {
        name: 'home',
        entry: [ path.resolve(ENTRY_PATH, 'home.js') ],
        template: path.resolve(ENTRY_PATH, 'template.ejs'),
        filename: 'home.ejs',
    },
];

// const files = glob.sync(path.join(ENTRY_PATH, '**/index.js'));

// files.forEach(key => {
//     const names = key.replace(ENTRY_PATH + '/', '').replace('/index.js', '').split('/');
//     const p = {
//         name: names[names.length - 1],
//         entry: key.replace(ENTRY_PATH + '/', ''),
//         filename: key.replace(ENTRY_PATH + '/', '').replace('/index.js', '/_inject.ejs'),
//     };

//     entrys.push({
//         name: p.name,
//         entry: [ path.resolve(ENTRY_PATH, p.entry) ],
//         template: path.resolve(ENTRY_PATH, 'template.ejs'),
//         filename: path.resolve(VIEWS_PATH, p.filename),
//     });
// });

module.exports = entrys;
