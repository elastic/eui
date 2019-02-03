const babel = require('@babel/core');
const babelOptions = require('../../.babelrc');
const fs = require('fs');

const { basename, extname, resolve } = require('path');
const { readdir, stat } = require('fs').promises;


const folder = './src/components/';
const suffixes = ['.js', '.jsx', '.ts', '.tsx'];
// const filepath = './src/components/combo_box/combo_box_options_list/combo_box_options_list.js';

const tokenMapping = {};

function handleJSXPath(path) {
  if (path.node.name.name === "EuiI18n") {
    let token = path.node.attributes.filter(
      node => { return node.name.name === "token" }
    );
    let defString = path.node.attributes.filter(
      node => { return node.name.name === "default" }
    );

    try {
      token = token[0].value.value;
    } catch (e) {
      token = null;
    }
    try {
      defString = defString[0].value.value;
    } catch (e) {
      defString = null;
    }

    return {
      token, 
      defString
    };
  }
}

function traverseFile(filepath) {
  const source = fs.readFileSync(filepath);
  const ast = babel.parse(
    source,
    {
      ...babelOptions,
      filename: basename(filepath),
      ast: true
    }
  );

  babel.traverse(
    ast,
    {
      // Identifier(path) {
      //   console.log(path.name)
      // },
      JSXOpeningElement(path){
        if (path.node.name.name === "EuiI18n") {
          const {
            token, 
            defString
          } = handleJSXPath(path);
          if (token) {
            tokenMapping[token] = defString;
          }
        }
      }
    }
  );
  console.log(`DONE handling ${basename(filepath)}`)


}

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

(async () => {
  let files = await getFiles(folder);
  files = files.filter(filename => {
    return suffixes.indexOf(extname(filename)) > -1;
  }) 

  files.forEach(filename => {
    traverseFile(filename)
  })
  console.log(tokenMapping);
})();

// 