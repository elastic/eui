import React, { FunctionComponent, HTMLAttributes } from 'react';
import { defaults } from 'lodash';
import classNames from 'classnames';

import { IconType, EuiIcon, IconSize } from '../icon';
import {
  EuiTokenMapType,
  EuiTokenMapDisplayOptions,
  TokenColor,
  TokenShape,
  TOKEN_MAP,
} from './token_map';
import { CommonProps, keysOf } from '../common';

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

const colorToClassMap: { [color in TokenColor]: string } = {
  tokenTint00: 'euiToken--tokenTint00',
  tokenTint01: 'euiToken--tokenTint01',
  tokenTint02: 'euiToken--tokenTint02',
  tokenTint03: 'euiToken--tokenTint03',
  tokenTint04: 'euiToken--tokenTint04',
  tokenTint05: 'euiToken--tokenTint05',
  tokenTint06: 'euiToken--tokenTint06',
  tokenTint07: 'euiToken--tokenTint07',
  tokenTint08: 'euiToken--tokenTint08',
  tokenTint09: 'euiToken--tokenTint09',
  tokenTint10: 'euiToken--tokenTint10',
  tokenTint11: 'euiToken--tokenTint11',
  tokenTint12: 'euiToken--tokenTint12',
};

export const COLORS = keysOf(colorToClassMap);

const defaultDisplayOptions: EuiTokenMapDisplayOptions = {
  color: 'tokenTint10',
  shape: 'square',
  fill: false,
  hideBorder: false,
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
  /**
   * By default EUI will auto color tokens. You can can however control it
   * - `color`: can be `tokenTint00` thru `tokenTint12`
   * - `shape`: square, circle, rectangle as options
   * - `fill`: makes it a solid color
   * - `hideBorder`: disables the outer border
   */
  displayOptions?: EuiTokenMapDisplayOptions;
}

export type EuiTokenProps = CommonProps &
  TokenProps &
  HTMLAttributes<HTMLDivElement>;

export const EuiToken: FunctionComponent<EuiTokenProps> = ({
  iconType,
  displayOptions,
  size = 's',
  className,
  ...rest
}) => {
  const icon: IconType = iconType;
  let iconSize: IconSize = size === 'xs' ? 's' : size;
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

  const color = finalOptions.color || 'tokenTint10';
  const shape = finalOptions.shape || 'circle';

  const classes = classNames(
    'euiToken',
    shapeToClassMap[shape],
    colorToClassMap[color],
    sizeToClassMap[size],
    {
      'euiToken--fill': finalOptions.fill,
      'euiToken--border': !finalOptions.hideBorder,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      <EuiIcon type={icon} size={iconSize} />
    </div>
  );
};
