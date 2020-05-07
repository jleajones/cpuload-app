FROM node:11
RUN npm i npm@latest -g

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:client
RUN npm run build:server

EXPOSE 3000
CMD [ "node", "/usr/app/bin/server/index.js" ]

