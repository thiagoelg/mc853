FROM node:12-alpine

WORKDIR /node-app/build

COPY . . 

EXPOSE 80

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && node index.js