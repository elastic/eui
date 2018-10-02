import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const colorsToClassNameMap = {
  'default': 'euiTextColor--default',
  'subdued': 'euiTextColor--subdued',
  'secondary': 'euiTextColor--secondary',
  'accent': 'euiTextColor--accent',
  'danger': 'euiTextColor--danger',
  'warning': 'euiTextColor--warning',
  'ghost': 'euiTextColor--ghost',
};

export const COLORS = Object.keys(colorsToClassNameMap);

export const EuiTextColor = ({
  children,
  color,
  className,
  component: Component,
  ...rest
}) => {
  const classes = classNames(
    'euiTextColor',
    colorsToClassNameMap[color],
    className
  );

  return (
    <Component
      className={classes}
      {...rest}
    >
      {children}
    </Component>
  );
};

EuiTextColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(COLORS),

  /**
   * Determines the root element
   */
  component: PropTypes.oneOf(['div', 'span']),
};

EuiTextColor.defaultProps = {
  color: 'default',
  component: 'span',
};
