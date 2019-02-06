export const isWithinRange = (
  min: number | string,
  max: number | string,
  value: number | string
) => {
  if (min === '' || max === '' || value === '') {
    return false;
  }

  const val = Number(value);
  return Number(min) <= val && val <= Number(max);
};
