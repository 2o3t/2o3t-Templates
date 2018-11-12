import init from '../.2o3t/libs/build/init';
const rollupConfig = init({
    root: __dirname,
});

const DIST = 'dist';

const config = rollupConfig({
    root: __dirname,
    dist: DIST,
    external: [ 'vue' ],
    format: 'umd', // umd, esm
    name: 'OTUI-LIB', // 打包后的全局变量，如浏览器端 window.ReactRedux
    globals: {
        Vue: 'vue',
    },
});

export default config;
