import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiTitle } from '../title';
import { EuiListGroup } from '../list_group';

export const EuiNavDrawerFlyout = ({ children, className, title, isCollapsed, listItems, ...rest }) => {
  const classes = classNames(
    'euiNavDrawerFlyout',
    {
      'euiNavDrawerFlyout-isCollapsed': isCollapsed,
      'euiNavDrawerFlyout-isExpanded': !isCollapsed,
    },
    className
  );

  return (
    <div
      className={classes}
      aria-labelledby="navDrawerFlyoutTitle"
      {...rest}
    >
      {children}
      <EuiTitle tabIndex="-1" size="xxs"><h5 id="navDrawerFlyoutTitle">{title}</h5></EuiTitle>
      <EuiListGroup className="euiNavDrawerFlyout__listGroup" listItems={listItems} />
    </div>
  );
};

EuiNavDrawerFlyout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  /**
   * Display a title atop the flyout
   */
  title: PropTypes.string,

  /**
   * Toggle the nav drawer between collapsed and expanded
   */
  isCollapsed: PropTypes.bool,
};

EuiNavDrawerFlyout.defaultProps = {
  isCollapsed: true,
};