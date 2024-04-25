/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * The `restrictedWidth` property is the same for all EuiPage components.
 * This is file contains the type specific to that prop and a helper
 * function for creating the corresponding classNames and style tags
 * based on the consumer's configuration
 */

import { CSSProperties } from 'react';

// TODO: Decide how to make this a global value but still isolated to the page component
export const PAGE_MAX_WIDTH: CSSProperties['maxWidth'] = '1200px';

export type _EuiPageRestrictWidth = {
  /**
   * Sets the max-width of the page,
   * set to `true` to use the default size of `1200px`,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  restrictWidth?: boolean | number | string;
};

/**
 * **DEPRECATED**
 * This function calculates the correct class name and combined styles
 * based on the `restrictWidth` value passed in
 *
 * @param restrictWidth `boolean | number | string` The prop value
 * @param style `CSSProperties` An object of style attributes if provided
 * @returns An object with keys for the `widthClassName` to append to the component's class and the updated `newStyle` props
 */
export function setPropsForRestrictedPageWidth(
  restrictWidth: _EuiPageRestrictWidth['restrictWidth'],
  style?: CSSProperties
): { widthClassName?: string; newStyle: CSSProperties } {
  let widthClassName;
  const newStyle = { ...style };

  if (restrictWidth === true) {
    widthClassName = 'restrictWidth-default';
  } else if (restrictWidth !== false) {
    widthClassName = 'restrictWidth-custom';
    newStyle.maxWidth = restrictWidth;
  }

  return { widthClassName, newStyle };
}

/**
 * This function calculates the correct just the combined styles
 * based on the `restrictWidth` value passed in
 *
 * @param restrictWidth `boolean | number | string` The prop value
 * @param style `CSSProperties` An object of style attributes if provided
 * @returns An object of the updated `style` props
 */
export function setStyleForRestrictedPageWidth(
  restrictWidth: _EuiPageRestrictWidth['restrictWidth'],
  style?: CSSProperties
): CSSProperties {
  const newStyle = { ...style };

  if (restrictWidth === true) {
    newStyle.maxWidth = PAGE_MAX_WIDTH;
  } else if (restrictWidth !== false) {
    newStyle.maxWidth = restrictWidth;
  }

  return newStyle;
}
