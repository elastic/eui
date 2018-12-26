import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiNavDrawer = ({ children, className, isCollapsed, ...rest }) => {
  const classes = classNames(
    'euiNavDrawer',
    {
      'euiNavDrawer-isCollapsed': isCollapsed,
      'euiNavDrawer-isExpanded': !isCollapsed,
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

EuiNavDrawer.propTypes = {
  className: PropTypes.string,

  /**
   * Toggle the nav drawer between collapsed and expanded
   */
  isCollapsed: PropTypes.bool,
};

EuiNavDrawer.defaultProps = {
  isCollapsed: true,
};