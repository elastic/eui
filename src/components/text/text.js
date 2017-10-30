import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  COLORS,
  EuiTextColor,
} from './text_color';

const textSizeToClassNameMap = {
  s: 'euiText--small',
  xs: 'euiText--extraSmall',
};

export const TEXT_SIZES = Object.keys(textSizeToClassNameMap);

export const EuiText = ({ size, color, children, className, ...rest }) => {

  const classes = classNames(
    'euiText',
    textSizeToClassNameMap[size],
    className
  );

  let optionallyColoredText;
  if (color) {
    optionallyColoredText = (
      <EuiTextColor color={color}>
        {children}
      </EuiTextColor>
    );
  } else {
    optionallyColoredText = children;
  }

  return (
    <div className={classes} {...rest}>
      {optionallyColoredText}
    </div>
  );
};

EuiText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(TEXT_SIZES),
  color: PropTypes.oneOf(COLORS),
};
