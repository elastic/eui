/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  Fragment,
  FunctionComponent,
  MouseEvent as ReactMouseEvent,
  MutableRefObject,
} from 'react';
import classnames from 'classnames';

import {
  keys,
  EuiWindowEvent,
  useCombinedRefs,
  EuiBreakpointSize,
  useIsWithinMinBreakpoint,
  useEuiTheme,
} from '../../services';

import { CommonProps, keysOf, PropsOfElement } from '../common';
import { EuiFocusTrap, EuiFocusTrapProps } from '../focus_trap';
import { EuiOverlayMask, EuiOverlayMaskProps } from '../overlay_mask';
import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../button';
import { EuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiPortal } from '../portal';

import { euiFlyoutStyles, euiFlyoutCloseButtonStyles } from './flyout.styles';

const typeToClassNameMap = {
  push: 'euiFlyout--push',
  overlay: null,
};

export const TYPES = keysOf(typeToClassNameMap);
type _EuiFlyoutType = typeof TYPES[number];

export const SIDES = ['left', 'right'] as const;
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

export const PADDING_SIZES = ['none', 's', 'm', 'l'] as const;
export type _EuiFlyoutPaddingSize = typeof PADDING_SIZES[number];

interface _EuiFlyoutProps {
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

const defaultElement = 'div';

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

export const EuiFlyout = forwardRef(
  <T extends ElementType = typeof defaultElement>(
    {
      className,
      children,
      as,
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
      outsideClickCloses,
      role = 'dialog',
      pushMinBreakpoint = 'l',
      focusTrapProps,
      ...rest
    }: EuiFlyoutProps<T>,
    ref:
      | ((instance: ComponentPropsWithRef<T> | null) => void)
      | MutableRefObject<ComponentPropsWithRef<T> | null>
      | null
  ) => {
    const Element = as || defaultElement;
    const maskRef = useRef<HTMLDivElement>(null);

    const windowIsLargeEnoughToPush = useIsWithinMinBreakpoint(
      pushMinBreakpoint
    );
    const isPushed = type === 'push' && windowIsLargeEnoughToPush;

    /**
     * Setting up the refs on the actual flyout element in order to
     * accommodate for the `isPushed` state by adding padding to the body equal to the width of the element
     */
    const [resizeRef, setResizeRef] = useState<ComponentPropsWithRef<T> | null>(
      null
    );
    const setRef = useCombinedRefs([setResizeRef, ref]);
    // TODO: Allow this hook to be conditional
    const dimensions = useResizeObserver(resizeRef);

    useEffect(() => {
      // This class doesn't actually do anything by EUI, but is nice to add for consumers (JIC)
      document.body.classList.add('euiBody--hasFlyout');

      /**
       * Accomodate for the `isPushed` state by adding padding to the body equal to the width of the element
       */
      if (type === 'push') {
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
          if (side === 'right') {
            document.body.style.paddingRight = '';
          } else if (side === 'left') {
            document.body.style.paddingLeft = '';
          }
        }
      };
    }, [type, side, dimensions, isPushed]);

    /**
     * ESC key closes flyout (always?)
     */
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isPushed && event.key === keys.ESCAPE) {
        event.preventDefault();
        onClose(event);
      }
    };

    let newStyle;

    if (maxWidth !== true) {
      newStyle = { ...style, maxWidth: maxWidth === false ? 'none' : maxWidth };
    }

    // Setting size
    if (!isEuiFlyoutSizeNamed(size)) {
      newStyle = { ...(newStyle || style), width: size };
    }

    const euiTheme = useEuiTheme();
    const styles = euiFlyoutStyles(euiTheme);

    const cssStyles = [
      styles.euiFlyout,
      styles.paddingSizes[paddingSize],
      side === 'left' && type === 'push' && styles.pushLeft,
      isEuiFlyoutSizeNamed(size) && styles[size],
      styles[type],
      styles[side],
    ];

    const classes = classnames('euiFlyout', className);

    let closeButton;
    if (onClose && !hideCloseButton) {
      const closeButtonClasses = classnames(
        'euiFlyout__closeButton',
        `euiFlyout__closeButton--${closeButtonPosition}`,
        closeButtonProps?.className
      );

      const closeButtonStyles = euiFlyoutCloseButtonStyles(euiTheme);

      const closeButtonCSSStyles = [
        closeButtonStyles.euiFlyout__closeButton,
        closeButtonStyles[closeButtonPosition],
        side === 'left' && closeButtonStyles.outsideLeft,
      ];

      closeButton = (
        <EuiI18n token="euiFlyout.closeAriaLabel" default="Close this dialog">
          {(closeAriaLabel: string) => (
            <EuiButtonIcon
              css={closeButtonCSSStyles}
              display={closeButtonPosition === 'outside' ? 'fill' : 'empty'}
              iconType="cross"
              color="text"
              aria-label={closeButtonAriaLabel || closeAriaLabel}
              data-test-subj="euiFlyoutCloseButton"
              {...closeButtonProps}
              className={closeButtonClasses}
              onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                onClose(e.nativeEvent);
                closeButtonProps?.onClick?.(e);
              }}
            />
          )}
        </EuiI18n>
      );
    }

    const hasOverlayMask = ownFocus && !isPushed;
    const onClickOutside = (event: MouseEvent | TouchEvent) => {
      // Do not close the flyout for any external click
      if (outsideClickCloses === false) return undefined;
      if (hasOverlayMask) {
        // The overlay mask is present, so only clicks on the mask should close the flyout, regardless of outsideClickCloses
        if (event.target === maskRef.current) return onClose(event);
      } else {
        // No overlay mask is present, so any outside clicks should close the flyout
        if (outsideClickCloses === true) return onClose(event);
      }
      // Otherwise if ownFocus is false and outsideClickCloses is undefined, outside clicks should not close the flyout
      return undefined;
    };
    /*
     * Trap focus even when `ownFocus={false}`, otherwise closing
     * the flyout won't return focus to the originating button.
     *
     * Set `clickOutsideDisables={true}` when `ownFocus={false}`
     * to allow non-keyboard users the ability to interact with
     * elements outside the flyout.
     *
     * Set `onClickOutside={onClose}` when `ownFocus` and `type` are the defaults,
     * or if `outsideClickCloses={true}` to close on clicks that target
     * (both mousedown and mouseup) the overlay mask.
     */
    let flyout = (
      <EuiFocusTrap
        disabled={isPushed}
        clickOutsideDisables={!ownFocus}
        onClickOutside={onClickOutside}
        {...focusTrapProps}
      >
        <Element
          {...(rest as ComponentPropsWithRef<T>)}
          role={role}
          className={classes}
          tabIndex={-1}
          style={newStyle || style}
          ref={setRef}
          css={cssStyles}
        >
          {closeButton}
          {children}
        </Element>
      </EuiFocusTrap>
    );

    // If ownFocus is set, wrap with an overlay and allow the user to click it to close it.
    const mergedMaskProps = {
      ...maskProps,
      maskRef: useCombinedRefs([maskProps?.maskRef, maskRef]),
    };
    if (hasOverlayMask) {
      flyout = (
        <EuiOverlayMask headerZindexLocation="below" {...mergedMaskProps}>
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
  // React.forwardRef interferes with the inferred element type
  // Casting to ensure correct element prop type checking for `as`
  // e.g., `href` is not on a `div`
) as <T extends ElementType = typeof defaultElement>(
  props: EuiFlyoutProps<T>
) => JSX.Element;
// Recast to allow `displayName`
(EuiFlyout as FunctionComponent).displayName = 'EuiFlyout';
