#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run sass:base:build

export BUILD_TARGET=lib
# build
rollup -c ./libs/rollup.config.js
vue-cli-service build --target lib --name <!-- ##&PROJECT_NAME&## --> --dest dist libs/index.js

# finish
echo 'Build Libs Finish...'
