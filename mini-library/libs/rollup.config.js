import init from '../.2o3t/libs/build/init';
const rollupConfig = init({
    root: __dirname,
});

const LIB_NAME = '2o3t-mini-libs';
const DIST = `dist/${LIB_NAME}`;

const config = rollupConfig({
    root: __dirname,
    dist: DIST,
    external: [
        // 'vue'
    ],
    format: 'umd', // umd, esm
    name: 'OtMiniLibs', // 打包后的全局变量，如浏览器端 window.ReactRedux
    globals: {
        // Vue: 'vue',
    },
});

export default config;
