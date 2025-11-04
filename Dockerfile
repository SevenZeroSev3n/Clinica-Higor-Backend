# backend/Dockerfile
# 1. Fase de Build
FROM node:20-alpine AS build

# Criar e definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar arquivos
COPY package*.json ./

# Instalar dependências
RUN npm install --omit=dev

# Copiar código
COPY . .

# CRÍTICO: Define a variável de ambiente PORT que o Node.js deve escutar (8080)
ENV PORT 8080 

# Comando de Execução: npm start executa node server.js
CMD [ "npm", "start" ]