module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce display name on components wrapped in forwardRef & memo',
    },
  },
  create: function (context) {
    const usagesToCheck = [];
    const displayNameUsages = [];
    return {
      VariableDeclarator(node) {
        if (node.init && node.init.type === 'CallExpression') {
          if (
            node.init.callee &&
            node.init.callee.type === 'MemberExpression'
          ) {
            if (
              node.init.callee.property?.name === 'forwardRef' ||
              node.init.callee.property?.name === 'memo'
            ) {
              usagesToCheck.push({
                id: node.id,
                type: node.init.callee.property.name,
              });
            }
          }
          if (
            node.init.callee?.name === 'forwardRef' ||
            node.init.callee?.name === 'memo'
          ) {
            usagesToCheck.push({ id: node.id, type: node.init.callee.name });
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
        usagesToCheck.forEach(({ id, type }) => {
          if (!isDisplayNameUsed(id)) {
            context.report({
              node: id,
              message: `Components wrapped in React.${type} must set a manual displayName`,
            });
          }
        });
      },
    };
    function isDisplayNameUsed(identifier) {
      const node = displayNameUsages.find(
        (displayName) => displayName.name === identifier.name
      );
      return !!node;
    }
  },
};
