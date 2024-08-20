# Derived from the zenato/puppeteer Docker image
# https://github.com/zenato/docker-puppeteer/blob/master/Dockerfile

# >=12.0 required (for cypress). v18 is LTS.
FROM --platform=linux/amd64 node:20.15.1-slim

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# See https://crbug.com/795759
RUN apt-get update \
    && apt-get install -yq libgconf-2-4 \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

# Install latest chrome package and update libs
RUN apt-get update \
    && apt-get install -y wget xvfb ca-certificates gnupg \
    --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    --no-install-recommends \
    && apt-get upgrade -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

# Add node user to audio and video groups to enable Cypress video
# See https://wiki.debian.org/SystemGroups
# Add directory for Cypress to write screenshots and videos
RUN usermod -a -G audio,video node \
    && mkdir -p /cypress/screenshots \
    && mkdir -p /cypress/videos \
    && chown -R node:node /cypress

# Run as non-privileged node user for improved security
# See https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
USER node

CMD ["google-chrome-stable"]
