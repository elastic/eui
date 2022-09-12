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
 */
export const mathWithUnits = (
  value: string | number | undefined, // Unfortunately, this is the CSSProperties[] type used for several euiTheme vars
  callback: (x: number) => number, // Can be multiplication, division, addition, etc.
  unit: string = '' // Optional: if a unitless number was passed in, allow specifying a unit to return
) => {
  if (typeof value === 'string') {
    const regex = /(?<value>[\d.]+)(?<unit>[a-zA-Z]*)/;
    const matches = regex.exec(value);
    if (!matches?.groups?.value) return value;

    const numericValue = Number(matches.groups.value);
    const passedUnit = matches.groups.unit || unit;

    return `${callback(numericValue)}${passedUnit}`;
  } else if (typeof value === 'number') {
    return `${callback(value)}${unit}`;
  } else {
    return value;
  }
};
