// Enforce EuiI18n token names & variable names in render prop

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

function attributesArrayToLookup(attributesArray) {
  return attributesArray.reduce(
    (lookup, attribute) => {
      lookup[attribute.name.name] = attribute.value;
      return lookup;
    },
    {}
  );
}

function getDefinedValues(valuesNode) {
  if (valuesNode == null || valuesNode.expression.properties == null) return new Set();
  return valuesNode.expression.properties.reduce(
    (valueNames, property) => {
      valueNames.add(property.key.name);
      return valueNames;
    },
    new Set()
  );
}

function formatSet(set) {
  return Array.from(set).sort().join(', ');
}

function getExpectedValueNames(defaultString) {
  const matches = defaultString.match(/{([a-zA-Z0-9_-]+)}/g);
  const expectedNames = new Set();

  if (matches) {
    matches.forEach(match => {
      expectedNames.add(match.substring(1, match.length - 1));
    });
  }

  return expectedNames;
}

function areSetsEqual(set1, set2) {
  if (set1.size !== set2.size) return false;
  const entries = Array.from(set1);
  for (let i = 0; i < entries.length; i++) {
    if (set2.has(entries[i]) === false) return false;
  }
  return true;
}

function getRenderPropFromChildren(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === 'JSXExpressionContainer' && child.expression.type === 'ArrowFunctionExpression') {
        return child.expression;
      }
    }
  } else {
    if (children.type === 'JSXExpressionContainer' && children.expression.type === 'ArrowFunctionExpression') {
      return children.expression;
    }
  }
}

function getExpectedParamNameFromToken(tokenValue) {
  const tokenParts = tokenValue.split(/\./g);
  return tokenParts[tokenParts.length - 1];
}

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce EuiI18n token names & variable names in render prop',
    },

    messages: {
      invalidToken: 'token value "{{ tokenValue }}" must be of format {{ tokenNamespace }}.tokenName',
      mismatchedValues: 'expected values "{{ expected }}" but provided {{ provided }}',
      mismatchedTokensAndDefaults: 'given {{ tokenLength }} tokens but {{ defaultsLength }} defaults',
      tokenNamesNotUsedInRenderProp: 'tokens {{ tokenNames }} is not used by render prop params {{ paramNames }}',
      invalidTokenType: 'token expects a string value, {{ type }} passed instead',
      invalidTokensType: 'tokens expects an array of strings, {{ type }} passed instead',
      invalidDefaultType: 'default expects a string or arrow function, {{ type }} passed instead',
      invalidDefaultsType: 'defaults expects an array of strings or arrow functions, {{ type }} passed instead',
    },
  },
  create: function (context) {
    const filename = context.getFilename();
    const basename = path.basename(filename, path.extname(filename));
    const expectedTokenNamespace = `eui${basename.replace(/(^|_)([a-z])/g, (match, leading, char) => char.toUpperCase())}`;

    return {
      JSXOpeningElement(node) {
        // only process <EuiI8n/> elements
        if (node.name.type !== 'JSXIdentifier' || node.name.name !== 'EuiI18n') return;

        const jsxElement = node.parent;
        const hasRenderProp = jsxElement.children.length > 0;

        const attributes = attributesArrayToLookup(node.attributes);

        // validate attribute types
        if (attributes.hasOwnProperty('token')) {
          // `token` must be a Literal
          if (attributes.token.type !== 'Literal') {
            context.report({
              node,
              loc: attributes.token.loc,
              messageId: 'invalidTokenType',
              data: { type: attributes.token.type }
            });
            return;
          }
        }

        if (attributes.hasOwnProperty('default')) {
          // default must be either a Literal of an ArrowFunctionExpression
          const isLiteral = attributes.default.type === 'Literal';
          const isArrowExpression =
            attributes.default.type === 'JSXExpressionContainer' &&
            attributes.default.expression.type === 'ArrowFunctionExpression';
          if (!isLiteral && !isArrowExpression) {
            context.report({
              node,
              loc: attributes.default.loc,
              messageId: 'invalidDefaultType',
              data: { type: attributes.default.expression.type }
            });
            return;
          }
        }

        if (attributes.hasOwnProperty('tokens')) {
          // tokens must be an array of Literals
          if (attributes.tokens.type !== 'JSXExpressionContainer') {
            context.report({
              node,
              loc: attributes.tokens.loc,
              messageId: 'invalidTokensType',
              data: { type: attributes.tokens.type }
            });
            return;
          }

          if (attributes.tokens.expression.type !== 'ArrayExpression') {
            context.report({
              node,
              loc: attributes.tokens.loc,
              messageId: 'invalidTokensType',
              data: { type: attributes.tokens.expression.type }
            });
            return;
          }

          for (let i = 0; i < attributes.tokens.expression.elements.length; i++) {
            const tokenNode = attributes.tokens.expression.elements[i];
            if (tokenNode.type !== 'Literal' || typeof tokenNode.value !== 'string') {
              context.report({
                node,
                loc: tokenNode.loc,
                messageId: 'invalidTokensType',
                data: { type: tokenNode.type }
              });
              return;
            }
          }
        }

        if (attributes.hasOwnProperty('defaults')) {
          // defaults must be an array of either Literals or ArrowFunctionExpressions
          if (attributes.defaults.type !== 'JSXExpressionContainer') {
            context.report({
              node,
              loc: attributes.defaults.loc,
              messageId: 'invalidDefaultsType',
              data: { type: attributes.defaults.type }
            });
            return;
          }

          if (attributes.defaults.expression.type !== 'ArrayExpression') {
            context.report({
              node,
              loc: attributes.defaults.loc,
              messageId: 'invalidDefaultsType',
              data: { type: attributes.defaults.expression.type }
            });
            return;
          }

          for (let i = 0; i < attributes.defaults.expression.elements.length; i++) {
            const defaultNode = attributes.defaults.expression.elements[i];
            if (defaultNode.type !== 'Literal' || typeof defaultNode.value !== 'string') {
              console.log('::', defaultNode.value, typeof defaultNode.value);
              context.report({
                node,
                loc: defaultNode.loc,
                messageId: 'invalidDefaultsType',
                data: { type: defaultNode.type }
              });
              return;
            }
          }
        }

        const hasMultipleTokens = attributes.hasOwnProperty('tokens');

        if (!hasMultipleTokens) {
          // validate token format
          const tokenParts = attributes.token.value.split('.');
          if (tokenParts.length <= 1 || tokenParts[0] !== expectedTokenNamespace) {
            context.report({
              node,
              loc: attributes.token.loc,
              messageId: 'invalidToken',
              data: { tokenValue: attributes.token.value, tokenNamespace: expectedTokenNamespace }
            });
          }

          // validate default string interpolation matches values
          const valueNames = getDefinedValues(attributes.values);

          if (attributes.default.type === 'Literal') {
            // default is a string literal
            const expectedNames = getExpectedValueNames(attributes.default.value);
            if (areSetsEqual(expectedNames, valueNames) === false) {
              context.report({
                node,
                loc: attributes.values.loc,
                messageId: 'mismatchedValues',
                data: { expected: formatSet(expectedNames), provided: formatSet(valueNames) }
              });
            }
          } else {
            // default is a function
            // validate the destructured param defined by default function match the values
            const defaultFn = attributes.default.expression;
            const objProperties = defaultFn.params && defaultFn.params[0] ? defaultFn.params[0].properties : [];
            const expectedNames = new Set(objProperties.map(property => property.key.name));
            if (areSetsEqual(valueNames, expectedNames) === false) {
              context.report({
                node,
                loc: attributes.values.loc,
                messageId: 'mismatchedValues',
                data: { expected: formatSet(expectedNames), provided: formatSet(valueNames) }
              });
            }
          }
        } else {
          // has multiple tokens
          // validate their names
          const tokens = attributes.tokens.expression.elements;
          for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const tokenParts = token.value.split('.');
            if (tokenParts.length <= 1 || tokenParts[0] !== expectedTokenNamespace) {
              context.report({
                node,
                loc: token.loc,
                messageId: 'invalidToken',
                data: { tokenValue: token.value, tokenNamespace: expectedTokenNamespace }
              });
            }
          }

          // validate the number of tokens equals the number of defaults
          const defaults = attributes.defaults.expression.elements;
          if (tokens.length !== defaults.length) {
            context.report({
              node,
              loc: node.loc,
              messageId: 'mismatchedTokensAndDefaults',
              data: { tokenLength: tokens.length, defaultsLength: defaults.length }
            });
          }
        }

        if (hasRenderProp) {
          // validate the render prop
          const renderProp = getRenderPropFromChildren(jsxElement.children);

          if (hasMultipleTokens) {
            // multiple tokens, verify each token matches an array-destructured param
            const params = renderProp.params[0].elements;
            const tokens = attributes.tokens.expression.elements;

            const paramsSet = new Set(params.map(element => element.name));
            const tokensSet = new Set(tokens.map(element => getExpectedParamNameFromToken(element.value)));

            if (areSetsEqual(paramsSet, tokensSet) === false) {
              context.report({
                node,
                loc: node.loc,
                messageId: 'tokenNamesNotUsedInRenderProp',
                data: { tokenNames: formatSet(tokensSet), paramNames: formatSet(paramsSet) }
              });
            }

          } else {
            // single token, single param should be a matching identifier
            const param = renderProp.params[0];
            const tokenName = getExpectedParamNameFromToken(attributes.token.value);
            const paramName = param.name;

            if (tokenName !== paramName) {
              context.report({
                node,
                loc: node.loc,
                messageId: 'tokenNamesNotUsedInRenderProp',
                data: { tokenNames: tokenName, paramNames: paramName }
              });
            }
          }
        }

        // debugger;
      }
      // callback functions
    };
  }
};
