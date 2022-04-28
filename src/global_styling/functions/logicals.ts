/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keysOf } from '../../components/common';

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

const logicalMargins = {
  'margin-left': 'margin-inline-start',
  'margin-right': 'margin-inline-end',
  'margin-top': 'margin-block-start',
  'margin-bottom': 'margin-block-end',
  'margin-horizontal': 'margin-inline',
  'margin-vertical': 'margin-block',
};

const logicalPaddings = {
  'padding-left': 'padding-inline-start',
  'padding-right': 'padding-inline-end',
  'padding-top': 'padding-block-start',
  'padding-bottom': 'padding-block-end',
  'padding-horizontal': 'padding-inline',
  'padding-vertical': 'padding-block',
};

const logicalPosition = {
  top: 'inset-inline-start',
  right: 'inset-block-start',
  bottom: 'inset-inline-end',
  left: 'inset-block-end',
  horizontal: 'inset-block',
  vertical: 'inset-inline',
  inset: 'inset',
};

const logicalSize = {
  height: 'block-size',
  width: 'inline-size',
  'max-height': 'max-block-size',
  'max-width': 'max-inline-size',
  'min-height': 'min-block-size',
  'min-width': 'min-inline-size',
};

const logicalOverflow = {
  'overflow-x': 'overflow-block',
  'overflow-y': 'overflow-inline',
};

const logicalRadius = {
  'border-top-left-radius': 'border-start-start-radius',
  'border-top-right-radius': 'border-start-end-radius',
  'border-bottom-left-radius': 'border-end-start-radius',
  'border-bottom-right-radius': 'border-end-end-radius',
};

export const logicals = {
  ...logicalMargins,
  ...logicalPaddings,
  ...logicalPosition,
  ...logicalSize,
  ...logicalOverflow,
  ...logicalRadius,
};

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
 *
 * @param property A string that is a valid CSS logical property
 * @param value String to output as the property value
 * @returns `object` Returns the logical CSS property version for the given `property: value` pair
 */
export const logicalStyle = (property: LogicalProperties, value?: any) => {
  return { [`${logicals[property]}`]: `${value}` };
};

// Text alignment is separate because its the value that changes not the property
export const logicalText = {
  'text-align': {
    left: 'start',
    center: 'center',
    right: 'end',
  },
};

/**
 *
 * @param property A string that is a valid CSS logical property
 * @param value String to output as the property value
 * @returns `object` Returns the logical CSS property version for the given `property: value` pair
 */
export const logicalTextAlign = (value: 'left' | 'right' | 'center') => {
  return `text-align: ${logicalText['text-align'][value]};`;
};
