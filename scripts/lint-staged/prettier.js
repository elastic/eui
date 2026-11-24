const path = require('path');

/**
 * lint-staged task that runs `prettier --write` with the root `.prettierignore`.
 *
 * Prettier only reads `.prettierignore` from its working directory, and
 * workspace tasks run from the workspace.
 */
const prettierTask = `prettier --write --ignore-path ${JSON.stringify(
  path.resolve(__dirname, '../../.prettierignore')
)}`;

module.exports = { prettierTask };
