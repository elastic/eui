import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiNavDrawer = ({ children, className, isCollapsed, flyoutIsCollapsed, flyoutIsAnimating, hasDelay, ...rest }) => {
  const classes = classNames(
    'euiNavDrawer',
    {
      'euiNavDrawer-isCollapsed': isCollapsed,
      'euiNavDrawer-isExpanded': !isCollapsed,
      'euiNavDrawer-flyoutIsCollapsed': flyoutIsCollapsed,
      'euiNavDrawer-flyoutIsExpanded': !flyoutIsCollapsed,
      'euiNavDrawer-flyoutIsAnimating': flyoutIsAnimating,
      'euiNavDrawer-isDelayed': hasDelay,
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

  /**
   * Toggle the flyout menu between collapsed and expanded
   */
  flyoutIsCollapsed: PropTypes.bool,
  flyoutIsAnimatigng: PropTypes.bool,
  hasDelay: PropTypes.bool,
};

EuiNavDrawer.defaultProps = {
  isCollapsed: true,
};