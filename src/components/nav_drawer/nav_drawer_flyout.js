import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiTitle } from '../title';
import { EuiNavDrawerGroup } from './nav_drawer_group';
import { EuiListGroup } from '../list_group/list_group';

export const EuiNavDrawerFlyout = ({
  className,
  title,
  isCollapsed,
  listItems,
  wrapText,
  ...rest
}) => {
  const classes = classNames(
    'euiNavDrawerFlyout',
    {
      'euiNavDrawerFlyout-isCollapsed': isCollapsed,
      'euiNavDrawerFlyout-isExpanded': !isCollapsed,
    },
    className
  );

  return (
    <div className={classes} aria-labelledby="navDrawerFlyoutTitle" {...rest}>
      <EuiTitle className="euiNavDrawerFlyout__title" tabIndex="-1" size="xxs">
        <div id="navDrawerFlyoutTitle">{title}</div>
      </EuiTitle>
      <EuiNavDrawerGroup
        className="euiNavDrawerFlyout__listGroup"
        listItems={listItems}
        wrapText={wrapText}
      />
    </div>
  );
};

EuiNavDrawerFlyout.propTypes = {
  className: PropTypes.string,
  listItems: EuiListGroup.propTypes.listItems,
  wrapText: EuiListGroup.propTypes.wrapText,

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
