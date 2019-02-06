const babel = require('@babel/core');
const babelOptions = require('../../.babelrc');
const fs = require('fs');
const { promisify } = require('util');
const { basename, join, relative } = require('path');
const glob = require('glob');
const asyncGlob = promisify(glob);

const rootDir = join(__dirname, '..', '..');
const srcDir = join(rootDir, 'src');

const tokenMappings = [];

function getCodeForExpression(expressionNode) {
  return babel.transformFromAst(babel.types.program([
    babel.types.expressionStatement(
      babel.types.removeComments(babel.types.cloneDeep(expressionNode))
    )
  ])).code;
}

function handleJSXPath(path) {
  if (path.node.name.name === 'EuiI18n') {
    const symbols = [];

    const attributes = path.node.attributes.reduce(
      (attributes, node) => {
        attributes[node.name.name] = node.value;
        return attributes;
      },
      {}
    );

    if (attributes.hasOwnProperty('token') && attributes.hasOwnProperty('default')) {
      const tokenNode = attributes.token;
      const defStringNode = attributes.default;

      let defString;
      let highlighting;
      if (defStringNode.type === 'StringLiteral') {
        defString = defStringNode.value;
        highlighting = 'string';
      } else if (defStringNode.type === 'JSXExpressionContainer') {
        defString = getCodeForExpression(defStringNode.expression);
        highlighting = 'code';
      }
      symbols.push({
        token: tokenNode.value,
        defString,
        highlighting,
        loc: path.node.loc
      });
    }

    return symbols;
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
      JSXOpeningElement(path) {
        if (path.node.name.name === 'EuiI18n') {
          const symbols = handleJSXPath(path);
          for (let i = 0; i < symbols.length; i++) {
            tokenMappings.push(
              { ...symbols[i], filepath: relative(rootDir, filepath) }
            );
          }
        }
      }
    }
  );
}

(async () => {
  const files = (await asyncGlob(
    '**/*.@(js|ts|tsx)',
    { cwd: srcDir, realpath: true },
  )).filter(filepath => {
    if (filepath.endsWith('index.d.ts')) return false;
    if (filepath.endsWith('test.ts')) return false;
    if (filepath.endsWith('test.tsx')) return false;
    if (filepath.endsWith('test.js')) return false;

    return true;
  });

  // extract tokens from source files
  files.forEach(filename => traverseFile(filename));

  // validate tokens
  tokenMappings.reduce(
    (mappings, symbol) => {
      const { token, defString } = symbol;

      if (mappings.hasOwnProperty(token)) {
        if (mappings[token] !== defString) {
          console.error(`Token ${token} has two differing defaults:\n${defString}\n${mappings[token]}`);
          process.exit(1);
        }
      } else {
        mappings[token] = defString;
      }

      return mappings;
    },
    {}
  );

  fs.writeFileSync(
    join(rootDir, 'src-docs', 'src', 'i18ntokens.json'),
    JSON.stringify(tokenMappings, null, 2)
  );
})();
