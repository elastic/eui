import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tabbable from 'tabbable';

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
  const [menuEl, setMenuEl] = useState();
  const [tabbables, setTabbables] = useState();
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
      handleClose();
    } else if (e.keyCode === keyCodes.TAB) {
      let tabs = tabbables;
      if (!tabs) {
        tabs = tabbable(menuEl).filter(el => el.tagName !== 'DIV');
        setTabbables(tabs);
      }
      if (
        (!e.shiftKey && document.activeElement === tabs[tabs.length - 1]) ||
        (e.shiftKey && document.activeElement === tabs[0])
      ) {
        handleClose();
      }
    }
  };

  const handleClose = (shouldReturnFocus = true) => {
    setTabbables(null);
    onClose(shouldReturnFocus);
  };

  return (
    <div
      className={classes}
      aria-labelledby={LABEL}
      onKeyDown={handleKeyDown}
      ref={setMenuEl}
      {...rest}>
      <EuiTitle className="euiNavDrawerFlyout__title" tabIndex="-1" size="xxs">
        <div id={LABEL}>{title}</div>
      </EuiTitle>
      {listItems ? (
        <EuiFocusTrap returnFocus={false}>
          <EuiNavDrawerGroup
            className="euiNavDrawerFlyout__listGroup"
            ariaLabelledby={LABEL}
            listItems={listItems}
            wrapText={wrapText}
            onClose={() => handleClose(false)}
          />
        </EuiFocusTrap>
      ) : null}
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
