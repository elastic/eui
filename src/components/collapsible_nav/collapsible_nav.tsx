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
  CSSProperties,
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
import { EuiOutsideClickDetector } from '../outside_click_detector';

export type EuiCollapsibleNavProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * ReactNode to render as this component's content
     */
    children?: ReactNode;
    /**
     * The fixed width of the nav flyout.
     * This width gets added as padding to the body element when `docked` and `affordForDisplacement = true`
     */
    width?: CSSProperties['width'];
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
     * Use an EuiOverlayMask to obscure the content beneath and receive the collapse click event.
     * If `false`, the nav will still automatically close when clicking on elements outside of the flyout
     */
    useOverlayMask?: boolean;
    /**
     * Adjustments to the EuiOverlayMask
     */
    maskProps?: EuiOverlayMaskProps;
    /**
     * Whether the component should apply padding on the document body element to afford for its own displacement when `docked`.
     * When false, requires manually applying padding to the added `.euiBody--collapsibleNavIsDocked` class.
     */
    affordForDisplacement?: boolean;
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
  useOverlayMask = true,
  maskProps,
  width = 320,
  style,
  affordForDisplacement = true,
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
      // start affording for displacement
      if (affordForDisplacement) document.body.style.paddingLeft = `${width}px`;
    } else if (isOpen) {
      document.body.classList.add('euiBody--collapsibleNavIsOpen');
      // stop affording for displacement
      if (affordForDisplacement) document.body.style.paddingLeft = '';
    }

    return () => {
      document.body.classList.remove('euiBody--collapsibleNavIsDocked');
      document.body.classList.remove('euiBody--collapsibleNavIsOpen');
      window.removeEventListener('resize', functionToCallOnWindowResize);
      // stop affording for displacement
      if (affordForDisplacement) document.body.style.paddingLeft = '';
    };
  }, [
    navIsDocked,
    functionToCallOnWindowResize,
    isOpen,
    width,
    affordForDisplacement,
  ]);

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
  if (!navIsDocked && useOverlayMask) {
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
          onMouseUpCapture: (e: React.MouseEvent<HTMLElement>) => {
            // When EuiOutsideClickDetector is enabled, we don't want both the toggle button and document clicks to happen, they'll cancel eachother out
            e.nativeEvent.stopImmediatePropagation();
          },
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

  const flyoutStyle = {
    width,
    ...style,
  };

  const flyout = (
    <>
      <EuiWindowEvent event="keydown" handler={onKeyDown} />
      {optionalOverlay}
      {/* Trap focus only when docked={false} */}
      <EuiFocusTrap disabled={navIsDocked} clickOutsideDisables={true}>
        {/* Outside click detector is needed if theres no overlay mask to auto-close when clicking on elements outside */}
        <EuiOutsideClickDetector
          isDisabled={useOverlayMask || navIsDocked}
          onOutsideClick={collapse}>
          <nav id={flyoutID} className={classes} style={flyoutStyle} {...rest}>
            {children}
            {closeButton}
          </nav>
        </EuiOutsideClickDetector>
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
