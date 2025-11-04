/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  cloneElement,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useRef,
} from 'react';
import classNames from 'classnames';
import {
  useEuiMemoizedStyles,
  useGeneratedHtmlId,
  useIsWithinMinBreakpoint,
  useCombinedRefs,
} from '../../services';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';
import { euiCollapsibleNavStyles } from './collapsible_nav.styles';

// Extend all the flyout props except `onClose` because we handle this internally
export type EuiCollapsibleNavProps = Omit<
  EuiFlyoutProps<'nav' | 'div'>,
  'type' | 'pushBreakpoint'
> & {
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
  /**
   * Shows the navigation flyout
   */
  isOpen?: boolean;
  /**
   * Keeps navigation flyout visible and push `<body>` content via padding
   */
  isDocked?: boolean;
  /**
   * Named breakpoint (`xs` through `xl`) for customizing the minimum window width to enable docking
   */
  dockedBreakpoint?: EuiFlyoutProps['pushMinBreakpoint'];
  /**
   * Button for controlling visible state of the nav
   */
  button?: ReactElement;
  /**
   * Keeps the display of toggle button when in docked state
   */
  showButtonIfDocked?: boolean;
};

export const EuiCollapsibleNav: FunctionComponent<EuiCollapsibleNavProps> = ({
  id,
  children,
  className,
  isDocked = false,
  isOpen = false,
  button,
  showButtonIfDocked = false,
  dockedBreakpoint = 'l',
  // Setting different EuiFlyout defaults
  as = 'nav',
  size = 320,
  side = 'left',
  ownFocus = true,
  outsideClickCloses = true,
  closeButtonPosition = 'outside',
  paddingSize = 'none',
  focusTrapProps: _focusTrapProps = {},
  ...rest
}) => {
  const flyoutID = useGeneratedHtmlId({
    conditionalId: id,
    suffix: 'euiCollapsibleNav',
  });
  const buttonRef = useRef();
  const combinedButtonRef = useCombinedRefs([button?.props.ref, buttonRef]);
  const focusTrapProps: EuiFlyoutProps['focusTrapProps'] = {
    ..._focusTrapProps,
    shards: [buttonRef, ...(_focusTrapProps.shards || [])],
  };

  const windowIsLargeEnoughToPush = useIsWithinMinBreakpoint(dockedBreakpoint);
  const navIsDocked = isDocked && windowIsLargeEnoughToPush;
  const flyoutType = navIsDocked ? 'push' : 'overlay';

  const classes = classNames('euiCollapsibleNav', className);
  const styles = useEuiMemoizedStyles(euiCollapsibleNavStyles);
  const cssStyles = [styles.euiCollapsibleNav, styles[flyoutType]];

  // Show a trigger button if one was passed but
  // not if navIsDocked and showButtonIfDocked is false
  const trigger =
    navIsDocked && !showButtonIfDocked
      ? undefined
      : button &&
        cloneElement(button as ReactElement, {
          'aria-controls': flyoutID,
          'aria-expanded': isOpen,
          'aria-pressed': isOpen,
          // When EuiOutsideClickDetector is enabled, we don't want both the toggle button and document touches/clicks to happen, they'll cancel eachother out
          onTouchEnd: (e: React.MouseEvent<HTMLElement>) => {
            e.nativeEvent.stopImmediatePropagation();
          },
          onMouseUpCapture: (e: React.MouseEvent<HTMLElement>) => {
            e.nativeEvent.stopImmediatePropagation();
          },
          ref: combinedButtonRef,
        });

  const flyout = (
    <EuiFlyout
      id={flyoutID}
      css={cssStyles}
      className={classes}
      // Flyout props we set different defaults for
      as={as}
      size={size}
      side={side}
      ownFocus={ownFocus}
      outsideClickCloses={outsideClickCloses}
      closeButtonPosition={closeButtonPosition}
      paddingSize={paddingSize}
      focusTrapProps={focusTrapProps}
      {...rest}
      // Props dependent on internal docked status
      type={flyoutType}
      hideCloseButton={navIsDocked}
      pushMinBreakpoint={dockedBreakpoint}
    >
      {children}
    </EuiFlyout>
  );

  return (
    <>
      {trigger}
      {(isOpen || navIsDocked) && flyout}
    </>
  );
};
