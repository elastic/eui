module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce Emotion CSS props are declared before spread child props',
    },
  },
  create: function(context) {
    const attributesArr = [];

    return {
      JSXOpeningElement(node) {
        if(node.attributes) {
          node.attributes.forEach(attribute => {
            attributesArr.push(attribute);
          });
        }
      },
      'Program:exit'() {
        attributesArr.forEach((node, index) => {
          if (!isCssBeforeSpreadChildProps(node, index)) {
            context.report({
              loc: {
              	line: node.loc.start.line,
                column: node.loc.start.column
              },
              message: 'CSS props must be declared before spread child props'
            });
          }
        });
      },
    };
    function isCssBeforeSpreadChildProps(_, index) {
      const regex = new RegExp('^(\...)?[a-z]*[A-Z][A-z]*');
      const cssPropsIndex = attributesArr.findIndex(node => (node.name && node.name.name === 'css'));
      const spreadChildPropsIndex = attributesArr.findIndex(node => (node.type === 'JSXSpreadAttribute' && node.argument.name.match(regex)));
      
      // We're only checking if we have CSS props and spread child props
      // The third check ensures the rule fires only on the spread child props line
      if (cssPropsIndex && spreadChildPropsIndex && spreadChildPropsIndex === index) { 
        return cssPropsIndex < spreadChildPropsIndex
      }
      
      // Otherwise we don't have CSS props and/or spread child props
      return true;
    }
  },
};
