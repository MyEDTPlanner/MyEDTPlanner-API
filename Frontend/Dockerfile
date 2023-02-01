FROM node:18-alpine AS build

#COPY . .
WORKDIR /src

RUN apk update && apk add curl && apk add unzip
RUN curl -LJO https://github.com/MyEDTPlanner/MyEDTScrapper-Front/archive/master.zip
RUN unzip MyEDTScrapper-Front-main.zip 
RUN rm MyEDTScrapper-Front-main.zip
RUN mv MyEDTScrapper-Front-main/* .
RUN npm install
# Définir les variables d'environnement pour l'application
 
# Exposer le port sur lequel l'application s'exécute
CMD [ "npm","start" ]
EXPOSE 2000