/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';
import { useEuiTheme, isColorDark, hexToRgb } from '../../services';

import { EuiIcon, IconSize } from '../icon';
import { EuiTokenMapType, TOKEN_MAP } from './token_map';
import { COLORS } from './token_types';
import type {
  EuiTokenProps,
  TokenColor,
  TokenSize,
  TokenShape,
  TokenFill,
} from './token_types';
import { euiTokenStyles } from './token.styles';

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

  const euiTheme = useEuiTheme();

  // If the iconType passed is one of the prefab token types,
  // grab its properties
  const tokenDefaults =
    typeof iconType === 'string' && iconType in TOKEN_MAP
      ? TOKEN_MAP[iconType as EuiTokenMapType]
      : {};

  const finalColor = color || tokenDefaults.color || 'gray';
  const finalShape = shape || tokenDefaults.shape || 'circle';
  let finalFill = fill || 'light';

  // memoize styles to reduce executing contained color calculations
  const styles = useMemo(() => {
    return euiTokenStyles(euiTheme, finalFill);
  }, [euiTheme, finalFill]);

  let cssStyles = [
    styles.euiToken,
    styles[finalShape as TokenShape],
    styles[finalFill as TokenFill],
    styles[size as TokenSize],
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
