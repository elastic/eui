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
  EuiBreakpointSize,
  isWithinMinBreakpoint,
} from '../../services';
import { EuiButtonEmptyProps } from '../button';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';
import { throttle } from '../color_picker/utils';

// Extend all the flyout props except `onClose` because we handle this internally
export type EuiCollapsibleNavProps = Omit<
  EuiFlyoutProps,
  'closeButtonAriaLabel' | 'type'
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
  dockedBreakpoint?: EuiBreakpointSize | number;
  /**
   * Button for controlling visible state of the nav
   */
  button?: ReactElement;
  /**
   * Keeps the display of toggle button when in docked state
   */
  showButtonIfDocked?: boolean;
  /**
   * Extend the props of the close button, an EuiButtonEmpty
   */
  closeButtonProps?: EuiButtonEmptyProps;
  // onClose?: () => void;
};

export const EuiCollapsibleNav: FunctionComponent<EuiCollapsibleNavProps> = ({
  id,
  children,
  className,
  isDocked = false,
  isOpen = false,
  button,
  showButtonIfDocked = false,
  closeButtonProps,
  dockedBreakpoint = 'l',
  // Extended EuiFlyout props we manipulate
  onClose,
  maskProps,
  // Setting different EuiFlyout defaults
  ownFocus = true,
  size = 320,
  paddingSize = 'none',
  as = 'nav',
  side = 'left',
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
      // Only add the event listener if we'll need to accomodate with padding
      window.addEventListener('resize', functionToCallOnWindowResize);
    }

    return () => {
      if (isDocked) {
        window.removeEventListener('resize', functionToCallOnWindowResize);
      }
    };
  }, [isDocked, functionToCallOnWindowResize]);

  const collapse = () => {
    // Skip collapsing if it is docked
    if (navIsDocked) {
      return;
    } else {
      onClose && onClose();
    }
  };

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
          onMouseUpCapture: (e: React.MouseEvent<HTMLElement>) => {
            // When EuiOutsideClickDetector is enabled, we don't want both the toggle button and document clicks to happen, they'll cancel eachother out
            e.nativeEvent.stopImmediatePropagation(); //TODO: Broken again
          },
        });

  const flyout = (
    <EuiFlyout
      // Flyout props that can be overridden
      as={as}
      paddingSize={paddingSize}
      side={side}
      size={size}
      {...rest}
      // Flyout props we omitted because this component handles it differently
      type={navIsDocked ? 'push' : 'overlay'}
      onClose={onClose}
      // Flyout props we extended but manipulate in this component
      id={flyoutID}
      className={classes}
      ownFocus={ownFocus}
      outsideClickCloses={true}
      maskProps={{
        onClick: collapse,
        ...maskProps,
      }}
      hideCloseButton={navIsDocked}
      closeButtonPosition="outside"
      role={'none'}>
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
