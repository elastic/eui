import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { IconType, EuiIcon } from '../icon';
import {
  EuiTokenMapType,
  EuiTokenMapDisplayOptions,
  TokenColor,
  TokenShape,
  TOKEN_MAP,
} from './token_map';
import { CommonProps, keysOf } from '../common';

type TokenSize = 's' | 'm' | 'l';

const sizeToClassMap: { [size in TokenSize]: string } = {
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

interface EuiTokenProps {
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
   * - `color`: can be `tokenTint01` thru `tokenTint10`
   * - `shape`: square, circle, rectangle as options
   * - `fill`: makes it a solid color
   * - `hideBorder`: disables the outer border
   */
  displayOptions?: EuiTokenMapDisplayOptions;
}

type Props = CommonProps & EuiTokenProps & HTMLAttributes<HTMLDivElement>;

export const EuiToken: FunctionComponent<Props> = ({
  iconType,
  displayOptions = {},
  size = 's',
  className,
  ...rest
}) => {
  // Check if display options is empty
  const displayOptionsIsEmpty =
    Object.keys(displayOptions).length === 0 &&
    displayOptions.constructor === Object;

  let tokenShape: TokenShape;
  let tokenColor: TokenColor;
  let fill: boolean;
  let tokenHidesBorder: boolean;

  // Check if this has a mapping, and doesn't have custom displayOptions
  if (iconType in TOKEN_MAP && displayOptionsIsEmpty) {
    const mapping = TOKEN_MAP[iconType as EuiTokenMapType];
    // These should be found in the standard mappings, but apply defaults
    // just in case.
    tokenShape = mapping.shape || 'square';
    tokenColor = mapping.color || 'tokenTint01';
    fill = mapping.fill ? true : false;
    tokenHidesBorder = mapping.hideBorder ? true : false;
  } else {
    // Use the displayOptions passed or use some defaults
    tokenShape = displayOptions.shape ? displayOptions.shape : 'square';
    tokenColor = displayOptions.color ? displayOptions.color : 'tokenTint01';
    fill = displayOptions.fill ? true : false;
    tokenHidesBorder = displayOptions.hideBorder ? true : false;
  }

  const classes = classNames(
    'euiToken',
    colorToClassMap[tokenColor],
    shapeToClassMap[tokenShape],
    sizeToClassMap[size],
    {
      'euiToken--fill': fill,
      'euiToken--no-border': tokenHidesBorder,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      <EuiIcon type={iconType} />
    </div>
  );
};
