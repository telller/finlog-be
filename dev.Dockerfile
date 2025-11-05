###################
# BUILD FOR LOCAL DEV
###################

FROM node:22-alpine AS dev

WORKDIR /src

COPY package*.json ./

CMD [ "npm", "install" ]

WORKDIR /src/dev

CMD [ "npm", "run", "start:dev" ]