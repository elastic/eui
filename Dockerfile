FROM node:20-alpine AS build-env
WORKDIR /app
COPY package.json yarn.lock ./
RUN chown node:node ./
USER node
RUN yarn install --frozen-lockfile

FROM build-env AS base
COPY --chown=node:node . ./
USER node
