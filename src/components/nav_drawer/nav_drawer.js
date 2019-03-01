import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiNavDrawer = ({
  children,
  className,
  isCollapsed,
  flyoutIsCollapsed,
  flyoutIsAnimating,
  mobileIsHidden,
  showScrollbar,
  ...rest
}) => {
  const classes = classNames(
    'euiNavDrawer',
    {
      'euiNavDrawer-isCollapsed': isCollapsed,
      'euiNavDrawer-isExpanded': !isCollapsed,
      'euiNavDrawer-flyoutIsCollapsed': flyoutIsCollapsed,
      'euiNavDrawer-flyoutIsExpanded': !flyoutIsCollapsed,
      'euiNavDrawer-flyoutIsAnimating': flyoutIsAnimating,
      'euiNavDrawer-mobileIsHidden': mobileIsHidden,
      'euiNavDrawer-showScrollbar': showScrollbar,
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
   * Toggle the nav drawer between collapsed (docked) and expanded
   */
  isCollapsed: PropTypes.bool,
  mobileIsHidden: PropTypes.bool,

  /**
   * Toggle the flyout menu between collapsed and expanded
   */
  flyoutIsCollapsed: PropTypes.bool,
  flyoutIsAnimating: PropTypes.bool,

  showScrollbar: PropTypes.bool,
};

EuiNavDrawer.defaultProps = {
  isCollapsed: true,
  mobileIsHidden: true,
  flyoutIsCollapsed: true,
  flyoutIsAnimating: false,
  showScrollbar: false,
};