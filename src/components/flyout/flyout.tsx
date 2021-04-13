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
  CSSProperties,
  Fragment,
  ComponentType,
  useEffect,
  useState,
  ComponentProps,
  PropsWithChildren,
  ReactNode,
} from 'react';
import classnames from 'classnames';

import { keys, EuiWindowEvent, useCombinedRefs } from '../../services';

import { CommonProps, keysOf } from '../common';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask, EuiOverlayMaskProps } from '../overlay_mask';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiOutsideClickDetector } from '../outside_click_detector';
import { HTMLAttributes } from 'enzyme';

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
type _EuiFlyoutPaddingSize = typeof PADDING_SIZES[number];

type ComponentTypes = keyof JSX.IntrinsicElements | ComponentType<any>;

export type EuiFlyoutProps<T extends ComponentTypes = 'div'> = CommonProps &
  ComponentProps<T> & {
    onClose: () => void;
    /**
     * Sets the HTML element for `EuiFlyout`
     */
    as?: T;
    /**
     * Defines the width of the panel.
     * Pass a predefined size of `s | m | l`, or pass any number/string compatabile with the CSS `width` attribute
     */
    size?: _EuiFlyoutSize | CSSProperties['width'];
    /**
     * Sets the max-width of the panel,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    maxWidth?: boolean | number | string;
    /**
     * Customize the padding around the content of the flyout header, body and footer
     */
    paddingSize?: _EuiFlyoutPaddingSize;
    /**
     * Adds an EuiOverlayMask when set to `true`
     */
    ownFocus?: boolean;
    /**
     * Hides the default close button. You must provide another close button somewhere within the flyout.
     */
    hideCloseButton?: boolean;
    /**
     * Specify an aria-label for the close button of the flyout.
     * Default is `'Close this dialog'`.
     */
    closeButtonAriaLabel?: string;
    /**
     * Pass an entirely custom close button component
     */
    closeButton?: ReactNode;
    /**
     * Position of close button.
     * `inside`: Floating to just inside the flyout, always top right;
     * `outside`: Floating just outside the flyout near the top (side dependent on `side`). Helpful when the close button may cover other interactable content.
     */
    closeButtonPosition?: 'inside' | 'outside';
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
     * Forces this interaction on the mask overlay or body content.
     * Defaults depend on `ownFocus` and `type` values
     */
    outsideClickCloses?: boolean;
    /**
     * Which side of the window to attach to.
     * The `right` option should only be used for navigation.
     */
    side?: _EuiFlyoutSide;
    /**
     * Defaults to `dialog` which is best for most cases of the flyout.
     * Otherwise pass in your own, aria-role, or `none` to remove it and use the semantic `as` element instead
     */
    role?: 'none' | HTMLAttributes['role'];
  };

export const EuiFlyout = <T extends ComponentTypes>({
  className,
  children,
  as: Element = 'div' as T,
  hideCloseButton = false,
  closeButton,
  closeButtonAriaLabel,
  closeButtonPosition = 'inside',
  onClose,
  ownFocus = false,
  side = 'right',
  size = 'm',
  paddingSize = 'l',
  maxWidth = false,
  style,
  maskProps,
  type = 'overlay',
  outsideClickCloses = false,
  role = 'dialog',
  ...rest
}: PropsWithChildren<EuiFlyoutProps<T>>) => {
  /**
   * ESC key closes flyout (always?)
   */
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      onClose();
    }
  };

  const isPushed = type === 'push';

  /**
   * Setting up the refs on the actual flyout element in order to
   * accomodate for the `isPushed` state by adding padding to the body equal to the width of the element
   */
  const [resizeRef, setResizeRef] = useState<HTMLDivElement | null>(null);
  const setRef = useCombinedRefs([setResizeRef]);
  // TODO: Allow this hooke to be conditional
  const dimensions = useResizeObserver(resizeRef);

  useEffect(() => {
    // This class doesn't actually do anything by EUI, but is nice to add for consumers (JIC)
    document.body.classList.add('euiBody--hasFlyout');

    /**
     * Accomodate for the `isPushed` state by adding padding to the body equal to the width of the element
     */
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
        if (side === 'right') {
          document.body.style.paddingRight = '';
        } else if (side === 'left') {
          document.body.style.paddingLeft = '';
        }
      }
    };
  }, [type, side, dimensions, isPushed]);

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
    typeToClassNameMap[type as _EuiFlyoutType],
    sideToClassNameMap[side as _EuiFlyoutSide],
    sizeClassName,
    paddingSizeToClassNameMap[paddingSize as _EuiFlyoutPaddingSize],
    widthClassName,
    className
  );

  if (!closeButton && onClose && !hideCloseButton) {
    const closeButtonClasses = classnames(
      'euiFlyout__closeButton',
      `euiFlyout__closeButton--${closeButtonPosition}`
    );

    closeButton = (
      <EuiI18n token="euiFlyout.closeAriaLabel" default="Close this dialog">
        {(closeAriaLabel: string) => (
          <EuiButtonIcon
            className={closeButtonClasses}
            display={closeButtonPosition === 'outside' ? 'fill' : 'empty'}
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
    <Element
      role={role === 'none' ? undefined : role}
      className={classes}
      tabIndex={0}
      style={newStyle || style}
      // @ts-ignore TODO
      ref={setRef}
      {...rest}>
      {closeButton}
      {children}
    </Element>
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
      <EuiFocusTrap disabled={isPushed} clickOutsideDisables={!ownFocus}>
        {/* Outside click detector is needed if theres no overlay mask to auto-close when clicking on elements outside */}
        <EuiOutsideClickDetector
          isDisabled={isPushed || !outsideClickCloses}
          onOutsideClick={() => onClose()}>
          {flyoutContent}
        </EuiOutsideClickDetector>
      </EuiFocusTrap>
    </Fragment>
  );
};
