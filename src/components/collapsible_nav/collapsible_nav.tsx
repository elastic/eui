/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  cloneElement,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  htmlIdGenerator,
  isWithinMinBreakpoint,
  throttle,
} from '../../services';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';

// Extend all the flyout props except `onClose` because we handle this internally
export type EuiCollapsibleNavProps = Omit<
  EuiFlyoutProps,
  'closeButtonAriaLabel' | 'type' | 'pushBreakpoint'
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
   * Named breakpoint or pixel value for customizing the minimum window width to enable docking
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
  as = 'nav' as EuiCollapsibleNavProps['as'],
  size = 320,
  side = 'left',
  role = null,
  ownFocus = true,
  outsideClickCloses = true,
  closeButtonPosition = 'outside',
  paddingSize = 'none',
  ...rest
}) => {
  const [flyoutID] = useState(id || htmlIdGenerator()('euiCollapsibleNav'));

  /**
   * Setting the initial state of pushed based on the `type` prop
   * and if the current window size is large enough (larger than `pushBreakpoint`)
   */
  const [windowIsLargeEnoughToPush, setWindowIsLargeEnoughToPush] = useState(
    isWithinMinBreakpoint(
      typeof window === 'undefined' ? 0 : window.innerWidth,
      dockedBreakpoint
    )
  );

  const navIsDocked = isDocked && windowIsLargeEnoughToPush;

  /**
   * Watcher added to the window to maintain `isPushed` state depending on
   * the window size compared to the `pushBreakpoint`
   */
  const functionToCallOnWindowResize = throttle(() => {
    if (isWithinMinBreakpoint(window.innerWidth, dockedBreakpoint)) {
      setWindowIsLargeEnoughToPush(true);
    } else {
      setWindowIsLargeEnoughToPush(false);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  useEffect(() => {
    if (isDocked) {
      // Only add the event listener if we'll need to accommodate with padding
      window.addEventListener('resize', functionToCallOnWindowResize);
    }

    return () => {
      if (isDocked) {
        window.removeEventListener('resize', functionToCallOnWindowResize);
      }
    };
  }, [isDocked, functionToCallOnWindowResize]);

  const classes = classNames('euiCollapsibleNav', className);

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
        });

  const flyout = (
    <EuiFlyout
      id={flyoutID}
      className={classes}
      // Flyout props we set different defaults for
      as={as}
      size={size}
      side={side}
      role={role}
      ownFocus={ownFocus}
      outsideClickCloses={outsideClickCloses}
      closeButtonPosition={closeButtonPosition}
      paddingSize={paddingSize}
      {...rest}
      // Props dependent on internal docked status
      type={navIsDocked ? 'push' : 'overlay'}
      hideCloseButton={navIsDocked}
      pushMinBreakpoint={dockedBreakpoint}>
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
