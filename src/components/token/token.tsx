/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme, isColorDark, hexToRgb } from '../../services';

import { IconType, EuiIcon, IconSize } from '../icon';
import { EuiTokenMapType, TOKEN_MAP } from './token_map';
import { euiTokenStyles } from './token.styles';

export const SIZES = ['xs', 's', 'm', 'l'] as const;
export type TokenSize = typeof SIZES[number];

export const SHAPES = ['circle', 'square'] as const;
export type TokenShape = typeof SHAPES[number];

export const FILLS = ['light', 'dark', 'none'] as const;
export type TokenFill = typeof FILLS[number];

export const COLORS = [
  'euiColorVis0',
  'euiColorVis1',
  'euiColorVis2',
  'euiColorVis3',
  'euiColorVis4',
  'euiColorVis5',
  'euiColorVis6',
  'euiColorVis7',
  'euiColorVis8',
  'euiColorVis9',
  'gray',
] as const;
export type TokenColor = typeof COLORS[number];

export interface TokenProps {
  /**
   * An EUI icon type
   */
  iconType: IconType;
  /**
   * For best results use one of the vis color names (or 'gray').
   * Or supply your own HEX color. The `fill='light'` (lightened background) will always be overridden by `fill='dark'` (solid background).
   * Default: `gray` for glyphs or one of the vis colors for prefab token types
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
  Omit<HTMLAttributes<HTMLSpanElement>, 'title'>;

const isTokenColor = (color: string): color is TokenColor =>
  COLORS.includes(color as TokenColor);

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

  // If the iconType passed is one of the prefab token types,
  // grab its properties
  const tokenDefaults =
    typeof iconType === 'string' && iconType in TOKEN_MAP
      ? TOKEN_MAP[iconType as EuiTokenMapType]
      : {};

  const finalColor = color || tokenDefaults.color || 'gray';
  const finalShape = shape || tokenDefaults.shape || 'circle';
  let finalFill = fill || 'light';

  const euiTheme = useEuiTheme();
  const styles = euiTokenStyles(euiTheme);

  let cssStyles = [
    styles.euiToken,
    styles[finalShape],
    styles[finalFill],
    styles[size],
  ];

  let finalStyle = style;

  if (isTokenColor(finalColor)) {
    cssStyles = [...cssStyles, styles[finalColor as TokenColor]];
  } else if (finalFill === 'none') {
    // When a custom HEX color is passed and the token doesn't have any fill (no background),
    // the icon gets that passed color
    cssStyles = [...cssStyles, styles.customColor];
    finalStyle = { color: finalColor, ...style };
  } else {
    // When a custom HEX color is passed and the token has a fill (light or dark),
    // the background gets the custom color and the icon gets white or black based on the passed color
    // The fill='light' (lightened background) will always be overridden by fill='dark' (opaque background)
    // to better handle custom colors
    const isFinalColorDark = isColorDark(...hexToRgb(finalColor));
    const lightOrDarkColor = isFinalColorDark ? '#FFFFFF' : '#000000';

    cssStyles = [...cssStyles, styles.customColor];

    finalFill = 'dark';
    finalStyle = {
      color: lightOrDarkColor,
      backgroundColor: finalColor,
      ...style,
    };
  }

  const classes = classNames('euiToken', className);

  return (
    <span className={classes} css={cssStyles} style={finalStyle} {...rest}>
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
