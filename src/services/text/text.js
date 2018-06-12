import { formatText } from '../format';

export const capitalizeWord = value => {
  value = formatText(value);
  if (value.length === 0) return '';
  return value[0].toUpperCase() + value.slice(1);
};
