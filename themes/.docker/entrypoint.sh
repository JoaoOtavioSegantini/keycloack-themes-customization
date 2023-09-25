#!/bin/bash

npm install

npm install --prefix ./config/fork-ts-checker-webpack-plugin

npm build

/bin/sh -c "while sleep 1000; do :; done"