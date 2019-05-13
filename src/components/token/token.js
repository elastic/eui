import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconPropType, EuiIcon } from '../icon';
import { TOKEN_MAP } from './token_map';

const sizeToClassMap = {
  s: 'euiToken--small',
  m: 'euiToken--medium',
  l: 'euiToken--large',
};

export const SIZES = Object.keys(sizeToClassMap);

const shapeToClassMap = {
  circle: 'euiToken--circle',
  square: 'euiToken--square',
  rectangle: 'euiToken--rectangle',
};

export const SHAPES = Object.keys(shapeToClassMap);

const colorToClassMap = {
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

export const COLORS = Object.keys(colorToClassMap);

export const EuiToken = ({
  iconType,
  displayOptions,
  size,
  className,
  ...rest
}) => {
  // Check if display options is empty
  const displayOptionsIsEmpty =
    Object.keys(displayOptions).length === 0 &&
    displayOptions.constructor === Object;

  let tokenShape;
  let tokenColor;
  let fill;
  let tokenHidesBorder;

  // Check if this has a mapping, and doesn't have custom displayOptions
  if (iconType in TOKEN_MAP && displayOptionsIsEmpty) {
    tokenShape = TOKEN_MAP[iconType].shape;
    tokenColor = TOKEN_MAP[iconType].color;
    fill = TOKEN_MAP[iconType].fill ? true : false;
    tokenHidesBorder = TOKEN_MAP[iconType].hideBorder ? true : false;
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

EuiToken.propTypes = {
  /**
   * An EUI icon type
   */
  iconType: IconPropType.isRequired,
  /**
   * Size of the token
   */
  size: PropTypes.oneOf(SIZES),
  /**
   * By default EUI will auto color tokens. You can can however control it
   * - `color`: can be `tokenTint01` thru `tokenTint10`
   * - `shape`: square, circle, rectangle as options
   * - `fill`: makes it a solid color
   * - `hideBorder`: disables the outer border
   */
  displayOptions: PropTypes.shape({
    color: PropTypes.oneOf(COLORS),
    shape: PropTypes.oneOf(SHAPES),
    fill: PropTypes.boolean,
    hideBorder: PropTypes.boolean,
  }),
};

EuiToken.defaultProps = {
  size: 's',
  displayOptions: {},
};
