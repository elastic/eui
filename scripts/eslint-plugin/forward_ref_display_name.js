module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce display name to forwardRef components',
    },
  },
  create: function(context) {
    const forwardRefUsages = [];
    const displayNameUsages = [];
    return {
      VariableDeclarator(node) {
        if (node.init && node.init.type === 'CallExpression') {
          if (
            node.init.callee &&
            node.init.callee.type === 'MemberExpression'
          ) {
            if (
              node.init.callee.property &&
              node.init.callee.property.name === 'forwardRef'
            ) {
              forwardRefUsages.push(node.id);
            }
          }
          if (node.init.callee && node.init.callee.name === 'forwardRef') {
            forwardRefUsages.push(node.id);
          }
        }
      },
      MemberExpression(node) {
        const { property } = node;
        if (
          property &&
          property.type === 'Identifier' &&
          property.name === 'displayName'
        ) {
          displayNameUsages.push(node.object);
        }
      },
      'Program:exit'() {
        forwardRefUsages.forEach(identifier => {
          if (!isDisplayNameUsed(identifier)) {
            context.report({
              node: identifier,
              message: 'Forward ref components must use a display name',
            });
          }
        });
      },
    };
    function isDisplayNameUsed(identifier) {
      const node = displayNameUsages.find(
        displayName => displayName.name === identifier.name
      );
      return !!node;
    }
  },
};
