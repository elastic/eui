# Derived from the zenato/puppeteer Docker image
# https://github.com/zenato/docker-puppeteer/blob/master/Dockerfile

# >=12.0 required (for cypress). v18 is LTS.
FROM --platform=linux/amd64 node:20.8.0-slim

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# See https://crbug.com/795759
RUN apt-get update \
    && apt-get install -yq libgconf-2-4 \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

# Install latest chrome package.
# Note: this installs the necessary libs to make the bundled version of Chromium that Pupppeteer
# installs, work.
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

# Install cypress so it's available in the container.
# RUN yarn global add cypress

# Add directories for Cypress and update permissions.
RUN mkdir -p /cypress/screenshots && chown -R node:node /cypress

# Run user as non privileged.
USER node

CMD ["google-chrome-stable"]
