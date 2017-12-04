import React from 'react';
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

  let link;
  if (onClick) {
    link = (
      <button
        type={type}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );

  } else {
    link = (
      <a
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    link
  );
};

EuiLink.defaultProps = {
  color: 'primary',
  type: 'button',
};
