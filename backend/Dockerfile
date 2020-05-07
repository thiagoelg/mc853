FROM node:12-alpine

WORKDIR /node-app/build

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 9001

CMD cd src && npx knex migrate:latest && npm run start:watch
