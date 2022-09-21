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
        attributesArr.forEach((nodeObj, index) => {
          if (isCssBeforeSpreadChildProps(nodeObj, index)) {
            context.report({
              loc: {
              	line: nodeObj.loc.start.line,
                column: nodeObj.loc.start.column
              },
              message: 'CSS props must be declared before spread child props'
            });
          }
        });
      },
    };
    function isCssBeforeSpreadChildProps(nodeObj, index) {
      const regex = new RegExp('^(\...)?[a-z]*[A-Z][A-z]*');
      let spreadChildProps;
      
      const cssPropsIndex = attributesArr.map(attribute => {
        if (attribute.name && attribute.name.name) {
            return attribute.name.name
          }
      }).indexOf('css');
      
      const spreadChildPropsIndex = attributesArr.map(attribute => {
        if (attribute.type === 'JSXSpreadAttribute' && attribute.argument.name.match(regex)) {
			    spreadChildProps = attribute.argument.name;
			    return spreadChildProps;
        }
      }).indexOf(spreadChildProps);
      
      if (cssPropsIndex && spreadChildPropsIndex && spreadChildPropsIndex === index) {
        return cssPropsIndex > spreadChildPropsIndex
      }
    }
  },
};
