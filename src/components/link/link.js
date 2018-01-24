import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const colorsToClassNameMap = {
  'primary': 'euiLink--primary',
  'subdued': 'euiLink--subdued',
  'secondary': 'euiLink--secondary',
  'accent': 'euiLink--accent',
  'danger': 'euiLink--danger',
  'warning': 'euiLink--warning',
  'ghost': 'euiLink--ghost',
};

export const COLORS = Object.keys(colorsToClassNameMap);

export const EuiLink = ({
  children,
  type,
  color,
  className,
  onClick,
  ...rest
}) => {
  const classes = classNames('euiLink', colorsToClassNameMap[color], className);

  if (onClick) {
    return (
      <button
        type={type}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      className={classes}
      {...rest}
    >
      {children}
    </a>
  );
};

EuiLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(COLORS),
  type: PropTypes.string,
};

EuiLink.defaultProps = {
  color: 'primary',
  type: 'button',
};
