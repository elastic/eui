import { rimraf } from 'rimraf';

const DIRECTORIES = ['**/node_modules', '**/lib', '**/dist', '**/es'];

try {
  const promises = DIRECTORIES.map((dir) =>
    rimraf(dir, { glob: true }).then(() =>
      console.log(`Successfully removed ${dir}`)
    )
  );
  await Promise.all(promises);
} catch (error) {
  console.error(`Error: ${error}`);
}
