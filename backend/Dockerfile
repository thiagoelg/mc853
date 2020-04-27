FROM node:12-alpine

WORKDIR /node-app/src

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 9001

CMD nodemon -L --watch . src/index.js