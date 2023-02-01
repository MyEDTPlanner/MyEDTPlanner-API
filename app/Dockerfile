FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
# Définir les variables d'environnement pour l'application
 
# Exposer le port sur lequel l'application s'exécute
CMD [ "node","app.js" ]
EXPOSE 2000
