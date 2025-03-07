const { exec } = require('child_process');

const DIRECTORIES = ['**/node_modules', '**/lib', '**/dist', '**/es'];

(async () => {
  try {
    const promises = DIRECTORIES.map(
      (dir) =>
        new Promise((resolve, reject) => {
          exec(`npx rimraf ${dir}`, (err) => {
            if (err) {
              reject(`Error removing ${dir}`);
            } else {
              resolve(`Successfully removed ${dir}`);
            }
          });
        })
    );

    const results = await Promise.all(promises);
    results.forEach((result) => console.log(result));
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();
