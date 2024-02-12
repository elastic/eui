const componentNames = ['EuiButton', 'EuiButtonEmpty', 'EuiLink', 'EuiBadge'];

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
            `<${node.name.name}> supplied with both \`href\` and \`onClick\`; is this intentional? (Valid use cases include programmatic navigation via \`onClick\` while preserving "Open in new tab" style functionality via \`href\`.)`
          );
        }
      },
    };
  },
};
