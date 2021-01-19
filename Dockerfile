FROM node:15.4.0-slim as build

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run lint \
  && npm run build


# Here we can write an additional command that can deploy the app