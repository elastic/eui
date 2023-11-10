const { execSync } = require('child_process');

execSync('docker pull docker.elastic.co/eui/ci:5.6', {
  stdio: 'inherit',
});
/* eslint-disable-next-line no-multi-str */
execSync(
  "docker run \
  -i --rm --cap-add=SYS_ADMIN --volume=$(pwd):/app --workdir=/app --platform=linux/amd64 \
  -e GIT_COMMITTER_NAME=test -e GIT_COMMITTER_EMAIL=test -e HOME=/tmp \
  --user=$(id -u):$(id -g) \
  docker.elastic.co/eui/ci:5.6 \
  bash -c '/opt/yarn*/bin/yarn \
    && yarn cypress install \
    && yarn run test-cypress-a11y \
      --node-options=--max_old_space_size=2048 \
      --skip-css '", // Skipping CSS because compiling has a tendency to hang on Apple Silicon
  {
    stdio: 'inherit',
  }
);
