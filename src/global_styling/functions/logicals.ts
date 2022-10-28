/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keysOf } from '../../components/common';
import LOGICALS from './logicals.json';

/**
 * EUI utilizes logical CSS properties to enable directional writing-modes.
 * To encourage use of logical properties, we provide a few helper utilities to
 * convert certain directional properties to logical properties.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
 */

export const logicalSide = {
  left: 'inline-start',
  right: 'inline-end',
  top: 'block-start',
  bottom: 'block-end',
  horizontal: 'inline',
  vertical: 'block',
};
export const LOGICAL_SIDES = keysOf(logicalSide);
export type LogicalSides = typeof LOGICAL_SIDES[number];

export const logicals = LOGICALS;
export const LOGICAL_PROPERTIES = keysOf(logicals);
export type LogicalProperties = typeof LOGICAL_PROPERTIES[number];

/**
 *
 * @param property A string that is a valid CSS logical property
 * @param value String to output as the property value
 * @returns `string` Returns the logical CSS property version for the given `property: value` pair
 */
export const logicalCSS = (property: LogicalProperties, value?: any) => {
  return `${logicals[property]}: ${value};`;
};

/**
 * Some logical properties are not yet fully supported by all browsers.
 * For those cases, we should use the old property as a fallback for
 * browsers missing support, while allowing supporting browsers to use
 * the logical properties.
 *
 * Examples:
 * https://caniuse.com/?search=overflow-block
 * https://caniuse.com/mdn-css_properties_float_flow_relative_values
 */
export const logicalCSSWithFallback = (
  property: LogicalProperties,
  value?: any
) => `
  ${property}: ${value};
  ${logicalCSS(property, value)}
`;

/**
 *
 * @param property A string that is a valid CSS logical property
 * @param value String to output as the property value
 * @returns `object` Returns the logical CSS property version for the given `property: value` pair
 */
export const logicalStyle = (property: LogicalProperties, value?: any) => {
  // Strip hyphens and camelCase the CSS logical property so React doesn't throw errors
  const camelCasedProperty = logicals[property].replace(/-\w/g, (str) =>
    str.charAt(1).toUpperCase()
  );
  return { [camelCasedProperty]: value };
};

/**
 *
 * @param width A string value for the LTR width
 * @param height A string value for the LTR height
 * @returns `string` Returns the logical CSS properties for height and width
 */
export const logicalSizeCSS = (width: any, height: any) => {
  return `
    ${logicals.width}: ${width};
    ${logicals.height}: ${height};
  `;
};

/**
 *
 * @param width A string value for the LTR width
 * @param height A string value for the LTR height
 * @returns `object` Returns the logical CSS properties for height and width
 */
export const logicalSizeStyle = (width: any, height: any) => {
  return {
    ...logicalStyle('width', width),
    ...logicalStyle('height', height),
  };
};

// Text alignment is separate because its the value that changes not the property
export const logicalText = {
  'text-align': {
    left: 'start',
    center: 'center',
    right: 'end',
  },
};

export const LOGICAL_TEXT_ALIGNMENT = keysOf(logicalText['text-align']);
export type LogicalText = typeof LOGICAL_TEXT_ALIGNMENT[number];

/**
 *
 * @param property A string that is a valid CSS logical property
 * @param value String to output as the property value
 * @returns `string` Returns the logical CSS property version for the given `property: value` pair
 */
export const logicalTextAlignCSS = (value: LogicalText) => {
  return `text-align: ${logicalText['text-align'][value]};`;
};

/**
 *
 * @param property A string that is a valid CSS logical property
 * @param value String to output as the property value
 * @returns `object` Returns the logical CSS property version for the given `property: value` pair
 */
export const logicalTextAlignStyle = (value: LogicalText) => {
  return { textAlign: logicalText['text-align'][value] };
};
