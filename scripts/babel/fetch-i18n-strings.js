const babel = require('@babel/core');
const babelOptions = require('../../.babelrc');
const fs = require('fs');
const { promisify } = require('util');
const { basename, join, relative } = require('path');
const glob = require('glob');

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

function handleHookPath(path) {
  const symbols = [];

  const arguments = path.node.arguments;

  if (arguments[0].type === 'ArrayExpression' && arguments[1].type === 'ArrayExpression') {
    const tokens = arguments[0].elements.map(({value}) => value);
    const defaults = arguments[1].elements.map(({value}) => value);
    const highlighting = 'string';
    tokens.forEach((token, i) => {
      symbols.push({
        token,
        defString: defaults[i],
        highlighting,
        loc: path.node.loc,
      });
    });
    return symbols;
  }

  if (arguments[0].type !== 'StringLiteral') return symbols;

  const token = arguments[0].value;
  const defStringNode = arguments[1];
  let defString;
  let highlighting;

  if (defStringNode.type === 'StringLiteral') {
    defString = defStringNode.value;
    highlighting = 'string';
  } else if (defStringNode.type === 'ArrowFunctionExpression') {
    defString = getCodeForExpression(defStringNode);
    highlighting = 'code';
  }

  symbols.push({
    token,
    defString,
    highlighting,
    loc: path.node.loc,
  });

  return symbols;
}

function handleJSXPath(path) {
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
  } else if (attributes.hasOwnProperty('tokens') && attributes.hasOwnProperty('defaults')) {
    const tokensNode = attributes.tokens;
    const defsStringNode = attributes.defaults;
    const tokensString = getCodeForExpression(tokensNode.expression);
    const defsString = getCodeForExpression(defsStringNode.expression);
    const highlighting = 'string';
    try {
      const tokens = eval(tokensString);
      const defs = eval(defsString);
      tokens.forEach((token, i) => {
        symbols.push({
          token: token,
          defString: defs[i],
          highlighting,
          loc: path.node.loc
        });
      });
    } catch (e) {
      console.error(`Unable to parse JSX expression tokens:\n${tokensString}\ndefaults:\n${defsString}\n`);
      process.exit(1);
    }
  }

  return symbols;
}

function traverseFile(filepath) {
  const source = fs.readFileSync(filepath);
  const ast = babel.parse(
    source.toString(),
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
      },
      CallExpression(path) {
        if (path.node.callee && path.node.callee.type === 'Identifier' && path.node.callee.name === 'useEuiI18n') {
          const symbols = handleHookPath(path);
          for (let i = 0; i < symbols.length; i++) {
            tokenMappings.push(
              { ...symbols[i], filepath: relative(rootDir, filepath) }
            );
          }
        }
      },
    }
  );
}

const files = glob.sync(
  '**/*.@(js|ts|tsx)',
  { cwd: srcDir, realpath: true },
).filter(filepath => {
  if (filepath.endsWith('.d.ts')) return false;
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
  join(rootDir, 'i18ntokens.json'),
  JSON.stringify(tokenMappings, null, 2)
);
