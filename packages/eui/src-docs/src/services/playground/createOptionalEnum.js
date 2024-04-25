export const createOptionalEnum = (prop = { options: {} }) => {
  const newProp = {
    ...prop,
    options: {
      none: '',
      ...prop.options,
    },
    defaultValue: 'none',
  };
  return newProp;
};
