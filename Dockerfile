FROM node:11
RUN npm i npm@latest -g

WORKDIR /usr/node

COPY package*.json ./
RUN npm install && npm cache clean --force
ENV PATH /usr/node/node_modules/.bin:$PATH

WORKDIR /usr/node/app

COPY . .
RUN npm run build:client
RUN npm run build:server

EXPOSE 3000
CMD [ "node", "/usr/node/app/bin/server/index.js" ]

