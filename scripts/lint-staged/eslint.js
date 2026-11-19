const path = require('path');

/**
 * Creates a lint-staged task that runs `eslint --fix` on staged files,
 * using the ESLint install and config of the workspace at `cwd`.
 *
 * ESLint warns about explicitly passed files that match `.eslintignore`,
 * which fails `--max-warnings 0`, so ignored files are filtered out first.
 */
const eslintTask = (cwd, args = []) => {
  const { ESLint } = require(require.resolve('eslint', { paths: [cwd] }));
  const eslint = new ESLint({ cwd });

  return async (files) => {
    let ignored;
    try {
      ignored = await Promise.all(
        files.map((file) => eslint.isPathIgnored(file))
      );
    } catch (error) {
      if (
        error.code === 'MODULE_NOT_FOUND' &&
        /@elastic[\\/]eslint-plugin-eui[\\/]/.test(error.message)
      ) {
        error.message +=
          '\n\nRun `yarn workspace @elastic/eui build:workspaces` first.';
      }
      throw error;
    }
    const lintable = files.filter((_, index) => !ignored[index]);

    if (!lintable.length) return [];

    const fileArgs = lintable.map((file) =>
      JSON.stringify(path.relative(cwd, file).split(path.sep).join('/'))
    );

    return `eslint --fix ${[...args, ...fileArgs].join(' ')}`;
  };
};

module.exports = { eslintTask };
