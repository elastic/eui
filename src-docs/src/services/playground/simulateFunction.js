import { PropTypes } from 'react-view';

export const simulateFunction = (
  prop = { custom: {} },
  defaultValue = false
) => {
  const newProp = {
    ...prop,
    type: PropTypes.Custom,
    value: defaultValue,
    custom: {
      ...prop.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };
  return newProp;
};
