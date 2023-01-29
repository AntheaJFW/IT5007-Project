FROM node:19-alpine

WORKDIR /server

RUN apk add git

COPY package.json .
RUN corepack enable  \
    && corepack prepare yarn@stable --activate

COPY yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn set version 3.3.1
RUN yarn install

COPY . .
RUN chmod +x /server/start.sh

CMD yarn start
EXPOSE 3001