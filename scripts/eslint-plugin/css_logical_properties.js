const logicals = require('../../src/global_styling/functions/logicals.json');
const logicalProperties = Object.keys(logicals);

const logicalValues = {
  'text-align: left': 'text-align: start',
  'text-align: right': 'text-align: end',
  // TODO: Consider adding float, clear, & resize as well
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
};

const logicalPropertiesRegex = logicalProperties.join('|');
const logicalValuesRegex = Object.keys(logicalValues).join('|');
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences
const regex = new RegExp(
  `^(?<whitespace>[\\s]*)((?<property>${logicalPropertiesRegex}):)|(?<value>${logicalValuesRegex})`,
  'gm'
);

const logicalsFixMap = { ...logicals, ...logicalValues };

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

          let match;
          while ((match = regex.exec(stringLiteral)) !== null) {
            const property = match.groups.property || match.groups.value;
            const whitespace = match.groups.whitespace?.length || 0;

            context.report({
              node,
              messageId: match.groups.value
                ? 'preferLogicalValue'
                : 'preferLogicalProperty',
              data: { property },
              fix: function (fixer) {
                const cssNodeStart = cssNode.range[0] + 1; // Account for "css`"
                const indexStart = cssNodeStart + match.index + whitespace;

                return fixer.replaceTextRange(
                  [indexStart, indexStart + property.length],
                  logicalsFixMap[property]
                );
              },
            });
          }
        });
      },
    };
  },
};
