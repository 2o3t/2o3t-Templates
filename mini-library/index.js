
export default function(libname) {
    require(`./dist/${libname}/style.css`);
    return require(`./dist/${libname}/index.js`);
}
