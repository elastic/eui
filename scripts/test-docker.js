const { execSync } = require('child_process');

execSync('docker pull docker.elastic.co/eui/puppeteer:latest', {
  stdio: 'inherit',
});
/* eslint-disable-next-line no-multi-str */
execSync("docker run \
  -i --rm --cap-add=SYS_ADMIN --volume=$(pwd):/app --workdir=/app \
  -e GIT_COMMITTER_NAME=test -e GIT_COMMITTER_EMAIL=test -e HOME=/tmp \
  --user=$(id -u):$(id -g) \
  docker.elastic.co/eui/puppeteer:latest \
  bash -c 'npm config set spin false \
    && /opt/yarn*/bin/yarn \
    && npm run test \
    && npm run start-test-server-and-a11y-test \
    && npm run build'", {
  stdio: 'inherit',
});
