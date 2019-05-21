import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const responsiveSizesToClassNameMap = {
  xs: 'eui-showFor--xs',
  s: 'eui-showFor--s',
  m: 'eui-showFor--m',
  l: 'eui-showFor--l',
  xl: 'eui-showFor--xl',
};

export const RESPONSIVE_SIZES = Object.keys(responsiveSizesToClassNameMap);

export const EuiShowFor = ({ children, className, sizes, ...rest }) => {
  const sizingClasses = sizes.map(function(item) {
    return responsiveSizesToClassNameMap[item];
  });

  const classes = classNames('euiShowFor', sizingClasses, className);

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};

EuiShowFor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * List of all the responsive sizes to show the children for
   */
  sizes: PropTypes.arrayOf(PropTypes.oneOf(RESPONSIVE_SIZES)).isRequired,
};
