#!/bin/bash

npm install

#npm install --prefix ./config/fork-ts-checker-webpack-plugin
cp -R ./node_modules/fork-ts-checker-webpack-plugin/node_modules ./config/fork-ts-checker-webpack-plugin

npm run build

/bin/sh -c "while sleep 1000; do :; done"