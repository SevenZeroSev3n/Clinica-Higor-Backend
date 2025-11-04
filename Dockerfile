# backend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
CMD [ "npm", "start" ]