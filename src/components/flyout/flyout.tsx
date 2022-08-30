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
  ElementType,
  Fragment,
  FunctionComponent,
  MouseEvent as ReactMouseEvent,
  MutableRefObject,
} from 'react';
import classnames from 'classnames';

import { EuiButtonIcon } from '../button';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';

import {
  keys,
  EuiWindowEvent,
  useCombinedRefs,
  isWithinMinBreakpoint,
  throttle,
  useEuiTheme,
} from '../../services';

import {
  EuiFlyoutProps,
  defaultElement,
  sizeToClassNameMap,
  isEuiFlyoutSizeNamed,
} from './flyout_types';

import { EuiFlyoutContext } from './flyout_context';

import { EuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiPortal } from '../portal';
import { euiFlyoutStyles } from './flyout.styles';

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
    // TODO: Allow this hook to be conditional
    const dimensions = useResizeObserver(resizeRef);

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
        onClose(event);
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
      sizeClassName = `euiFlyout--${sizeToClassNameMap[size]}`;
    } else if (newStyle) {
      newStyle.width = size;
    } else {
      newStyle = { ...style, width: size };
    }

    const euiTheme = useEuiTheme();
    const styles = euiFlyoutStyles(euiTheme, paddingSize);

    const cssStyles = [
      styles.euiFlyout,
      styles.euiFlyoutHeader,
      side === 'left' && type === 'push' && styles['push--left'],
      isEuiFlyoutSizeNamed(size) && styles[`flyoutSize--${size}`],
      styles[type],
      styles[side],
    ];

    const classes = classnames(
      'euiFlyout',
      {
        [`euiFlyout--${type}`]: type,
        [`euiFlyout--${side}`]: side,
        [`euiFlyout--padding-${paddingSize}`]: paddingSize,
      },
      sizeClassName,
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

      const closeButtonStyles = [
        styles.closeButton,
        styles[`closeButton--${closeButtonPosition}`],
        side === 'left' && styles['closeButton--outside-left'],
      ];
      closeButton = (
        <EuiI18n token="euiFlyout.closeAriaLabel" default="Close this dialog">
          {(closeAriaLabel: string) => (
            <EuiButtonIcon
              css={closeButtonStyles}
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
      <EuiFlyoutContext.Provider value={{ paddingSize }}>
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
      </EuiFlyoutContext.Provider>
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
