import dateFormat from 'date-fns/format';

export const dateFormatAliases = {
  date: 'D MMM YYYY',
  longDate: 'DD MMMM YYYY',
  shortDate: 'D MMM YY',
  dateTime: 'D MMM YYYY HH:mm',
  longDateTime: 'DD MMMM YYYY HH:mm:ss',
  shortDateTime: 'D MMM YY HH:mm',
  iso8601: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
};

const createDateRenderer = (config = {}) => {
  const pattern = config.format || dateFormatAliases.dateTime;
  const options = config.options || {};
  const resolvedFormat = dateFormatAliases[pattern] || pattern;
  return (value) => {
    return dateFormat(value, resolvedFormat, options);
  };
};

export const date = createDateRenderer();
date.with = (config) => createDateRenderer(config);
