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
  useMemo,
  useCallback,
  useState,
  forwardRef,
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  FunctionComponent,
  MutableRefObject,
  ReactNode,
  JSX,
} from 'react';
import classnames from 'classnames';

import {
  keys,
  EuiWindowEvent,
  useCombinedRefs,
  EuiBreakpointSize,
  useIsWithinMinBreakpoint,
  useEuiMemoizedStyles,
  useGeneratedHtmlId,
} from '../../services';
import { logicalStyle } from '../../global_styling';

import { CommonProps, PropsOfElement } from '../common';
import { EuiFocusTrap, EuiFocusTrapProps } from '../focus_trap';
import { EuiOverlayMask, EuiOverlayMaskProps } from '../overlay_mask';
import type { EuiButtonIconPropsForButton } from '../button';
import { EuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiPortal } from '../portal';
import { EuiScreenReaderOnly } from '../accessibility';

import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { euiFlyoutStyles } from './flyout.styles';

export const TYPES = ['push', 'overlay'] as const;
type _EuiFlyoutType = (typeof TYPES)[number];

export const SIDES = ['left', 'right'] as const;
export type _EuiFlyoutSide = (typeof SIDES)[number];

export const SIZES = ['s', 'm', 'l'] as const;
export type EuiFlyoutSize = (typeof SIZES)[number];

/**
 * Custom type checker for named flyout sizes since the prop
 * `size` can also be CSSProperties['width'] (string | number)
 */
function isEuiFlyoutSizeNamed(value: any): value is EuiFlyoutSize {
  return SIZES.includes(value as any);
}

export const PADDING_SIZES = ['none', 's', 'm', 'l'] as const;
export type _EuiFlyoutPaddingSize = (typeof PADDING_SIZES)[number];

interface _EuiFlyoutProps {
  onClose: (event: MouseEvent | TouchEvent | KeyboardEvent) => void;
  /**
   * Defines the width of the panel.
   * Pass a predefined size of `s | m | l`, or pass any number/string compatible with the CSS `width` attribute
   * @default m
   */
  size?: EuiFlyoutSize | CSSProperties['width'];
  /**
   * Sets the max-width of the panel,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   * @default false
   */
  maxWidth?: boolean | number | string;
  /**
   * Customize the padding around the content of the flyout header, body and footer
   * @default l
   */
  paddingSize?: _EuiFlyoutPaddingSize;
  /**
   * Adds an EuiOverlayMask and wraps in an EuiPortal
   * @default true
   */
  ownFocus?: boolean;
  /**
   * Hides the default close button. You must provide another close button somewhere within the flyout.
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * Extends EuiButtonIconProps onto the close button
   */
  closeButtonProps?: Partial<EuiButtonIconPropsForButton>;
  /**
   * Position of close button.
   * `inside`: Floating to just inside the flyout, always top right;
   * `outside`: Floating just outside the flyout near the top (side dependent on `side`). Helpful when the close button may cover other interactable content.
   * @default inside
   */
  closeButtonPosition?: 'inside' | 'outside';
  /**
   * Adjustments to the EuiOverlayMask that is added when `ownFocus = true`
   */
  maskProps?: EuiOverlayMaskProps;
  /**
   * How to display the the flyout in relation to the body content;
   * `push` keeps it visible, pushing the `<body>` content via padding
   * @default overlay
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
   * @default right
   */
  side?: _EuiFlyoutSide;
  /**
   * Named breakpoint (`xs` through `xl`) for customizing the minimum window width to enable the `push` type
   * @default l
   */
  pushMinBreakpoint?: EuiBreakpointSize;
  /**
   * Enables a slide in animation on push flyouts
   * @default false
   */
  pushAnimation?: boolean;
  style?: CSSProperties;
  /**
   * Object of props passed to EuiFocusTrap.
   * `shards` specifies an array of elements that will be considered part of the flyout, preventing the flyout from being closed when clicked.
   * `closeOnMouseup` will delay the close callback, allowing time for external toggle buttons to handle close behavior.
   */
  focusTrapProps?: Pick<EuiFocusTrapProps, 'closeOnMouseup' | 'shards'>;
  /**
   * By default, EuiFlyout will consider any fixed `EuiHeader`s that sit alongside or above the EuiFlyout
   * as part of the flyout's focus trap. This prevents focus fighting with interactive elements
   * within fixed headers.
   *
   * Set this to `false` if you need to disable this behavior for a specific reason.
   */
  includeFixedHeadersInFocusTrap?: boolean;
}

const defaultElement = 'div';

type Props<T extends ElementType> = CommonProps & {
  /**
   * Sets the HTML element for `EuiFlyout`
   */
  as?: T;
} & _EuiFlyoutProps &
  Omit<PropsOfElement<T>, keyof _EuiFlyoutProps>;

export type EuiFlyoutProps<T extends ElementType = typeof defaultElement> =
  Props<T> & Omit<ComponentPropsWithRef<T>, keyof Props<T>>;

export const EuiFlyout = forwardRef(
  <T extends ElementType = typeof defaultElement>(
    {
      className,
      children,
      as,
      hideCloseButton = false,
      closeButtonProps,
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
      pushMinBreakpoint = 'l',
      pushAnimation = false,
      focusTrapProps: _focusTrapProps,
      includeFixedHeadersInFocusTrap = true,
      'aria-describedby': _ariaDescribedBy,
      ...rest
    }: EuiFlyoutProps<T>,
    ref:
      | ((instance: ComponentPropsWithRef<T> | null) => void)
      | MutableRefObject<ComponentPropsWithRef<T> | null>
      | null
  ) => {
    const Element = as || defaultElement;
    const maskRef = useRef<HTMLDivElement>(null);

    const windowIsLargeEnoughToPush =
      useIsWithinMinBreakpoint(pushMinBreakpoint);
    const isPushed = type === 'push' && windowIsLargeEnoughToPush;

    /**
     * Setting up the refs on the actual flyout element in order to
     * accommodate for the `isPushed` state by adding padding to the body equal to the width of the element
     */
    const [resizeRef, setResizeRef] = useState<ComponentPropsWithRef<T> | null>(
      null
    );
    const setRef = useCombinedRefs([setResizeRef, ref]);
    const { width } = useResizeObserver(isPushed ? resizeRef : null, 'width');

    useEffect(() => {
      /**
       * Accomodate for the `isPushed` state by adding padding to the body equal to the width of the element
       */
      if (isPushed) {
        const paddingSide =
          side === 'left' ? 'paddingInlineStart' : 'paddingInlineEnd';

        document.body.style[paddingSide] = `${width}px`;
        return () => {
          document.body.style[paddingSide] = '';
        };
      }
    }, [isPushed, side, width]);

    /**
     * This class doesn't actually do anything by EUI, but is nice to add for consumers (JIC)
     */
    useEffect(() => {
      document.body.classList.add('euiBody--hasFlyout');
      return () => {
        // Remove the hasFlyout class when the flyout is unmounted
        document.body.classList.remove('euiBody--hasFlyout');
      };
    }, []);

    /**
     * ESC key closes flyout (always?)
     */
    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (!isPushed && event.key === keys.ESCAPE) {
          event.preventDefault();
          onClose(event);
        }
      },
      [onClose, isPushed]
    );

    /**
     * Set inline styles
     */
    const inlineStyles = useMemo(() => {
      const widthStyle =
        !isEuiFlyoutSizeNamed(size) && logicalStyle('width', size);
      const maxWidthStyle =
        typeof maxWidth !== 'boolean' && logicalStyle('max-width', maxWidth);

      return {
        ...style,
        ...widthStyle,
        ...maxWidthStyle,
      };
    }, [style, maxWidth, size]);

    const styles = useEuiMemoizedStyles(euiFlyoutStyles);
    const cssStyles = [
      styles.euiFlyout,
      styles.paddingSizes[paddingSize],
      isEuiFlyoutSizeNamed(size) && styles[size],
      maxWidth === false && styles.noMaxWidth,
      isPushed ? styles.push.push : styles.overlay.overlay,
      isPushed ? styles.push[side] : styles.overlay[side],
      isPushed && !pushAnimation && styles.push.noAnimation,
      styles[side],
    ];

    const classes = classnames('euiFlyout', className);

    /*
     * If not disabled, automatically add fixed EuiHeaders as shards
     * to EuiFlyout focus traps, to prevent focus fighting
     */
    const flyoutToggle = useRef<Element | null>(document.activeElement);
    const [fixedHeaders, setFixedHeaders] = useState<HTMLDivElement[]>([]);

    useEffect(() => {
      if (includeFixedHeadersInFocusTrap) {
        const fixedHeaderEls = document.querySelectorAll<HTMLDivElement>(
          '.euiHeader[data-fixed-header]'
        );
        setFixedHeaders(Array.from(fixedHeaderEls));

        // Flyouts that are toggled from fixed headers do not have working
        // focus trap autoFocus, so we need to focus the flyout wrapper ourselves
        fixedHeaderEls.forEach((header) => {
          if (header.contains(flyoutToggle.current)) {
            resizeRef?.focus();
          }
        });
      } else {
        // Clear existing headers if necessary, e.g. switching to `false`
        setFixedHeaders((headers) => (headers.length ? [] : headers));
      }
    }, [includeFixedHeadersInFocusTrap, resizeRef]);

    const focusTrapProps: EuiFlyoutProps['focusTrapProps'] = useMemo(
      () => ({
        ..._focusTrapProps,
        shards: [...fixedHeaders, ...(_focusTrapProps?.shards || [])],
      }),
      [fixedHeaders, _focusTrapProps]
    );

    /*
     * Provide meaningful screen reader instructions/details
     */
    const hasOverlayMask = ownFocus && !isPushed;
    const descriptionId = useGeneratedHtmlId();
    const ariaDescribedBy = classnames(descriptionId, _ariaDescribedBy);

    const screenReaderDescription = useMemo(
      () => (
        <EuiScreenReaderOnly>
          <p id={descriptionId}>
            {hasOverlayMask ? (
              <EuiI18n
                token="euiFlyout.screenReaderModalDialog"
                default="You are in a modal dialog. Press Escape or tap/click outside the dialog on the shadowed overlay to close."
              />
            ) : (
              <EuiI18n
                token="euiFlyout.screenReaderNonModalDialog"
                default="You are in a non-modal dialog. To close the dialog, press Escape."
              />
            )}{' '}
            {fixedHeaders.length > 0 && (
              <EuiI18n
                token="euiFlyout.screenReaderFixedHeaders"
                default="You can still continue tabbing through the page headers in addition to the dialog."
              />
            )}
          </p>
        </EuiScreenReaderOnly>
      ),
      [hasOverlayMask, descriptionId, fixedHeaders.length]
    );

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
    const onClickOutside = useCallback(
      (event: MouseEvent | TouchEvent) => {
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
      },
      [onClose, hasOverlayMask, outsideClickCloses]
    );

    return (
      <EuiFlyoutWrapper
        hasOverlayMask={hasOverlayMask}
        maskProps={{
          ...maskProps,
          maskRef: useCombinedRefs([maskProps?.maskRef, maskRef]),
        }}
        isPortalled={!isPushed}
      >
        <EuiWindowEvent event="keydown" handler={onKeyDown} />
        <EuiFocusTrap
          disabled={isPushed}
          scrollLock={hasOverlayMask}
          clickOutsideDisables={!ownFocus}
          onClickOutside={onClickOutside}
          {...focusTrapProps}
        >
          <Element
            className={classes}
            css={cssStyles}
            style={inlineStyles}
            ref={setRef}
            {...(rest as ComponentPropsWithRef<T>)}
            role={!isPushed ? 'dialog' : rest.role}
            tabIndex={!isPushed ? 0 : rest.tabIndex}
            aria-describedby={!isPushed ? ariaDescribedBy : _ariaDescribedBy}
            data-autofocus={!isPushed || undefined}
          >
            {!isPushed && screenReaderDescription}
            {!hideCloseButton && onClose && (
              <EuiFlyoutCloseButton
                {...closeButtonProps}
                onClose={onClose}
                closeButtonPosition={closeButtonPosition}
                side={side}
              />
            )}
            {children}
          </Element>
        </EuiFocusTrap>
      </EuiFlyoutWrapper>
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

/**
 * Light wrapper for conditionally rendering portals or overlay masks:
 *  - If ownFocus is set, wrap with an overlay and allow the user to click it to close it.
 *  - Otherwise still wrap within an EuiPortal so it appends to the bottom of the window.
 * Push flyouts have no overlay OR portal behavior.
 */
const EuiFlyoutWrapper: FunctionComponent<{
  children: ReactNode;
  hasOverlayMask: boolean;
  maskProps: EuiFlyoutProps['maskProps'];
  isPortalled: boolean;
}> = ({ children, hasOverlayMask, maskProps, isPortalled }) => {
  if (hasOverlayMask) {
    return (
      <EuiOverlayMask headerZindexLocation="below" {...maskProps}>
        {children}
      </EuiOverlayMask>
    );
  } else if (isPortalled) {
    return <EuiPortal>{children}</EuiPortal>;
  } else {
    return <>{children}</>;
  }
};
