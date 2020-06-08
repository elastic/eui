module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce rel prop if href exists',
    },
  },
  create: function(context) {
    return {
      /**
       * Props of any component is defined in ArrowFunctions
       * Example: const EuiButton = ({ foo, bar }) => {};
       */
      ArrowFunctionExpression(node) {
        // Functional component contains only single argument
        if (node.params && node.params.length === 1) {
          // Extract object => { foo, bar }
          const objectPattern = node.params[0];

          if (objectPattern.properties && objectPattern.properties.length) {
            // Iterate each Object property to find href or rel
            let href = -1;
            let rel = -1;
            objectPattern.properties.forEach((property, index) => {
              if (property.key && property.key.name === 'href') href = index;
              if (property.key && property.key.name === 'rel') rel = index;
            });

            // Error => If href is preset and rel is not preset
            if (href !== -1 && rel === -1) {
              context.report({
                node: objectPattern.properties[href],
                message: 'Props must contain rel if href is defined',
              });
            }
          }
        }
      },
    };
  },
};
