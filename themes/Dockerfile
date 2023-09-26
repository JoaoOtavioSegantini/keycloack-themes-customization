FROM node:19.8.1-alpine3.17

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

RUN mkdir -p build

RUN sudo chown node:node build
