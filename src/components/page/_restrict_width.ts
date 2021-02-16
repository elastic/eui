/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * The `restrictedWidth` property is the same for all EuiPage components.
 * This is file contains the type specific to that prop and a helper
 * function for creating the corresponding classNames and style tags
 * based on the consumer's configuration
 *
 * @param {restrictWidth} boolean | number | string The prop value
 * @param {style} CSSProperties An object of style attributes if provided
 * @returns {{widthClassName: string, newStyle: CSSProperties}} Returns an object with keys for the class name to append to the component's class and the updated style props
 */

import { CSSProperties } from 'react';

export type _EuiPageRestrictWidth = {
  /**
   * Sets the max-width of the page,
   * set to `true` to use the default size of `1000px (1200 for Amsterdam)`,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  restrictWidth?: boolean | number | string;
};

export function setPropsForRestrictedPageWidth(
  restrictWidth: _EuiPageRestrictWidth['restrictWidth'],
  style?: CSSProperties
): { widthClassName?: string; newStyle?: CSSProperties } {
  let widthClassName;
  let newStyle;

  if (restrictWidth === true) {
    widthClassName = 'restrictWidth-default';
  } else if (restrictWidth !== false) {
    widthClassName = 'restrictWidth-custom';
    newStyle = { ...style, maxWidth: restrictWidth };
  }

  return { widthClassName, newStyle };
}
