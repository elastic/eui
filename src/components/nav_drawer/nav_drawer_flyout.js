import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { keyCodes } from '../../services';

import { EuiTitle } from '../title';
import { EuiNavDrawerGroup } from './nav_drawer_group';
import { EuiListGroup } from '../list_group/list_group';
import { EuiFocusTrap } from '../focus_trap';

export const EuiNavDrawerFlyout = ({
  className,
  title,
  isCollapsed,
  listItems,
  wrapText,
  onClose,
  ...rest
}) => {
  const LABEL = 'navDrawerFlyoutTitle';
  const classes = classNames(
    'euiNavDrawerFlyout',
    {
      'euiNavDrawerFlyout-isCollapsed': isCollapsed,
      'euiNavDrawerFlyout-isExpanded': !isCollapsed,
    },
    className
  );

  const handleKeyDown = e => {
    if (e.keyCode === keyCodes.ESCAPE) {
      onClose();
    }
  };

  return (
    <div role="dialog" className={classes} aria-labelledby={LABEL} {...rest}>
      <div onKeyDown={handleKeyDown}>
        <EuiTitle
          className="euiNavDrawerFlyout__title"
          tabIndex="-1"
          size="xxs">
          <div id={LABEL}>{title}</div>
        </EuiTitle>
        <EuiFocusTrap returnFocus={false}>
          <EuiNavDrawerGroup
            className="euiNavDrawerFlyout__listGroup"
            ariaLabelledby={LABEL}
            listItems={listItems}
            wrapText={wrapText}
            onClose={() => onClose(false)}
          />
        </EuiFocusTrap>
      </div>
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

  /**
   * Passthrough function to be called when the flyout is closing
   * See ./nav_drawer.js
   */
  onClose: PropTypes.func,
};

EuiNavDrawerFlyout.defaultProps = {
  isCollapsed: true,
};
