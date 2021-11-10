module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent hard-coded copy in JSX tag children content',
    },
  },
  create: function(context) {
    return {
      /**
       * Props of any component is defined in ArrowFunctions
       * Example: const EuiButton = ({ foo, bar }) => {};
       */
      JSXElement(node) {
        /*
        context.report({
          node: objectPattern.properties[href],
          message: 'Props must contain rel if href is defined',
        });
         */
        const childrenAttribute = node.openingElement.attributes.find(({ name }) => name.name === 'children');

        let children = node.children.length > 0 ? node.children : childrenAttribute?.value;
        if (children == null) return; // nothing to validate

        if (Array.isArray(children)) {
          children.forEach(child => validateChild(context, child))
        } else {
          validateChild(context, children);
        }
      },
    };
  },
};

function validateChild(context, child) {
  switch (child.type) {
    // validate each item in the array
    case 'ArrayExpression':
      child.elements.forEach(element => validateChild(context, element));
      break;

    // always okay as a child
    case 'JSXElement':
      break;

    // validate its expression
    case 'JSXExpressionContainer':
      validateChild(context, child.expression);
      break;

    // literals are prevented
    case 'Literal':
      context.report({
        node: child,
        message: 'Literal values are not allowed as JSX children',
      });
      break;

    // fail on unknown types
    default:
      context.report({
        node: child,
        message: `Unable to process JSX child of type "${child.type}"`,
      });
      break;
  }
}
