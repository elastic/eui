/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Utility for performing math callbacks on a string with CSS units
 * and returning a string with its unit preserved.
 *
 * Example usage:
 * mathWithUnits('4px', (x) => x / 2) = '2px';
 * mathWithUnits(euiTheme.size.xs, (x) => x + 2) = '6px';
 * mathWithUnits([euiTheme.size.l, euiTheme.size.s], (x, y) => x - y) = '16px';
 */
type ValueTypes = string | number | undefined; // Unfortunately, this is the CSSProperties[] type used for several euiTheme vars

export const mathWithUnits = (
  values: ValueTypes | ValueTypes[], // Can accept a single input or array of inputs
  callback: (...args: number[]) => number, // Can be multiplication, division, addition, etc.
  unit: string = '' // Optional: allow specifying an override unit to return
) => {
  if (!Array.isArray(values)) values = [values];

  const foundNumericValues: number[] = [];
  let foundUnit = '';

  values.forEach((value) => {
    if (typeof value === 'string') {
      const regex = /(?<value>-?[\d.]+)(?<unit>%|[a-zA-Z]*)/;
      const matches = regex.exec(value);

      const numericValue = Number(matches?.groups?.value);

      if (!isNaN(numericValue)) {
        foundNumericValues.push(numericValue);
      } else {
        throw new Error('No valid numeric value found');
      }

      if (!unit && matches?.groups?.unit) {
        if (!foundUnit) {
          foundUnit = matches.groups.unit;
        } else if (foundUnit !== matches.groups.unit) {
          throw new Error(
            'Multiple units found. Use `calc()` to mix and math multiple unit types (e.g. `%` & `px`) instead'
          );
        }
      }
    } else if (typeof value === 'number') {
      foundNumericValues.push(value);
    } else {
      throw new Error('Invalid value type - pass a string or number');
    }
  });

  return `${callback(...foundNumericValues)}${unit || foundUnit}`;
};
