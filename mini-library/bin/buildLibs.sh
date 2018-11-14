#!/usr/bin/env sh

# abort on errors
set -e

# lint
npm run lint

# build
rollup -c ./libs/rollup.config.js

# finish
echo 'Build Libs Finish...'
