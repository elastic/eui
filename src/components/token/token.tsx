import React, { FunctionComponent, HTMLAttributes, CSSProperties } from 'react';
import { defaults } from 'lodash';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { isColorDark, hexToRgb } from '../../services';

import { IconType, EuiIcon, IconSize } from '../icon';
import {
  EuiTokenMapType,
  EuiTokenMapDisplayOptions,
  TokenColor,
  TokenShape,
  TokenFill,
  TOKEN_MAP,
} from './token_map';

type TokenSize = 'xs' | 's' | 'm' | 'l';

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

const defaultDisplayOptions: EuiTokenMapDisplayOptions = {
  color: 'gray',
  shape: 'square',
  fill: 'light',
};

interface TokenProps {
  /**
   * An EUI icon type
   */
  iconType: IconType;
  /**
   * Size of the token
   */
  size?: TokenSize;
  style?: CSSProperties;
}

export type EuiTokenProps = CommonProps &
  TokenProps &
  EuiTokenMapDisplayOptions &
  HTMLAttributes<HTMLDivElement>;

export const EuiToken: FunctionComponent<EuiTokenProps> = ({
  iconType,
  color,
  fill,
  shape,
  size = 's',
  style = {},
  className,
  ...rest
}) => {
  // Set the icon size to the same as the passed size
  // unless they passed `xs` which IconSize doesn't support
  let iconSize: IconSize = size === 'xs' ? 's' : size;

  const displayOptions: EuiTokenMapDisplayOptions = {
    color,
    fill,
    shape,
  };
  let finalOptions: EuiTokenMapDisplayOptions;

  // When displaying at the small size, the token specific icons
  // should actually be displayed at medium size
  if (String(iconType).indexOf('token') === 0 && size === 's') {
    iconSize = 'm';
  }

  if (iconType in TOKEN_MAP) {
    const definedToken = TOKEN_MAP[iconType as EuiTokenMapType];
    finalOptions = defaults(
      displayOptions,
      definedToken,
      defaultDisplayOptions
    );
  } else {
    finalOptions = defaults(displayOptions, defaultDisplayOptions);
  }

  const finalColor = finalOptions.color || 'gray';
  const finalShape = finalOptions.shape || 'circle';
  let finalFill = finalOptions.fill || 'light';

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
    <div className={classes} style={style} {...rest}>
      <EuiIcon type={iconType} size={iconSize} />
    </div>
  );
};
