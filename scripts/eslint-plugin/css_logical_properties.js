module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce using CSS logical properties in our Emotion CSS',
    },
    messages: {
      preferLogicalProperty:
        'Prefer the CSS logical property for {{ property }} - @see src/global_styling/functions/logicals.ts',
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

          const propertiesToFlag = {
            // sizing - catches min/max as well
            width: 'width:',
            height: /(?<!line-)height:/,
            // positioning - catches padding/margin/border sides as well
            top: 'top:',
            right: 'right:',
            bottom: 'bottom:',
            left: 'left:',
            // border side specific properties
            'border sides': /border-(top|right|bottom|left)-(color|style|width):/,
            // text-align
            'text-align left': 'text-align: left',
            'text-align right': 'text-align: right',
            // overflow
            'overflow-x': 'overflow-x:',
            'overflow-y': 'overflow-y:',
          };
          const properties = Object.values(propertiesToFlag);
          const propertyNames = Object.keys(propertiesToFlag);

          for (let i = 0; i < properties.length; i++) {
            const property = properties[i];

            if (typeof property === 'string') {
              if (stringLiteral.includes(property)) {
                context.report({
                  node,
                  messageId: 'preferLogicalProperty',
                  data: { property: propertyNames[i] },
                });
              }
            } else {
              if (stringLiteral.match(property)) {
                context.report({
                  node,
                  messageId: 'preferLogicalProperty',
                  data: { property: propertyNames[i] },
                });
              }
            }
          }
        });
      },
    };
  },
};
