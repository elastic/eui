module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce CSS props are declared before spread props',
    },
  },
  create: function(context) {
    const allElementsArr = [];

    return {
      JSXElement(node) {
        const tempArr = [];
        node.openingElement.attributes.forEach(attribute => tempArr.push(attribute));
        allElementsArr.push(tempArr);
      },
      'Program:exit'() {
        allElementsArr.forEach(elementArr => {
          const regex = new RegExp('^(\{\.\.\.).+\}$');
          const cssPropsIndex = elementArr.findIndex(node => (node.name && node.name.name === 'css'));
          const spreadPropsIndex = elementArr.findIndex(node => (node.type === 'JSXSpreadAttribute'));

          if (cssPropsIndex === -1) {
            return;
          }

          if (spreadPropsIndex === -1) {
            return;
          }

          if (cssPropsIndex > spreadPropsIndex) { 
            context.report({
              loc: {
                line: elementArr[cssPropsIndex].loc.start.line,
                column: elementArr[cssPropsIndex].loc.start.column
              },
              message: '{{ identifier }}: CSS props must be declared before spread props.',
              data: {
                identifier: elementArr[spreadPropsIndex].argument.name
              },
            });
          }
        });
      },
    };
  },
};
