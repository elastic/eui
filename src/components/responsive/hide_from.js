import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const responsiveSizesToClassNameMap = {
  xs: 'euiHideFrom--xs',
  s:  'euiHideFrom--s',
  m:  'euiHideFrom--m',
  l:  'euiHideFrom--l',
  xl:  'euiHideFrom--xl',
}

const RESPONSIVE_SIZES = Object.keys(responsiveSizesToClassNameMap);

export const EuiHideFrom = ({
  children,
  className,
  sizes,
  ...rest,
}) => {

  const sizingClasses = sizes.map(function(item){
    return responsiveSizesToClassNameMap[item];
  });

  const classes = classNames(
    'euiHideFrom',
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

EuiHideFrom.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * List of all the responsive sizes to hide the children from
   */
  sizes: PropTypes.arrayOf(PropTypes.oneOf(RESPONSIVE_SIZES)).isRequired,
};
