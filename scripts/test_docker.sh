#!/bin/bash

docker pull zenato/puppeteer
docker run -i --rm --cap-add=SYS_ADMIN --volume $PWD:/app --workdir /app \
    -e GIT_COMMITTER_NAME=test -e GIT_COMMITTER_EMAIL=test -e HOME=/tmp \
    zenato/puppeteer \
    bash -c 'npm config set spin false && /opt/yarn*/bin/yarn && npm run test && npm run start-test-server-and-a11y-test && npm run build'
