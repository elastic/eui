const { execSync } = require('child_process');
const shell = require('shelljs');
const glob = require('glob');

shell.mkdir('dist');

glob('./src/theme_*.scss', undefined, (error, files) => {
  files.forEach(file => {
    const splitPath = file.split('/');
    const fileName = splitPath[splitPath.length - 1];
    const splitFileName = fileName.split('.');
    const baseFileName = splitFileName[0];
    execSync(`node-sass ${file} > "dist/eui_${baseFileName}.css"`);
    execSync(`postcss --replace --config src-docs/postcss.config.js "dist/eui_${baseFileName}.css"`);
  });
});
