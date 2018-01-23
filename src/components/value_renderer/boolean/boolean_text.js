import { isNil } from 'lodash';

const createBooleanTextRenderer = (config = {}) => {
  const textConfig = { yes: 'Yes', no: 'No', ...config };
  const nilValue = config.nil || '';
  return (value) => {
    if (isNil(value)) {
      return nilValue;
    }
    return value ? textConfig.yes : textConfig.no;
  };
};

export const booleanText = createBooleanTextRenderer();
booleanText.with = (config) => createBooleanTextRenderer(config);
