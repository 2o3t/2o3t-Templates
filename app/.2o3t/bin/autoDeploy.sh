#!/usr/bin/env sh

# abort on errors
set -e

# version ctrl
# node ./.2o3t/bin/libsVersionCtrl.js

# deploy
npm run deploy

# finish
echo 'Deploy Finish...'
