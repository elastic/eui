import { isNil } from 'lodash';

const createTextRenderer = (config = {}) => {
  const nilValue = config.nil || '';
  return (value) => isNil(value) ? nilValue : value.toString();
};

export const text = createTextRenderer();
text.with = (config) => createTextRenderer(config);
