import { PropTypes } from 'react-view';

export const simulateFunction = (prop = { custom: {} }) => {
  const newProp = {
    ...prop,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...prop.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };
  return newProp;
};
