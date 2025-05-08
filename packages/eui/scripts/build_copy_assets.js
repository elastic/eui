const { copyFile: copyFilePromise } = require('fs/promises');

const chalk = require('chalk');

const copyFile = async (source, destination) => {
  await copyFilePromise(source, destination);
  console.log(
    chalk`{green ✔} Copied {gray ${source}} to {gray ${destination}}`
  );
};

const copyFiles = () => Promise.all([
  copyFile('src/themes/json/eui_theme_amsterdam_dark.json', 'dist/eui_theme_amsterdam_dark.json'),
  copyFile('src/themes/json/eui_theme_amsterdam_dark.json.d.ts', 'dist/eui_theme_amsterdam_dark.json.d.ts'),

  copyFile('src/themes/json/eui_theme_amsterdam_light.json', 'dist/eui_theme_amsterdam_light.json'),
  copyFile('src/themes/json/eui_theme_amsterdam_light.json.d.ts', 'dist/eui_theme_amsterdam_light.json.d.ts'),

  /* TODO: temp files only, remove once imports from theme package work as expected */
  copyFile('src/themes/json/eui_theme_borealis_dark.json', 'dist/eui_theme_borealis_dark.json'),
  copyFile('src/themes/json/eui_theme_borealis_dark.json.d.ts', 'dist/eui_theme_borealis_dark.json.d.ts'),

  copyFile('src/themes/json/eui_theme_borealis_light.json', 'dist/eui_theme_borealis_light.json'),
  copyFile('src/themes/json/eui_theme_borealis_light.json.d.ts', 'dist/eui_theme_borealis_light.json.d.ts'),
]);

copyFiles().catch((err) => {
  console.error('Failed to copy assets');
  console.error(err);
  process.exit(1);
});
