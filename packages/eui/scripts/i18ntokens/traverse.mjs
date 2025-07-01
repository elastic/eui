import fs from 'node:fs/promises';
import path from 'node:path';
import babel from '@babel/core';
import * as glob from 'glob';

function getCodeForExpression(expressionNode) {
  return babel.transformFromAst(babel.types.program([
    babel.types.expressionStatement(
      babel.types.removeComments(babel.types.cloneDeep(expressionNode))
    )
  ])).code;
}

function handleHookPath(path) {
  const symbols = [];
  const args = path.node.arguments;

  if (args[0].type === 'ArrayExpression' && args[1].type === 'ArrayExpression') {
    const tokens = args[0].elements.map(({value}) => value);
    const defaults = args[1].elements.map(({value}) => value);
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

  if (args[0].type !== 'StringLiteral') return symbols;

  const token = args[0].value;
  const defStringNode = args[1];
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

async function traverseFile(filePath, rootDir, babelConfig, mappings) {
  const source = await fs.readFile(filePath, 'utf8');
  const ast = await babel.parseAsync(source.toString(), {
    ...babelConfig,
    filename: path.basename(filePath),
    ast: true,
  });

  babel.traverse(
    ast,
    {
      JSXOpeningElement(nodePath) {
        if (nodePath.node.name.name === 'EuiI18n') {
          const symbols = handleJSXPath(nodePath);
          for (let i = 0; i < symbols.length; i++) {
            mappings.push(
              { ...symbols[i], filepath: path.relative(rootDir, filePath) }
            );
          }
        }
      },
      CallExpression(nodePath) {
        if (nodePath.node.callee && nodePath.node.callee.type === 'Identifier' && nodePath.node.callee.name === 'useEuiI18n') {
          const symbols = handleHookPath(nodePath);
          for (let i = 0; i < symbols.length; i++) {
            mappings.push(
              { ...symbols[i], filepath: path.relative(rootDir, filePath) }
            );
          }
        }
      },
    }
  );
}

function validateMappings(mappings) {
  const validatedMappings = {};

  for (const { token, defString } of mappings) {
    if (Object.hasOwn(validatedMappings, token)) {
      if (validatedMappings[token] !== defString) {
        throw new Error(`Token ${token} has two differing defaults:\n${defString}\n${mappings[token]}`);
      }
    } else {
      validatedMappings[token] = defString;
    }
  }
}

export async function generateMappings(rootDir, babelConfig) {
  const srcDir = path.join(rootDir, 'src');
  const files = glob.globIterate('**/*.@(js|ts|tsx)', {
    cwd: srcDir,
    realpath: true,
    ignore: [
      '**/*.d.ts',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.test.js',
      '**/*.stories.ts',
      '**/*.stories.tsx',
    ],
  });

  const mappings = [];

  for await (const file of files) {
    const fullPath = path.join(srcDir, file);
    await traverseFile(fullPath, rootDir, babelConfig, mappings);
  }

  validateMappings(mappings);

  return mappings;
}
