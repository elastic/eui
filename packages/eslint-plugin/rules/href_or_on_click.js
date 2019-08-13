const componentNames = ['EuiButton', 'EuiButtonEmpty', 'EuiLink'];

module.exports = {
  meta: {
    fixable: null,
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (
          node.name.type !== 'JSXIdentifier' ||
          !componentNames.includes(node.name.name)
        ) {
          return;
        }

        const hasHref = node.attributes.some(
          attr => attr.type === 'JSXAttribute' && attr.name.name === 'href'
        );
        const hasOnClick = node.attributes.some(
          attr => attr.type === 'JSXAttribute' && attr.name.name === 'onClick'
        );

        if (hasHref && hasOnClick) {
          context.report(
            node,
            `<${
              node.name.name
            }> accepts either \`href\` or \`onClick\`, not both.`
          );
        }
      },
    };
  },
};
