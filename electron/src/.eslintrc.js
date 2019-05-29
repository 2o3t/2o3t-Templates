module.exports = {
    root: true,
    extends: [
        "eslint-config-2o3t/vue"
    ],
    parserOptions: {
        parser: "babel-eslint",
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true
    },
    globals: {
        __DEV__: true,
        __STATIC__: true,
        __getAssets: true,
    }
}
