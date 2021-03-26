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
  useState,
} from 'react';
import classNames from 'classnames';
import { htmlIdGenerator } from '../../services';
import { EuiButtonEmptyProps } from '../button';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';

// Extend all the flyout props except `onClose` because we handle this internally
export type EuiCollapsibleNavProps = Omit<
  EuiFlyoutProps,
  'onClose' | 'closeButtonAriaLabel' | 'type' | 'pushBreakpoint'
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
   * Pixel value for customizing the minimum window width for enabling docking
   */
  dockedBreakpoint?: EuiFlyoutProps['pushBreakpoint'];
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
  onClose?: () => void;
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
  dockedBreakpoint = 'l', // Used as EuiFlyout.pushBreakpoint just different name
  // Extended EuiFlyout props we manipulate
  onClose,
  maskProps,
  // Setting different EuiFlyout defaults
  ownFocus = true,
  hideCloseButton = false,
  outsideClickCloses = true,
  size = 320,
  paddingSize = 'none',
  as = 'nav',
  side = 'left',
  ...rest
}) => {
  const [flyoutID] = useState(id || htmlIdGenerator()('euiCollapsibleNav'));

  const collapse = () => {
    // Skip collapsing if it is docked
    if (isDocked) {
      return;
    } else {
      onClose && onClose();
    }
  };

  const classes = classNames(
    'euiCollapsibleNav',
    // { 'euiCollapsibleNav--isDocked': navIsDocked },
    className
  );

  // Show a trigger button if one was passed but
  // not if navIsDocked and showButtonIfDocked is false
  const trigger =
    isDocked && !showButtonIfDocked
      ? undefined
      : button &&
        cloneElement(button as ReactElement, {
          'aria-controls': flyoutID,
          'aria-expanded': isOpen,
          'aria-pressed': isOpen,
          onMouseUpCapture: (e: React.MouseEvent<HTMLElement>) => {
            // When EuiOutsideClickDetector is enabled, we don't want both the toggle button and document clicks to happen, they'll cancel eachother out
            e.nativeEvent.stopImmediatePropagation();
          },
        });

  const flyout = (
    <>
      <EuiFlyout
        // Flyout props that can be overridden
        as={as}
        paddingSize={paddingSize}
        side={side}
        size={size}
        {...rest}
        // Flyout props we omitted because this component handles it differently
        type={isDocked ? 'push' : 'overlay'}
        onClose={onClose}
        pushBreakpoint={dockedBreakpoint}
        // Flyout props we extended but manipulate in this component
        id={flyoutID}
        className={classes}
        ownFocus={ownFocus}
        outsideClickCloses={outsideClickCloses}
        maskProps={{
          onClick: collapse,
          ...maskProps,
        }}
        hideCloseButton={isDocked || hideCloseButton}
        closeButtonPosition="outside"
        role={'none'}>
        {children}
      </EuiFlyout>
    </>
  );

  return (
    <>
      {trigger}
      {(isOpen || isDocked) && flyout}
    </>
  );
};
