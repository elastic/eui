import React, {
  useState,
  FunctionComponent,
  KeyboardEventHandler,
  HTMLAttributes,
  useRef,
} from 'react';
import classNames from 'classnames';
import tabbable from 'tabbable';

import { keyCodes } from '../../services';

import { EuiTitle } from '../title';
import { EuiNavDrawerGroup, FlyoutMenuItem } from './nav_drawer_group';
import { EuiListGroupProps } from '../list_group/list_group';
import { EuiFocusTrap } from '../focus_trap';
import { CommonProps } from '../common';

export interface EuiNavDrawerFlyoutProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Toggle the nav drawer between collapsed and expanded
   */
  isCollapsed?: boolean;

  listItems?: FlyoutMenuItem[] | null;

  /**
   * Passthrough function to be called when the flyout is closing
   * @see `EuiNavDrawer`
   */
  onClose?: (shouldReturnFocus?: boolean) => void;

  /**
   * Display a title atop the flyout
   */
  title?: string;

  wrapText?: EuiListGroupProps['wrapText'];
}

export const EuiNavDrawerFlyout: FunctionComponent<EuiNavDrawerFlyoutProps> = ({
  className,
  isCollapsed = true,
  listItems,
  onClose,
  title,
  wrapText = false,
  ...rest
}) => {
  const menuElementRef = useRef<HTMLDivElement>(null);
  const [
    tabbables,
    setTabbables,
  ] = useState<Array<HTMLElement | null> | null>();
  const LABEL = 'navDrawerFlyoutTitle';
  const classes = classNames(
    'euiNavDrawerFlyout',
    {
      'euiNavDrawerFlyout-isCollapsed': isCollapsed,
      'euiNavDrawerFlyout-isExpanded': !isCollapsed,
    },
    className
  );

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      handleClose();
    } else if (event.keyCode === keyCodes.TAB) {
      let tabs = tabbables;
      if (!tabs && menuElementRef.current) {
        tabs = tabbable(menuElementRef.current).filter(
          element => element.tagName !== 'DIV'
        );
        setTabbables(tabs);
      }
      if (!tabs) {
        return;
      }
      if (
        (!event.shiftKey && document.activeElement === tabs[tabs.length - 1]) ||
        (event.shiftKey && document.activeElement === tabs[0])
      ) {
        handleClose();
      }
    }
  };

  const handleClose = (shouldReturnFocus = true) => {
    setTabbables(null);
    if (onClose) {
      onClose(shouldReturnFocus);
    }
  };

  return (
    <div
      className={classes}
      aria-labelledby={LABEL}
      onKeyDown={handleKeyDown}
      ref={menuElementRef}
      {...rest}>
      <EuiTitle className="euiNavDrawerFlyout__title" size="xxs">
        <div id={LABEL} tabIndex={-1}>
          {title}
        </div>
      </EuiTitle>
      {listItems ? (
        <EuiFocusTrap returnFocus={false}>
          <EuiNavDrawerGroup
            className="euiNavDrawerFlyout__listGroup"
            aria-labelledby={LABEL}
            listItems={listItems}
            wrapText={wrapText}
            onClose={() => handleClose(false)}
          />
        </EuiFocusTrap>
      ) : null}
    </div>
  );
};
