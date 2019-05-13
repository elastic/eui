import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const responsiveSizesToClassNameMap = {
  xs: 'eui-hideFor--xs',
  s: 'eui-hideFor--s',
  m: 'eui-hideFor--m',
  l: 'eui-hideFor--l',
  xl: 'eui-hideFor--xl',
};

export const RESPONSIVE_SIZES = Object.keys(responsiveSizesToClassNameMap);

export const EuiHideFor = ({ children, className, sizes, ...rest }) => {
  const sizingClasses = sizes.map(function(item) {
    return responsiveSizesToClassNameMap[item];
  });

  const classes = classNames('euiHideFor', sizingClasses, className);

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};

EuiHideFor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * List of all the responsive sizes to hide the children from
   */
  sizes: PropTypes.arrayOf(PropTypes.oneOf(RESPONSIVE_SIZES)).isRequired,
};
