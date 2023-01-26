FROM node:19

WORKDIR /server
COPY package.json /server
COPY yarn.lock /server
RUN yarn install
COPY . /server
CMD yarn start
EXPOSE 3001