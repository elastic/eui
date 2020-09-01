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
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { throttle } from '../color_picker/utils';
import { EuiWindowEvent, htmlIdGenerator, keys } from '../../services';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask, EuiOverlayMaskProps } from '../overlay_mask';
import { CommonProps } from '../common';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { EuiI18n } from '../i18n';
import { EuiScreenReaderOnly } from '../accessibility';

export type EuiCollapsibleNavProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * ReactNode to render as this component's content
     */
    children?: ReactNode;
    /**
     * Keeps navigation flyout visible and push `<body>` content via padding
     */
    isDocked?: boolean;
    /**
     * Pixel value for customizing the minimum window width for enabling docking
     */
    dockedBreakpoint?: number;
    /**
     * Shows the navigation flyout
     */
    isOpen?: boolean;
    /**
     * Button for controlling visible state of the nav
     */
    button?: ReactElement;
    /**
     * Keeps the display of toggle button when in docked state
     */
    showButtonIfDocked?: boolean;
    /**
     * Keeps the display of floating close button.
     * If `false`, you must then keep the `button` displayed at all breakpoints.
     */
    showCloseButton?: boolean;
    /**
     * Extend the props of the close button, an EuiButtonEmpty
     */
    closeButtonProps?: EuiButtonEmptyProps;
    onClose?: () => void;
    /**
     * Adjustments to the EuiOverlayMask
     */
    maskProps?: EuiOverlayMaskProps;
  };

export const EuiCollapsibleNav: FunctionComponent<EuiCollapsibleNavProps> = ({
  children,
  className,
  isDocked = false,
  isOpen = false,
  button,
  showButtonIfDocked = false,
  dockedBreakpoint = 992,
  showCloseButton = true,
  closeButtonProps,
  onClose,
  id,
  maskProps,
  ...rest
}) => {
  const [flyoutID] = useState(id || htmlIdGenerator()('euiCollapsibleNav'));
  const [windowIsLargeEnoughToDock, setWindowIsLargeEnoughToDock] = useState(
    (typeof window === 'undefined' ? Infinity : window.innerWidth) >=
      dockedBreakpoint
  );
  const navIsDocked = isDocked && windowIsLargeEnoughToDock;

  const functionToCallOnWindowResize = throttle(() => {
    if (window.innerWidth < dockedBreakpoint) {
      setWindowIsLargeEnoughToDock(false);
    } else {
      setWindowIsLargeEnoughToDock(true);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  // Watch for docked status and appropriately add/remove body classes and resize handlers
  useEffect(() => {
    window.addEventListener('resize', functionToCallOnWindowResize);

    if (navIsDocked) {
      document.body.classList.add('euiBody--collapsibleNavIsDocked');
    } else if (isOpen) {
      document.body.classList.add('euiBody--collapsibleNavIsOpen');
    }

    return () => {
      document.body.classList.remove('euiBody--collapsibleNavIsDocked');
      document.body.classList.remove('euiBody--collapsibleNavIsOpen');
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [navIsDocked, functionToCallOnWindowResize, isOpen]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      collapse();
    }
  };

  const collapse = () => {
    // Skip collapsing if it is docked
    if (navIsDocked) {
      return;
    } else {
      onClose && onClose();
    }
  };

  const classes = classNames(
    'euiCollapsibleNav',
    { 'euiCollapsibleNav--isDocked': navIsDocked },
    className
  );

  let optionalOverlay;
  if (!navIsDocked) {
    optionalOverlay = (
      <EuiOverlayMask
        onClick={collapse}
        headerZindexLocation="below"
        {...maskProps}
      />
    );
  }

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
          className: classNames(
            button.props.className,
            'euiCollapsibleNav__toggle'
          ),
        });

  const closeButton = showCloseButton && (
    <EuiScreenReaderOnly showOnFocus>
      <EuiButtonEmpty
        onClick={collapse}
        size="xs"
        textProps={{ className: 'euiCollapsibleNav__closeButtonText' }}
        iconType="cross"
        {...closeButtonProps}
        className={classNames(
          'euiCollapsibleNav__closeButton',
          closeButtonProps && closeButtonProps.className
        )}>
        <EuiI18n token="euiCollapsibleNav.closeButtonLabel" default="close" />
      </EuiButtonEmpty>
    </EuiScreenReaderOnly>
  );

  const flyout = (
    <>
      <EuiWindowEvent event="keydown" handler={onKeyDown} />
      {optionalOverlay}
      {/* Trap focus only when docked={false} */}
      <EuiFocusTrap disabled={navIsDocked} clickOutsideDisables={true}>
        <nav id={flyoutID} className={classes} {...rest}>
          {children}
          {closeButton}
        </nav>
      </EuiFocusTrap>
    </>
  );

  return (
    <>
      {trigger}
      {(isOpen || navIsDocked) && flyout}
    </>
  );
};
