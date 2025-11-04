# backend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# CRÍTICO: Define a variável de ambiente PORT que o Node.js deve escutar
ENV PORT 8080 

# CRÍTICO: Usa o comando NODE direto, que é mais eficiente no Cloud Run que 'npm start'
CMD [ "node", "server.js" ]