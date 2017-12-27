const createBooleanTextRenderer = (config = {}) => {
  const textConfig = { yes: 'Yes', no: 'No', ...config };
  return (value) => value ? textConfig.yes : textConfig.no;
};

export const booleanText = createBooleanTextRenderer();
booleanText.with = (config) => createBooleanTextRenderer(config);
