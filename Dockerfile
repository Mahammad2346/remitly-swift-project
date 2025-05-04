FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env

ENV NODE_ENV=production

EXPOSE 8080


CMD ["node", "dist/index.js"]
