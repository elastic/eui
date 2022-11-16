# Derived from the zenato/puppeteer Docker image
# https://github.com/zenato/docker-puppeteer/blob/master/Dockerfile

# >=12.0 required (for cypress), but latest right now is 16.18.1
FROM node:16.18.1

# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

# Install latest chrome package.
# Note: this installs the necessary libs to make the bundled version of Chromium that Pupppeteer
# installs, work.
RUN apt-get update && apt-get install -y wget xvfb --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-unstable'})
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
