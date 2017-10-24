import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const textSizeToClassNameMap = {
  s: 'euiText--small',
};

export const TEXT_SIZES = Object.keys(textSizeToClassNameMap);

export const EuiText = ({ size, children, className, ...rest }) => {

  const classes = classNames(
    'euiText',
    textSizeToClassNameMap[size],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(TEXT_SIZES),
};
