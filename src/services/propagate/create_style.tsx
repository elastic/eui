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

import { css, SerializedStyles } from '@emotion/core';
import usePropagate from './use_propagate';

export interface StyleConfig {
  /**
   * Base applies styles to the element that aren't prop dependent
   * These `any`s would ideally match Emotion's accepted types
   */
  base?: any;
  /**
   * This generic key/value combos sets up styles for prop dependencies
   * Like `size: { s: smallStyles, m: mediumStyles }`
   */
  [propName: string]: { [propValue: string]: any };
}

export type Theme = {
  colorMode: 'light' | 'dark';
  theme: string;
  colors: any;
  sizes: any;
  borders: any;
  typography: any;
};

export const createStyle = (
  /**
   * Required to append a particular label (class name reference) for easy debugging
   */
  label: string,
  /**
   * The actual StyleConfig function that accepts a Theme
   */
  style: ({  }: Theme) => StyleConfig | undefined,
  /**
   * The optional props that the StyleConfig relies on/manipulates styles of
   */
  props?: { [key: string]: any }
): SerializedStyles | undefined => {
  // Ideally the theme hook just passes back an object of all the globals to pass on to the StyleConfig
  const [themeName, colors, sizes, borders, typography] = usePropagate([
    'name',
    'colors',
    'sizes',
    'borders',
    'typography',
  ]);
  const theme: Theme = {
    colorMode: themeName.includes('light') ? 'light' : 'dark',
    theme: themeName,
    colors,
    sizes,
    borders,
    typography,
  };

  // Pass the current theme to the style function to return the interpolated StyleConfig object
  const computedStyle = style(theme);
  if (!computedStyle) return;

  // Create a consistent class naming structure for easy debugging
  // The `autoLabel` option in babel has been set to `false`
  let computedLabel = `label:-${label}`;
  console.log(computedStyle);

  // Loop through the passed props object and apply the correct styles
  // Depending on the state of the props
  const propStyles = props
    ? Object.keys(props).reduce((styles, propName) => {
        // Append the style modifier to the label as well
        computedLabel += `-${props[propName]}`;
        return {
          ...styles,
          ...computedStyle[propName][props[propName]],
        };
      }, {})
    : undefined;

  // Return the SerializedStyle with the custom label to append to the class
  return css(
    {
      ...computedStyle.base,
      ...propStyles,
    },
    computedLabel
  );
};
