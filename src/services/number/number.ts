export const isWithinRange = (min: number | string, max: number | string, value: number | string) => {
  if (min === '' || max === '' || value === '') {
    return false;
  }

  return min <= value && value <= max;
};
