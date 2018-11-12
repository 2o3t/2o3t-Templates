
const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd(), './library');

const libname = 'oT-Ui';

// <!-- ##&PROJECT_NAME&## -->

const paths = [
    'package.json', // 修改 package.json 需要小写
    './public/index.html', // public/index.html
    './README.MD', // README.MD
];

paths.forEach(p => {
    const itemP = path.join(ROOT, p);
    if (!fs.existsSync(itemP)) {
        console.error(`[ERROR] not found ${p}!`);
        process.exit(1);
    }
    const itemPText = fs.readFileSync(itemP).toString();
    const newItemPText = itemPText.replace(/<!-- ##&PROJECT_NAME&## -->/igm, libname);
});
