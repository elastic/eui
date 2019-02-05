export const isWithinRange = (min: number | string, max: number | string, value: number | string) => {
  if (value === '') {
    return false;
  }

  return min <= value && value <= max;
};
