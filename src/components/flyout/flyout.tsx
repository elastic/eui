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
  FunctionComponent,
  CSSProperties,
  Fragment,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';
import classnames from 'classnames';

import { keys, EuiWindowEvent, useCombinedRefs } from '../../services';

import { CommonProps, keysOf } from '../common';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask, EuiOverlayMaskProps } from '../overlay_mask';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import {
  EuiBreakpointSize,
  isWithinMinBreakpoint,
} from '../../services/breakpoint';
import { useResizeObserver } from '../observer/resize_observer';
import { throttle } from 'lodash';
import { EuiOutsideClickDetector } from '../outside_click_detector';

const typeToClassNameMap = {
  push: 'euiFlyout--push',
  overlay: null,
};

export const TYPES = keysOf(typeToClassNameMap);
type _EuiFlyoutType = typeof TYPES[number];

const sideToClassNameMap = {
  left: 'euiFlyout--left',
  right: null,
};

export const SIDES = keysOf(sideToClassNameMap);
type _EuiFlyoutSide = typeof SIDES[number];

const sizeToClassNameMap = {
  s: 'euiFlyout--small',
  m: 'euiFlyout--medium',
  l: 'euiFlyout--large',
};

export const SIZES = keysOf(sizeToClassNameMap);
type _EuiFlyoutSize = typeof SIZES[number];

/**
 * Custom type checker for named flyout sizes since the prop
 * `size` can also be CSSProperties['width'] (string | number)
 */
function isEuiFlyoutSizeNamed(value: any): value is _EuiFlyoutSize {
  return SIZES.includes(value as any);
}

const paddingSizeToClassNameMap = {
  none: 'euiFlyout--paddingNone',
  s: 'euiFlyout--paddingSmall',
  m: 'euiFlyout--paddingMedium',
  l: 'euiFlyout--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);
export type EuiFlyoutPaddingSize = typeof PADDING_SIZES[number];

export interface EuiFlyoutProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  /**
   * Defines the width of the panel.
   * Pass a predefined size of `s | m | l`, or pass any number/string compatabile with the CSS `width` attribute
   */
  size?: _EuiFlyoutSize | CSSProperties['width'];
  /**
   * Customize the padding around the content of the flyout header, body and footer
   */
  paddingSize?: EuiFlyoutPaddingSize;
  /**
   * Hides the default close button. You must provide another close button somewhere within the flyout.
   */
  hideCloseButton?: boolean;
  /**
   * Adds an EuiOverlayMask when set to `true`
   */
  ownFocus?: boolean;
  /**
   * Specify an aria-label for the close button of the flyout.
   * Default is `'Close this dialog'`.
   */
  closeButtonAriaLabel?: string;
  /**
   * Sets the max-width of the panel,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth?: boolean | number | string;
  /**
   * Adjustments to the EuiOverlayMask that is added when `ownFocus = true`
   */
  maskProps?: EuiOverlayMaskProps;
  /**
   * How to display the the flyout in relation to the body content;
   * `push` keeps it visible, pushing the `<body>` content via padding
   */
  type?: _EuiFlyoutType;
  /**
   * Pushed flyouts will squish the body too much.
   * Customize this minimum breakpoint for enabling pushing
   */
  pushBreakpoint?: EuiBreakpointSize | number;
  /**
   * Forces this interaction on the mask overlay or body content.
   * Defaults depend on `ownFocus` and `type` values
   */
  outsideClickCloses?: boolean;
  /**
   * Which side of the window to attach to.
   * The `right` option should only be used for navigation.
   */
  side?: _EuiFlyoutSide;
}

export const EuiFlyout: FunctionComponent<EuiFlyoutProps> = ({
  className,
  children,
  hideCloseButton = false,
  onClose,
  ownFocus = false,
  side = 'right',
  size = 'm',
  paddingSize = 'l',
  closeButtonAriaLabel,
  maxWidth = false,
  style,
  maskProps,
  type = 'overlay',
  pushBreakpoint = 'l',
  outsideClickCloses = false,
  ...rest
}) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      onClose();
    }
  };

  const [isPushed, setWindowIsLargeEnoughToPush] = useState(
    type === 'push' &&
      isWithinMinBreakpoint(
        typeof window === 'undefined' ? 0 : window.innerWidth,
        pushBreakpoint
      )
  );

  const functionToCallOnWindowResize = throttle(() => {
    if (isWithinMinBreakpoint(window.innerWidth, pushBreakpoint)) {
      setWindowIsLargeEnoughToPush(true);
    } else {
      setWindowIsLargeEnoughToPush(false);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  const [resizeRef, setResizeRef] = useState<HTMLDivElement | null>(null);
  const setRef = useCombinedRefs([setResizeRef]);
  // TODO: Allow this hooke to be conditional
  const dimensions = useResizeObserver(resizeRef);

  useEffect(() => {
    document.body.classList.add('euiBody--hasFlyout');

    if (type === 'push') {
      window.addEventListener('resize', functionToCallOnWindowResize);
    }

    if (isPushed) {
      if (side === 'right') {
        document.body.style.paddingRight = `${dimensions.width}px`;
      } else if (side === 'left') {
        document.body.style.paddingLeft = `${dimensions.width}px`;
      }
    }

    return () => {
      document.body.classList.remove('euiBody--hasFlyout');

      if (type === 'push') {
        window.removeEventListener('resize', functionToCallOnWindowResize);

        if (side === 'right') {
          document.body.style.paddingRight = '';
        } else if (side === 'left') {
          document.body.style.paddingLeft = '';
        }
      }
    };
  }, [type, side, dimensions, isPushed, functionToCallOnWindowResize]);

  let newStyle;
  let widthClassName;
  let sizeClassName;

  // Setting max-width
  if (maxWidth === true) {
    widthClassName = 'euiFlyout--maxWidth-default';
  } else if (maxWidth !== false) {
    const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    newStyle = { ...style, maxWidth: value };
  }

  // Setting size
  if (isEuiFlyoutSizeNamed(size)) {
    sizeClassName = sizeToClassNameMap[size];
  } else if (newStyle) {
    newStyle.width = size;
  } else {
    newStyle = { ...style, width: size };
  }

  const classes = classnames(
    'euiFlyout',
    typeToClassNameMap[type],
    sideToClassNameMap[side],
    sizeClassName,
    paddingSizeToClassNameMap[paddingSize],
    widthClassName,
    className
  );

  let closeButton;
  if (onClose && !hideCloseButton) {
    closeButton = (
      <EuiI18n token="euiFlyout.closeAriaLabel" default="Close this dialog">
        {(closeAriaLabel: string) => (
          <EuiButtonIcon
            className="euiFlyout__closeButton"
            iconType="cross"
            color="text"
            aria-label={closeButtonAriaLabel || closeAriaLabel}
            onClick={() => {
              onClose();
            }}
            data-test-subj="euiFlyoutCloseButton"
          />
        )}
      </EuiI18n>
    );
  }

  const flyoutContent = (
    <div
      role="dialog"
      className={classes}
      tabIndex={0}
      style={newStyle || style}
      // @ts-ignore TODO
      ref={setRef}
      {...rest}>
      {closeButton}
      {children}
    </div>
  );

  // If ownFocus is set, show an overlay behind the flyout and allow the user
  // to click it to close it.
  let optionalOverlay;
  if (ownFocus && !isPushed) {
    optionalOverlay = (
      <EuiOverlayMask
        onClick={onClose}
        headerZindexLocation="below"
        {...maskProps}
      />
    );
  }

  return (
    <Fragment>
      <EuiWindowEvent event="keydown" handler={onKeyDown} />
      {optionalOverlay}
      {/*
       * Trap focus even when `ownFocus={false}`, otherwise closing
       * the flyout won't return focus to the originating button.
       *
       * Set `clickOutsideDisables={true}` when `ownFocus={false}`
       * to allow non-keyboard users the ability to interact with
       * elements outside the flyout.
       */}
      <EuiFocusTrap clickOutsideDisables={!ownFocus || isPushed}>
        {/* Outside click detector is needed if theres no overlay mask to auto-close when clicking on elements outside */}
        <EuiOutsideClickDetector
          isDisabled={!outsideClickCloses}
          onOutsideClick={() => onClose()}>
          {flyoutContent}
        </EuiOutsideClickDetector>
      </EuiFocusTrap>
    </Fragment>
  );
};
