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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { defaults } from 'lodash';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { isColorDark, hexToRgb } from '../../services';

import { IconType, EuiIcon, IconSize } from '../icon';
import { EuiTokenMapType, TOKEN_MAP } from './token_map';

type TokenSize = 'xs' | 's' | 'm' | 'l';
type TokenShape = 'circle' | 'square' | 'rectangle';
type TokenFill = 'dark' | 'light' | 'none';
type TokenColor =
  | 'euiColorVis0'
  | 'euiColorVis1'
  | 'euiColorVis2'
  | 'euiColorVis3'
  | 'euiColorVis4'
  | 'euiColorVis5'
  | 'euiColorVis6'
  | 'euiColorVis7'
  | 'euiColorVis8'
  | 'euiColorVis9'
  | 'gray';

const sizeToClassMap: { [size in TokenSize]: string } = {
  xs: 'euiToken--xsmall',
  s: 'euiToken--small',
  m: 'euiToken--medium',
  l: 'euiToken--large',
};

export const SIZES = keysOf(sizeToClassMap);

const shapeToClassMap: { [shape in TokenShape]: string } = {
  circle: 'euiToken--circle',
  square: 'euiToken--square',
  rectangle: 'euiToken--rectangle',
};

export const SHAPES = keysOf(shapeToClassMap);

const fillToClassMap: { [fill in TokenFill]: string | null } = {
  none: null,
  light: 'euiToken--light',
  dark: 'euiToken--dark',
};

export const FILLS = keysOf(fillToClassMap);

const colorToClassMap: { [color in TokenColor]: string } = {
  euiColorVis0: 'euiToken--euiColorVis0',
  euiColorVis1: 'euiToken--euiColorVis1',
  euiColorVis2: 'euiToken--euiColorVis2',
  euiColorVis3: 'euiToken--euiColorVis3',
  euiColorVis4: 'euiToken--euiColorVis4',
  euiColorVis5: 'euiToken--euiColorVis5',
  euiColorVis6: 'euiToken--euiColorVis6',
  euiColorVis7: 'euiToken--euiColorVis7',
  euiColorVis8: 'euiToken--euiColorVis8',
  euiColorVis9: 'euiToken--euiColorVis9',
  gray: 'euiToken--gray',
};

export const COLORS = keysOf(colorToClassMap);

export interface TokenProps {
  /**
   * An EUI icon type
   */
  iconType: IconType;
  /**
   * For best results use one of the vis color names (or 'gray').
   * Or supply your own color (can be used with dark or no fill only).
   * Default: `gray`
   */
  color?: TokenColor | string;
  /**
   * Outer shape surrounding the icon
   * Default: `circle`
   */
  shape?: TokenShape;
  /**
   * `light` for lightened color with border, `dark` for solid, or `none`
   * Default: `light`
   */
  fill?: TokenFill;
  /**
   * Size of the token
   */
  size?: TokenSize;
  /**
   * The icon's title. Required for accessibility
   */
  title?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export type EuiTokenProps = CommonProps &
  TokenProps &
  HTMLAttributes<HTMLSpanElement>;

export const EuiToken: FunctionComponent<EuiTokenProps> = ({
  iconType,
  color,
  fill,
  shape,
  size = 's',
  style = {},
  className,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...rest
}) => {
  // Set the icon size to the same as the passed size
  // unless they passed `xs` which IconSize doesn't support
  let finalSize: IconSize = size === 'xs' ? 's' : size;

  // When displaying at the small size, the token specific icons
  // should actually be displayed at medium size
  if (
    typeof iconType === 'string' &&
    iconType.indexOf('token') === 0 &&
    size === 's'
  ) {
    finalSize = 'm';
  }

  const currentDisplay = {
    color,
    fill,
    shape,
  };
  let finalDisplay;

  // If the iconType passed is one of the prefab token types,
  // grab its properties
  if (iconType in TOKEN_MAP) {
    const tokenDisplay = TOKEN_MAP[iconType as EuiTokenMapType];
    finalDisplay = defaults(currentDisplay, tokenDisplay);
  } else {
    finalDisplay = currentDisplay;
  }

  const finalColor = finalDisplay.color || 'gray';
  const finalShape = finalDisplay.shape || 'circle';
  let finalFill = finalDisplay.fill || 'light';

  // Color can be a named space via euiColorVis
  let colorClass;
  if (finalColor in colorToClassMap) {
    colorClass = colorToClassMap[finalColor as TokenColor];
  }
  // Or it can be a string which adds inline styles for the
  else {
    // text color if fill='none' or
    if (finalFill === 'none') {
      style.color = finalColor;
    }
    // full background color if fill='dark' and overrides fill='light' with dark
    else {
      finalFill = 'dark';
      style.backgroundColor = finalColor;
      style.color = isColorDark(...hexToRgb(finalColor))
        ? '#FFFFFF'
        : '#000000';
    }
  }

  const classes = classNames(
    'euiToken',
    colorClass,
    shapeToClassMap[finalShape],
    fillToClassMap[finalFill],
    sizeToClassMap[size],
    className
  );

  return (
    <span className={classes} style={style} {...rest}>
      <EuiIcon
        type={iconType}
        size={finalSize}
        title={title}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      />
    </span>
  );
};
