/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useEffect,
  useState,
  forwardRef,
  CSSProperties,
  Fragment,
  ComponentType,
  ComponentPropsWithRef,
  PropsWithChildren,
  MutableRefObject,
} from 'react';
import classnames from 'classnames';

import {
  keys,
  EuiWindowEvent,
  useCombinedRefs,
  EuiBreakpointSize,
  isWithinMinBreakpoint,
  throttle,
} from '../../services';

import { CommonProps, keysOf } from '../common';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask, EuiOverlayMaskProps } from '../overlay_mask';
import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../button';
import { EuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiOutsideClickDetector } from '../outside_click_detector';
import { EuiPortal } from '../portal';

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
export type EuiFlyoutSize = typeof SIZES[number];

/**
 * Custom type checker for named flyout sizes since the prop
 * `size` can also be CSSProperties['width'] (string | number)
 */
function isEuiFlyoutSizeNamed(value: any): value is EuiFlyoutSize {
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

type _EuiFlyoutProps = {
  onClose: () => void;
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
  paddingSize?: _EuiFlyoutPaddingSize;
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
   * Named breakpoint or pixel value for customizing the minimum window width to enable the `push` type
   */
  pushMinBreakpoint?: EuiBreakpointSize | number;
  style?: React.CSSProperties;
};

// Using ReactHTML rather than JSX.IntrinsicElements here because it does not include
// SVG element types which cause errors because they do not have all the attributes needed.
type ComponentTypes =
  | 'div'
  | 'span'
  | 'nav'
  | 'aside'
  | 'section'
  | 'article'
  | 'header'
  | ComponentType;

export type EuiFlyoutProps<T extends ComponentTypes = 'div'> = CommonProps &
  ComponentPropsWithRef<T> & {
    /**
     * Sets the HTML element for `EuiFlyout`
     */
    as?: T;
  } & _EuiFlyoutProps;

const EuiFlyout = forwardRef(
  <T extends ComponentTypes>(
    {
      className,
      children,
      as: Element = 'div' as T,
      hideCloseButton = false,
      closeButtonProps,
      closeButtonAriaLabel,
      closeButtonPosition = 'inside',
      onClose,
      ownFocus = true,
      side = 'right',
      size = 'm',
      paddingSize = 'l',
      maxWidth = false,
      style,
      maskProps,
      type = 'overlay',
      outsideClickCloses = false,
      role = 'dialog',
      pushMinBreakpoint = 'l',
      ...rest
    }: PropsWithChildren<EuiFlyoutProps<T>>,
    ref:
      | ((instance: ComponentPropsWithRef<T> | null) => void)
      | MutableRefObject<ComponentPropsWithRef<T> | null>
      | null
  ) => {
    /**
     * Setting the initial state of pushed based on the `type` prop
     * and if the current window size is large enough (larger than `pushMinBreakpoint`)
     */
    const [windowIsLargeEnoughToPush, setWindowIsLargeEnoughToPush] = useState(
      isWithinMinBreakpoint(
        typeof window === 'undefined' ? 0 : window.innerWidth,
        pushMinBreakpoint
      )
    );

    const isPushed = type === 'push' && windowIsLargeEnoughToPush;

    /**
     * Watcher added to the window to maintain `isPushed` state depending on
     * the window size compared to the `pushBreakpoint`
     */
    const functionToCallOnWindowResize = throttle(() => {
      if (isWithinMinBreakpoint(window.innerWidth, pushMinBreakpoint)) {
        setWindowIsLargeEnoughToPush(true);
      } else {
        setWindowIsLargeEnoughToPush(false);
      }
      // reacts every 50ms to resize changes and always gets the final update
    }, 50);

    /**
     * Setting up the refs on the actual flyout element in order to
     * accommodate for the `isPushed` state by adding padding to the body equal to the width of the element
     */
    const [resizeRef, setResizeRef] = useState<ComponentPropsWithRef<T> | null>(
      null
    );
    const setRef = useCombinedRefs([setResizeRef, ref]);
    // TODO: Allow this hooke to be conditional
    const dimensions = useResizeObserver(resizeRef as Element);

    useEffect(() => {
      // This class doesn't actually do anything by EUI, but is nice to add for consumers (JIC)
      document.body.classList.add('euiBody--hasFlyout');

      /**
       * Accomodate for the `isPushed` state by adding padding to the body equal to the width of the element
       */
      if (type === 'push') {
        // Only add the event listener if we'll need to accommodate with padding
        window.addEventListener('resize', functionToCallOnWindowResize);

        if (isPushed) {
          if (side === 'right') {
            document.body.style.paddingRight = `${dimensions.width}px`;
          } else if (side === 'left') {
            document.body.style.paddingLeft = `${dimensions.width}px`;
          }
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

    /**
     * ESC key closes flyout (always?)
     */
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isPushed && event.key === keys.ESCAPE) {
        event.preventDefault();
        onClose();
      }
    };

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

    let closeButton;
    if (onClose && !hideCloseButton) {
      const closeButtonClasses = classnames(
        'euiFlyout__closeButton',
        `euiFlyout__closeButton--${closeButtonPosition}`,
        closeButtonProps?.className
      );

      closeButton = (
        <EuiI18n token="euiFlyout.closeAriaLabel" default="Close this dialog">
          {(closeAriaLabel: string) => (
            <EuiButtonIcon
              display={closeButtonPosition === 'outside' ? 'fill' : 'empty'}
              iconType="cross"
              color="text"
              aria-label={closeButtonAriaLabel || closeAriaLabel}
              data-test-subj="euiFlyoutCloseButton"
              {...closeButtonProps}
              className={closeButtonClasses}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                onClose();
                closeButtonProps?.onClick && closeButtonProps.onClick(e);
              }}
            />
          )}
        </EuiI18n>
      );
    }

    const flyoutContent = (
      // @ts-expect-error JSX element without construct
      <Element
        {...(rest as ComponentPropsWithRef<T>)}
        role={role}
        className={classes}
        tabIndex={-1}
        style={newStyle || style}
        ref={setRef}>
        {closeButton}
        {children}
      </Element>
    );

    /*
     * Trap focus even when `ownFocus={false}`, otherwise closing
     * the flyout won't return focus to the originating button.
     *
     * Set `clickOutsideDisables={true}` when `ownFocus={false}`
     * to allow non-keyboard users the ability to interact with
     * elements outside the flyout.
     */
    let flyout = (
      <EuiFocusTrap disabled={isPushed} clickOutsideDisables={!ownFocus}>
        {/* Outside click detector is needed if theres no overlay mask to auto-close when clicking on elements outside */}
        <EuiOutsideClickDetector
          isDisabled={isPushed || !outsideClickCloses}
          onOutsideClick={() => onClose()}>
          {flyoutContent}
        </EuiOutsideClickDetector>
      </EuiFocusTrap>
    );

    // If ownFocus is set, wrap with an overlay and allow the user to click it to close it.
    if (ownFocus && !isPushed) {
      flyout = (
        <EuiOverlayMask
          onClick={onClose}
          headerZindexLocation="below"
          {...maskProps}>
          {flyout}
        </EuiOverlayMask>
      );
    } else if (!isPushed) {
      // Otherwise still wrap within an EuiPortal so it appends (unless it is the push style)
      flyout = <EuiPortal>{flyout}</EuiPortal>;
    }

    return (
      <Fragment>
        <EuiWindowEvent event="keydown" handler={onKeyDown} />
        {flyout}
      </Fragment>
    );
  }
);

EuiFlyout.displayName = 'EuiFlyout';

export { EuiFlyout };
