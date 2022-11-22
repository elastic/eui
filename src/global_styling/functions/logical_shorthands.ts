/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import LOGICALS from './logicals.json';

export const { _shorthands: LOGICAL_SHORTHANDS } = LOGICALS;
export type LogicalShorthands = typeof LOGICAL_SHORTHANDS[number];

/**
 * Unfortunately, shorthand properties that describe boxes
 * (@see https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box)
 * do not currently automatically respond to logical changes in display direction
 * (@see https://github.com/w3c/csswg-drafts/issues/1282)
 *
 * This utility is essentially a stop-gap for those shorthand properties,
 * converting them to corresponding longer logical `-inline` and `-block` properties
 *
 * 🗑 NOTE: This file is in a separate util file from logicals.ts due to its relatively
 * convoluted logic, & to make deleting it easier when an official CSS spec is implemented.
 */
export const logicalShorthandCSS = (
  property: LogicalShorthands,
  value: string | number
) => {
  if (!LOGICAL_SHORTHANDS.includes(property)) {
    throw new Error(
      `${property} is not a shorthand property that needs logical CSS`
    );
  }

  // Split all potential values by spaces
  const values = String(value).split(' ');

  let verticalBlockValue;
  let horizontalInlineValue;

  switch (values.length) {
    case 1:
      // If it's the same value all around, no need to use logical properties
      return `${property}: ${value};`;
    case 2:
      verticalBlockValue = values[0];
      horizontalInlineValue = values[1];
      break;
    case 3:
      verticalBlockValue = `${values[0]} ${values[2]}`;
      horizontalInlineValue = values[1];
      break;
    case 4:
    default:
      verticalBlockValue = `${values[0]} ${values[2]}`;
      horizontalInlineValue = `${values[3]} ${values[1]}`; // Note: left (4th value) comes before right (2nd value)
      break;
  }

  return `
    ${property}-block: ${verticalBlockValue};
    ${property}-inline: ${horizontalInlineValue};
  `;
};
