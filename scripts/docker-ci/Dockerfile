# Derived from the zenato/puppeteer Docker image
# https://github.com/zenato/docker-puppeteer/blob/master/Dockerfile

# >=12.0 required (for cypress). v18 is LTS.
FROM --platform=linux/amd64 node:18.17.1-slim

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

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
# browser.launch({executablePath: 'google-chrome-unstable'})
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install puppeteer & cypress so they are available in the container.
RUN yarn add puppeteer
RUN yarn global add cypress

# Add puppeteer user (pptruser).
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && mkdir -p /cypress/screenshots \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /node_modules \
    && chown -R pptruser:pptruser /cypress

# Run user as non privileged.
USER pptruser

CMD ["google-chrome-stable"]
