/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import LOGICALS from './logicals.json';

export const { _shorthands: LOGICAL_SHORTHANDS } = LOGICALS;
export type LogicalShorthands = (typeof LOGICAL_SHORTHANDS)[number];

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
  if (property === 'border-radius') {
    return logicalBorderRadiusCSS(String(value));
  }

  // Split all potential values by spaces
  const values = String(value).split(/\s+/);

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

  if (property.includes('border-')) {
    // Border properties have a different naming syntax than margin/padding/etc
    const borderProperty = property.split('-')[1];
    return `
    border-block-${borderProperty}: ${verticalBlockValue};
    border-inline-${borderProperty}: ${horizontalInlineValue};
    `;
  } else {
    return `
    ${property}-block: ${verticalBlockValue};
    ${property}-inline: ${horizontalInlineValue};
    `;
  }
};

/**
 * Logical border radius is unfortunately a very special case as it handles corners
 * and not sides (@see https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#corners_of_a_box)
 * and does not have `-inline` or `-block` shorthands.
 *
 * It also needs to account for `/` syntax (horizontal vs vertical radii)
 * @see https://www.sitepoint.com/setting-css3-border-radius-with-slash-syntax/
 */
export const logicalBorderRadiusCSS = (
  value: string,
  ignoreZeroes: boolean = false
) => {
  const borderRadiusMap = {
    'border-start-start-radius': '',
    'border-start-end-radius': '',
    'border-end-end-radius': '',
    'border-end-start-radius': '',
  };
  let values: string[] = [];

  if (value.includes('/')) {
    values = ['', '', '', ''];

    // Split into horizontal & vertical radii strings
    value.split('/').forEach((radiiAxes) => {
      const radii = radiiAxes.trim().split(/\s+/);

      values.forEach((_, i) => {
        // Add a space between the horizontal and vertical radius
        let combinedValue = values[i] ? `${values[i]} ` : values[i];

        switch (radii.length) {
          case 1:
            // Every value is repeated
            combinedValue += radii[0];
            break;
          case 2:
            // If the corner is an even index, give it the first value, if odd, second value
            combinedValue += i % 2 ? radii[1] : radii[0];
            break;
          case 3:
            // The last corner should repeat the second value
            combinedValue += i === 3 ? radii[1] : radii[i];
            break;
          case 4:
          default:
            // Every value is specified
            combinedValue += radii[i];
        }

        values[i] = combinedValue;
      });
    });
  } else {
    values = value.split(/\s+/);
  }

  switch (values.length) {
    case 1:
      // If it's the same value all around, no need to use logical properties
      return `border-radius: ${value};`;
    case 2:
      borderRadiusMap['border-start-start-radius'] = values[0];
      borderRadiusMap['border-start-end-radius'] = values[1];
      borderRadiusMap['border-end-end-radius'] = values[0];
      borderRadiusMap['border-end-start-radius'] = values[1];
      break;
    case 3:
      borderRadiusMap['border-start-start-radius'] = values[0];
      borderRadiusMap['border-start-end-radius'] = values[1];
      borderRadiusMap['border-end-end-radius'] = values[2];
      borderRadiusMap['border-end-start-radius'] = values[1];
      break;
    case 4:
    default:
      borderRadiusMap['border-start-start-radius'] = values[0];
      borderRadiusMap['border-start-end-radius'] = values[1];
      borderRadiusMap['border-end-end-radius'] = values[2];
      borderRadiusMap['border-end-start-radius'] = values[3];
      break;
  }

  const borderRadiusCSS: string[] = [];
  Object.entries(borderRadiusMap).forEach(([property, value]) => {
    if (value) {
      if ((ignoreZeroes && value !== '0' && value !== '0px') || !ignoreZeroes) {
        borderRadiusCSS.push(`${property}: ${value};`);
      }
    }
  });
  return borderRadiusCSS.join('\n');
};
