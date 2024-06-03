/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
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
export type LogicalSides = (typeof LOGICAL_SIDES)[number];

export const logicals = LOGICALS;
const { _shorthands, ..._logicals } = LOGICALS;
export const LOGICAL_PROPERTIES = keysOf(_logicals);
export type LogicalProperties = (typeof LOGICAL_PROPERTIES)[number];

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
 * Casing utils for swapping between camel case (style objs) and kebab case (CSS)
 */
const camelCase = (kebabCasedString: string): string =>
  kebabCasedString.replace(/-\w/g, (str) => str.charAt(1).toUpperCase());
const kebabCase = (camelCasedString: string): string =>
  camelCasedString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 *
 * @param property A string that is a valid CSS logical property
 * @param value String to output as the property value
 * @returns `object` Returns the logical CSS property version for the given `property: value` pair
 */
export const logicalStyle = (property: LogicalProperties, value?: any) => {
  return { [camelCase(logicals[property])]: value };
};

/**
 * Given a style object with any amount of unknown CSS properties,
 * find ones that can be converted to logical properties and convert them
 *
 * @param styleObject - A React object of camelCased styles
 * @returns `object`
 */
export const logicalStyles = (styleObject: CSSProperties) => {
  const logicalStyleObject: Record<string, string | number | undefined> = {};

  Object.entries(styleObject).forEach(([key, value]) => {
    const cssProperty = kebabCase(key);
    if (logicals.hasOwnProperty(cssProperty)) {
      const logicalKey = camelCase(logicals[cssProperty as LogicalProperties]);
      logicalStyleObject[logicalKey] = value;
    } else {
      logicalStyleObject[key] = value;
    }
  });

  return logicalStyleObject;
};

/**
 *
 * @param width A string value for the LTR width
 * @param height A string value for the LTR height
 * @returns `string` Returns the logical CSS properties for height and width
 */
export const logicalSizeCSS = (width: any, height: any = width) => {
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
export type LogicalText = (typeof LOGICAL_TEXT_ALIGNMENT)[number];

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
