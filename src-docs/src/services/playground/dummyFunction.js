import * as t from '@babel/types';

export const dummyFunction = {
  generate: (val) => {
    if (!val) return null;
    const obj = t.arrowFunctionExpression([], t.blockStatement([]), false);
    return obj;
  },
};
