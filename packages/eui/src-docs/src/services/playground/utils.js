import template from '@babel/template';

export const generateAst = (value) => {
  return template.ast(String(value), { plugins: ['jsx'] }).expression;
};

export const generateCustomProps = (props) => {
  return props.reduce((obj, item) => {
    return {
      ...obj,
      [item]: {
        generate: generateAst,
      },
    };
  }, {});
};
