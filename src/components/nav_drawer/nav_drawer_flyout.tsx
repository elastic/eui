import React, { useState, HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import tabbable from 'tabbable';

import { keyCodes } from '../../services';

import { EuiTitle } from '../title';
import { EuiNavDrawerGroup } from './nav_drawer_group';
import { EuiListGroupProps } from '../list_group/list_group';
import { EuiFocusTrap } from '../focus_trap';
import { CommonProps } from '../common';

export interface EuiNavDrawerFlyoutProps
  extends CommonProps, HTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean,
    title: string,
    listItems: EuiListGroupProps["listItems"],
    wrapText: EuiListGroupProps["wrapText"],
    onClose: (shouldReturnFocus: boolean) => void,
  }

export const EuiNavDrawerFlyout: FunctionComponent<EuiNavDrawerFlyoutProps> = ({
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
