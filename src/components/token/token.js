import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiIcon } from '../icon';
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

export const EuiToken = ({
  iconType,
  size,
  shape,
  color,
  isSolidColor,
  hideBorder,
  className,
  ...rest,
}) => {

  console.log(TOKEN_MAP[iconType].shape);

  if (iconType in TOKEN_MAP) {
    shape = TOKEN_MAP[iconType].shape;
    color = TOKEN_MAP[iconType].color;
    iconType = iconType;
    if (TOKEN_MAP[iconType].isSolidColor) {
      isSolidColor = true;
    }
    if (TOKEN_MAP[iconType].hideBorder) {
      hideBorder = true;
    }
  }

  const classes = classNames(
    'euiToken',
    `euiToken--${shape}`,
    `euiToken--${color}`,
    sizeToClassMap[size],
    {
      'euiToken--solid-color': isSolidColor
    },
    {
      'euiToken--no-border': hideBorder
    },
    className
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiIcon type={iconType} />
    </div>
  );
};

EuiToken.propTypes = {
  iconType: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isSolidColor: PropTypes.bool,
  hideBorder: PropTypes.bool,
  shape: PropTypes.oneOf(SHAPES).isRequired,
  size: PropTypes.oneOf(SIZES),
};

EuiToken.defaultProps = {
  size: 's'
};