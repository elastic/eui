const logicals = require('../../src/global_styling/functions/logicals.json');
const logicalProperties = Object.keys(logicals);

const logicalValues = {
  'text-align: left': 'text-align: start',
  'text-align: right': 'text-align: end',
  // TODO: Consider adding float, clear, & resize as well
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
};

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce using CSS logical properties in our Emotion CSS',
    },
    messages: {
      preferLogicalProperty:
        'Prefer the CSS logical property for {{ property }} - @see src/global_styling/functions/logicals.ts',
      preferLogicalValue:
        'Prefer the CSS logical value for {{ property }} - @see src/global_styling/functions/logicals.ts',
    },
    fixable: 'code',
  },
  create: function (context) {
    return {
      TaggedTemplateExpression(node) {
        if (node.tag?.name !== 'css') return; // We only want to check Emotion css`` template literals

        const templateContents = node.quasi?.quasis || [];
        templateContents.forEach((cssNode) => {
          const stringLiteral = cssNode?.value?.raw;
          if (!stringLiteral) return;

          Object.keys(logicalValues).forEach((value) => {
            const regex = new RegExp(`^[\\s]*${value}`, 'gm');
            if (stringLiteral.match(regex)) {
              context.report({
                node,
                messageId: 'preferLogicalValue',
                data: { property: logicalValues[value] },
              });
            }
          });
          logicalProperties.forEach((property) => {
            const regex = new RegExp(`^[\\s]*${property}:`, 'gm');
            if (stringLiteral.match(regex)) {
              context.report({
                node,
                messageId: 'preferLogicalProperty',
                data: { property: logicals[property] },
              });
            }
          });
        });
      },
    };
  },
};
