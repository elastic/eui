FROM node:20-alpine AS build-env
WORKDIR /app
# Buildkite needs bash for environment setup script
RUN apk add --no-cache bash
COPY package.json yarn.lock ./
RUN chown node:node ./
USER node
RUN yarn install --frozen-lockfile

FROM build-env AS base
USER node
# Copy remaining data during this step so dependant targets that don't require
# the built package can run without waiting for the base target to build.
COPY --chown=node:node . ./
