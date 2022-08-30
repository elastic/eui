/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties, ElementType, ComponentPropsWithRef } from 'react';
import { EuiFocusTrapProps } from '../focus_trap';
import { EuiOverlayMaskProps } from '../overlay_mask';
import { EuiButtonIconPropsForButton } from '../button';
import { CommonProps, keysOf, PropsOfElement } from '../common';
import { EuiBreakpointSize } from '../../services';

export const typeToClassNameMap = {
  push: 'euiFlyout--push',
  overlay: null,
};

export const TYPES = keysOf(typeToClassNameMap);
export type _EuiFlyoutType = typeof TYPES[number];

export const sideToClassNameMap = {
  left: 'euiFlyout--left',
  right: null,
};

export const SIDES = keysOf(sideToClassNameMap);
export type _EuiFlyoutSide = typeof SIDES[number];

export const sizeToClassNameMap = {
  s: 'euiFlyout--small',
  m: 'euiFlyout--medium',
  l: 'euiFlyout--large',
};

export const SIZES = keysOf(sizeToClassNameMap);
export type EuiFlyoutSize = typeof SIZES[number];

/**
 * Custom type checker for named flyout sizes since the prop
 * `size` can also be CSSProperties['width'] (string | number)
 */
export function isEuiFlyoutSizeNamed(value: any): value is EuiFlyoutSize {
  return SIZES.includes(value as any);
}

export const paddingSizeToClassNameMap = {
  none: 'euiFlyout--paddingNone',
  s: 'euiFlyout--paddingSmall',
  m: 'euiFlyout--paddingMedium',
  l: 'euiFlyout--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);
export type EuiFlyoutPaddingSize = typeof PADDING_SIZES[number];

export interface _EuiFlyoutProps {
  onClose: (event: MouseEvent | TouchEvent | KeyboardEvent) => void;
  /**
   * Defines the width of the panel.
   * Pass a predefined size of `s | m | l`, or pass any number/string compatible with the CSS `width` attribute
   */
  size?: EuiFlyoutSize | CSSProperties['width'];
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
  paddingSize?: EuiFlyoutPaddingSize;
  /**
   * Adds an EuiOverlayMask and wraps in an EuiPortal
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
   * Extends EuiButtonIconProps onto the close button
   */
  closeButtonProps?: Partial<EuiButtonIconPropsForButton>;
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
   * The `left` option should only be used for navigation.
   */
  side?: _EuiFlyoutSide;
  /**
   * Defaults to `dialog` which is best for most cases of the flyout.
   * Otherwise pass in your own, aria-role, or `null` to remove it and use the semantic `as` element instead
   */
  role?: null | string;
  /**
   * Named breakpoint (`xs` through `xl`) for customizing the minimum window width to enable the `push` type
   */
  pushMinBreakpoint?: EuiBreakpointSize;
  style?: CSSProperties;
  /**
   * Object of props passed to EuiFocusTrap.
   * `shards` specifies an array of elements that will be considered part of the flyout, preventing the flyout from being closed when clicked.
   * `closeOnMouseup` will delay the close callback, allowing time for external toggle buttons to handle close behavior.
   */
  focusTrapProps?: Pick<EuiFocusTrapProps, 'closeOnMouseup' | 'shards'>;
}

export const defaultElement = 'div';

type Props<T extends ElementType> = CommonProps & {
  /**
   * Sets the HTML element for `EuiFlyout`
   */
  as?: T;
} & _EuiFlyoutProps &
  Omit<PropsOfElement<T>, keyof _EuiFlyoutProps>;

export type EuiFlyoutProps<
  T extends ElementType = typeof defaultElement
> = Props<T> & Omit<ComponentPropsWithRef<T>, keyof Props<T>>;
