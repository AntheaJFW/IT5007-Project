FROM node:19

WORKDIR /client
COPY package.json /client
COPY yarn.lock /client
RUN yarn install
COPY . /client
CMD yarn start
EXPOSE 3000