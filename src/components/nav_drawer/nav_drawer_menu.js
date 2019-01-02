import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiNavDrawerMenu = ({ children, className, isCollapsed, ...rest }) => {
  const classes = classNames(
    'euiNavDrawerMenu',
    {
      'euiNavDrawerMenu-isCollapsed': isCollapsed,
      'euiNavDrawerMenu-isExpanded': !isCollapsed,
    },
    className
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiNavDrawerMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  /**
   * Toggle the nav drawer between collapsed and expanded
   */
  isCollapsed: PropTypes.bool,
};

EuiNavDrawerMenu.defaultProps = {
  isCollapsed: true,
};