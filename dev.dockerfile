FROM node:19-alpine

WORKDIR /client

RUN apk add git

COPY package.json /client
RUN sed -i 's/localhost/server/g' package.json
COPY yarn.lock /client
COPY . /client
RUN corepack enable && corepack prepare yarn@stable --activate && yarn set version 3.3.1 && yarn install

CMD yarn start
EXPOSE 3000