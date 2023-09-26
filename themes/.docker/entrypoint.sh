#!/bin/bash

npm install

#npm install --prefix ./config/fork-ts-checker-webpack-plugin
cp -R ./node_modules/fork-ts-checker-webpack-plugin/node_modules ./config/fork-ts-checker-webpack-plugin

if [ -d ./build ];
then
  echo "A pasta build já existe, caso queria refazê-la, é preciso executar o comando npm run build manualmente"
else
  npm run build
fi

/bin/sh -c "while sleep 1000; do :; done"