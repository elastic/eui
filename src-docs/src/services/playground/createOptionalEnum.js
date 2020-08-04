export const createOptionalEnum = (prop = { options: {} }) => {
  const newProp = {
    ...prop,
    options: {
      none: '-- No value selected --',
      ...prop.options,
    },
    defaultValue: 'none',
  };
  return newProp;
};
