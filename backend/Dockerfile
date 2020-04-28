FROM node:12-alpine

WORKDIR /node-app/build

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

RUN npx tsc

COPY . . 

EXPOSE 9001

CMD nodemon -L --watch . build/index.js
