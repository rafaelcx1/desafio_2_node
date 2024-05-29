FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm i

COPY main.js ./

EXPOSE 8080

ENTRYPOINT [ "node", "main.js" ]