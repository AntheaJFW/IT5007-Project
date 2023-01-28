FROM node:19-alpine

WORKDIR /server

RUN apk add git

COPY package.json /server
COPY yarn.lock /server
COPY . /server
RUN corepack enable && corepack prepare yarn@stable --activate && yarn set version 3.3.1 && yarn install

CMD yarn start
EXPOSE 3001