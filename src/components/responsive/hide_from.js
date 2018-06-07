import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const responsiveSizesToClassNameMap = {
  xs: 'euiHideFor--xs',
  s:  'euiHideFor--s',
  m:  'euiHideFor--m',
  l:  'euiHideFor--l',
  xl:  'euiHideFor--xl',
}

export const RESPONSIVE_SIZES = Object.keys(responsiveSizesToClassNameMap);

export const EuiHideFor = ({
  children,
  className,
  sizes,
  ...rest,
}) => {

  const sizingClasses = sizes.map(function(item){
    return responsiveSizesToClassNameMap[item];
  });

  const classes = classNames(
    'euiHideFor',
    sizingClasses,
    className
  );

  return (
    <span
      className={classes}
      {...rest}
    >
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
