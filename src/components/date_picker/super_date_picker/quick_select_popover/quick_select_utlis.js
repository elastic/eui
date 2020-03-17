import { isString } from '../../../../services/predicate';

const LAST = 'last';
const NEXT = 'next';

export const parseTimeParts = value => {
  const matches =
    isString(value) &&
    value.match(/now(([\-\+])([0-9]+)([smhdwMy])(\/[smhdwMy])?)?/);

  if (!matches) {
    return {
      timeValueDefault: 15,
      timeUnitsDefault: 'm',
      timeTenseDefault: LAST,
    };
  }

  const operator = matches && matches[2];
  const timeValue = matches && matches[3];
  const timeUnitsDefault = matches && matches[4];

  if (timeValue && timeUnitsDefault && operator) {
    const timeValueDefault = parseInt(timeValue);
    const timeTenseDefault = operator === '+' ? NEXT : LAST;

    return {
      timeValueDefault,
      timeUnitsDefault,
      timeTenseDefault,
    };
  }

  return {
    timeValueDefault: 15,
    timeUnitsDefault: 'm',
    timeTenseDefault: LAST,
  };
};
