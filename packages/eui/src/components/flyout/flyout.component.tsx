/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* eslint-disable local/i18n */

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
  AnimationEventHandler,
} from 'react';
import classnames from 'classnames';

import {
  keys,
  EuiWindowEvent,
  useCombinedRefs,
  EuiBreakpointSize,
  useEuiMemoizedStyles,
  useGeneratedHtmlId,
  useEuiThemeCSSVariables,
} from '../../services';
import {
  useCurrentSession,
  useIsInManagedFlyout,
  useFlyoutLayoutMode,
  useFlyoutId,
  useFlyoutWidth,
} from './manager';

import { CommonProps, PropsOfElement } from '../common';
import { EuiFocusTrap, EuiFocusTrapProps } from '../focus_trap';
import type { EuiOverlayMaskProps } from '../overlay_mask';
import type { EuiButtonIconPropsForButton } from '../button';
import { EuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiPortal } from '../portal';
import { EuiScreenReaderOnly } from '../accessibility';

import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { euiFlyoutStyles, composeFlyoutInlineStyles } from './flyout.styles';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';
import {
  _EuiFlyoutPaddingSize,
  _EuiFlyoutSide,
  _EuiFlyoutType,
  DEFAULT_PADDING_SIZE,
  DEFAULT_PUSH_MIN_BREAKPOINT,
  DEFAULT_SIDE,
  DEFAULT_SIZE,
  DEFAULT_TYPE,
  EuiFlyoutSize,
  isEuiFlyoutSizeNamed,
} from './const';
import { useIsPushed } from './hooks';
import { EuiFlyoutMenu, EuiFlyoutMenuProps } from './flyout_menu';
import { EuiFlyoutResizeButton } from './_flyout_resize_button';
import { useEuiFlyoutResizable } from './use_flyout_resizable';
import {
  useEuiFlyoutOpenState,
  type EuiFlyoutOpenState,
} from './use_open_state';

interface _EuiFlyoutComponentProps {
  /**
   * Whether the flyout is open (visible) or closed (hidden).
   * It defaults to `true` for backwards compatibility.
   * @default true
   */
  isOpen?: boolean;
  /**
   * A required callback function fired when the flyout is closed.
   * It fires after the closing animation is finished.
   *
   * Use this callback to toggle your internal `isOpen` flyout state.
   */
  onClose: (event?: MouseEvent | TouchEvent | KeyboardEvent) => void;
  /**
   * An optional callback function fired when the flyout begins closing.
   *
   * Use in case you need to support any extra logic that relies on the flyout
   * closing state. In most cases this callback doesn't need to be handled.
   */
  onClosing?: (event?: MouseEvent | TouchEvent | KeyboardEvent) => void;
  /**
   * Defines the width of the panel.
   * Pass a predefined size of `s | m | l`, or pass any number/string compatible with the CSS `width` attribute
   * @default m
   */
  size?: EuiFlyoutSize | CSSProperties['width'];
  /**
   * Sets the minimum width of the panel.
   * Especially useful when set with `resizable = true`.
   */
  minWidth?: number;
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
   * `returnFocus` defines the return focus behavior and provides the possibility to check the available target element or opt out of the behavior in favor of manually returning focus
   */
  focusTrapProps?: Pick<
    EuiFocusTrapProps,
    'closeOnMouseup' | 'shards' | 'returnFocus'
  >;
  /**
   * By default, EuiFlyout will consider any fixed `EuiHeader`s that sit alongside or above the EuiFlyout
   * as part of the flyout's focus trap. This prevents focus fighting with interactive elements
   * within fixed headers.
   *
   * Set this to `false` if you need to disable this behavior for a specific reason.
   */
  includeFixedHeadersInFocusTrap?: boolean;

  /**
   * Specify additional css selectors to include in the focus trap.
   */
  includeSelectorInFocusTrap?: string[] | string;

  /**
   * Props for the flyout menu to have one rendered in the flyout.
   * If used, the close button will be automatically hidden, as the flyout menu has its own close button.
   */
  flyoutMenuProps?: EuiFlyoutMenuProps;

  /**
   * Whether the flyout should be resizable.
   * @default false
   */
  resizable?: boolean;

  /**
   * Optional callback that fires when the flyout is resized.
   */
  onResize?: (width: number) => void;
}

const defaultElement = 'div';

const openStateToClassNameMap: Record<EuiFlyoutOpenState, string> = {
  opening: 'euiFlyout--opening',
  open: 'euiFlyout--open',
  closing: 'euiFlyout--closing',
  // No special class needed for the closed state
  closed: '',
};

type Props<T extends ElementType> = CommonProps & {
  /**
   * Sets the HTML element for `EuiFlyout`
   */
  as?: T;
} & _EuiFlyoutComponentProps &
  Omit<PropsOfElement<T>, keyof _EuiFlyoutComponentProps>;

export type EuiFlyoutComponentProps<T extends ElementType = 'div' | 'nav'> =
  Props<T> & Omit<ComponentPropsWithRef<T>, keyof Props<T>>;

export const EuiFlyoutComponent = forwardRef(
  <T extends ElementType = 'div' | 'nav'>(
    props: EuiFlyoutComponentProps<T>,
    ref:
      | ((instance: ComponentPropsWithRef<T> | null) => void)
      | MutableRefObject<ComponentPropsWithRef<T> | null>
      | null
  ) => {
    const {
      className,
      children,
      as,
      hideCloseButton = false,
      flyoutMenuProps,
      closeButtonProps,
      closeButtonPosition = 'inside',
      onClose,
      ownFocus = true,
      side = DEFAULT_SIDE,
      size: _size = DEFAULT_SIZE,
      paddingSize = DEFAULT_PADDING_SIZE,
      maxWidth = false,
      style,
      maskProps,
      type = DEFAULT_TYPE,
      outsideClickCloses,
      pushMinBreakpoint = DEFAULT_PUSH_MIN_BREAKPOINT,
      pushAnimation = false,
      focusTrapProps: _focusTrapProps,
      includeFixedHeadersInFocusTrap = true,
      includeSelectorInFocusTrap,
      'aria-describedby': _ariaDescribedBy,
      id,
      resizable = false,
      minWidth = 200,
      onResize,
      isOpen = true,
      onClosing,
      onAnimationEnd: _onAnimationEnd,
      ...rest
    } = usePropsWithComponentDefaults('EuiFlyout', props);

    const { setGlobalCSSVariables } = useEuiThemeCSSVariables();

    const {
      openState,
      onAnimationEnd: onAnimationEndFlyoutOpenState,
      closeFlyout,
    } = useEuiFlyoutOpenState({
      isOpen,
      onClose,
      onClosing,
    });

    const Element = as || defaultElement;
    const maskRef = useRef<HTMLDivElement>(null);

    // Ref for the main flyout element to pass to context
    const internalParentFlyoutRef = useRef<HTMLDivElement>(null);
    const isPushed = useIsPushed({ type, pushMinBreakpoint });

    const {
      onMouseDown: onMouseDownResizableButton,
      onKeyDown: onKeyDownResizableButton,
      size,
      setFlyoutRef,
    } = useEuiFlyoutResizable({
      enabled: resizable,
      minWidth,
      maxWidth: typeof maxWidth === 'number' ? maxWidth : 0,
      onResize,
      side,
      size: _size,
    });

    /**
     * Setting up the refs on the actual flyout element in order to
     * accommodate for the `isPushed` state by adding padding to the body equal to the width of the element
     */
    const [resizeRef, setResizeRef] = useState<ComponentPropsWithRef<T> | null>(
      null
    );
    const setRef = useCombinedRefs([
      setResizeRef,
      ref,
      internalParentFlyoutRef,
      setFlyoutRef,
    ]);
    const { width } = useResizeObserver(isPushed ? resizeRef : null, 'width');

    useEffect(() => {
      /**
       * Accomodate for the `isPushed` state by adding padding to the body equal to the width of the element
       */
      if (isPushed) {
        const paddingSide =
          side === 'left' ? 'paddingInlineStart' : 'paddingInlineEnd';
        const cssVarName = `--euiPushFlyoutOffset${
          side === 'left' ? 'InlineStart' : 'InlineEnd'
        }`;

        document.body.style[paddingSide] = `${width}px`;

        // EUI doesn't use this css variable, but it is useful for consumers
        setGlobalCSSVariables({
          [cssVarName]: `${width}px`,
        });
        return () => {
          document.body.style[paddingSide] = '';
          setGlobalCSSVariables({
            [cssVarName]: null,
          });
        };
      }
    }, [isPushed, setGlobalCSSVariables, side, width]);

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

    const currentSession = useCurrentSession();
    const isInManagedContext = useIsInManagedFlyout();

    // Get flyout manager context for dynamic width calculation
    const flyoutId = useFlyoutId(id);
    const layoutMode = useFlyoutLayoutMode();

    // Memoize flyout identification and relationships to prevent race conditions
    const flyoutIdentity = useMemo(() => {
      if (!flyoutId || !currentSession) {
        return {
          isMainFlyout: false,
          siblingFlyoutId: null,
          hasValidSession: false,
          sessionForWidth: null,
        };
      }

      const siblingFlyoutId =
        currentSession.main === flyoutId
          ? currentSession.child
          : currentSession.main;

      return {
        siblingFlyoutId,
        hasValidSession: true,
        sessionForWidth: currentSession,
      };
    }, [flyoutId, currentSession]);

    // Destructure for easier use
    const { siblingFlyoutId } = flyoutIdentity;

    const hasChildFlyout = currentSession?.child != null;
    const isChildFlyout =
      isInManagedContext && hasChildFlyout && currentSession?.child === id;

    const shouldCloseOnEscape = useMemo(() => {
      // Regular flyout - always close on ESC
      if (!isInManagedContext) {
        return true;
      }

      // Managed flyout with no child - close on ESC
      if (!hasChildFlyout) {
        return true;
      }

      // Child flyout - close on ESC
      if (isChildFlyout) {
        return true;
      }

      // Main flyout with child flyout - don't close on ESC
      return false;
    }, [isInManagedContext, hasChildFlyout, isChildFlyout]);

    /**
     * ESC key closes flyout based on flyout hierarchy rules
     */
    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (!isPushed && event.key === keys.ESCAPE && shouldCloseOnEscape) {
          event.preventDefault();
          closeFlyout(event);
        }
      },
      [closeFlyout, isPushed, shouldCloseOnEscape]
    );

    const siblingFlyoutWidth = useFlyoutWidth(siblingFlyoutId);

    /**
     * Set inline styles
     */
    const inlineStyles = useMemo(() => {
      const composedStyles = composeFlyoutInlineStyles(
        size,
        layoutMode,
        siblingFlyoutId,
        siblingFlyoutWidth || null,
        maxWidth
      );

      return { ...style, ...composedStyles };
    }, [
      style,
      size,
      layoutMode,
      siblingFlyoutId,
      siblingFlyoutWidth,
      maxWidth,
    ]);

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

    const resizableButtonStyles = [
      styles.resizable.button,
      isPushed && side === 'left' && styles.resizable.buttonPushLeft,
      isPushed && side === 'right' && styles.resizable.buttonPushRight,
      !isPushed && side === 'left' && styles.resizable.buttonOverlayLeft,
      !isPushed && side === 'right' && styles.resizable.buttonOverlayRight,
      !isPushed && ownFocus && styles.resizable.buttonNoOverlay,
      !isPushed &&
        ownFocus &&
        side === 'left' &&
        styles.resizable.buttonNoOverlayLeft,
      !isPushed &&
        ownFocus &&
        side === 'right' &&
        styles.resizable.buttonNoOverlayRight,
    ];

    const classes = classnames(
      'euiFlyout',
      openStateToClassNameMap[openState],
      className
    );

    const flyoutToggle = useRef<Element | null>(document.activeElement);
    const [focusTrapShards, setFocusTrapShards] = useState<HTMLElement[]>([]);

    const focusTrapSelectors = useMemo(() => {
      let selectors: string[] = [];

      if (includeSelectorInFocusTrap) {
        selectors = Array.isArray(includeSelectorInFocusTrap)
          ? includeSelectorInFocusTrap
          : [includeSelectorInFocusTrap];
      }

      if (includeFixedHeadersInFocusTrap) {
        selectors.push('.euiHeader[data-fixed-header]');
      }

      return selectors;
    }, [includeSelectorInFocusTrap, includeFixedHeadersInFocusTrap]);

    useEffect(() => {
      if (focusTrapSelectors.length > 0) {
        const shardsEls = focusTrapSelectors.flatMap((selector) =>
          Array.from(document.querySelectorAll<HTMLElement>(selector))
        );

        setFocusTrapShards(Array.from(shardsEls));

        // Flyouts that are toggled from shards do not have working
        // focus trap autoFocus, so we need to focus the flyout wrapper ourselves
        shardsEls.forEach((shard) => {
          if (shard.contains(flyoutToggle.current)) {
            resizeRef?.focus();
          }
        });
      } else {
        // Clear existing shards if necessary, e.g. switching to `false`
        setFocusTrapShards((shards) => (shards.length ? [] : shards));
      }
    }, [focusTrapSelectors, resizeRef]);

    const focusTrapProps: EuiFlyoutComponentProps['focusTrapProps'] = useMemo(
      () => ({
        ..._focusTrapProps,
        shards: [...focusTrapShards, ...(_focusTrapProps?.shards || [])],
      }),
      [_focusTrapProps, focusTrapShards]
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
            {focusTrapShards.length > 0 && (
              <EuiI18n
                token="euiFlyout.screenReaderFocusTrapShards"
                default="You can still continue tabbing through other global page landmarks."
              />
            )}
          </p>
        </EuiScreenReaderOnly>
      ),
      [hasOverlayMask, descriptionId, focusTrapShards.length]
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
          if (event.target === maskRef.current) return closeFlyout(event);
        } else {
          // No overlay mask is present, so any outside clicks should close the flyout
          if (outsideClickCloses === true) return closeFlyout(event);
        }
        // Otherwise if ownFocus is false and outsideClickCloses is undefined, outside clicks should not close the flyout
        return undefined;
      },
      [closeFlyout, hasOverlayMask, outsideClickCloses]
    );

    const maskCombinedRefs = useCombinedRefs([maskProps?.maskRef, maskRef]);

    const onAnimationEnd = useCallback<AnimationEventHandler>(
      (event) => {
        onAnimationEndFlyoutOpenState(event);
        _onAnimationEnd?.(event);
      },
      [_onAnimationEnd, onAnimationEndFlyoutOpenState]
    );

    if (openState === 'closed') {
      // Render null only if the flyout is completely closed
      return null;
    }

    return (
      <EuiFlyoutComponentWrapper
        hasOverlayMask={hasOverlayMask}
        maskProps={{
          ...maskProps,
          maskRef: maskCombinedRefs,
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
            id={id}
            {...(rest as ComponentPropsWithRef<T>)}
            role={!isPushed ? 'dialog' : rest.role}
            aria-modal={!isPushed || undefined}
            tabIndex={!isPushed ? 0 : rest.tabIndex}
            aria-describedby={!isPushed ? ariaDescribedBy : _ariaDescribedBy}
            data-autofocus={!isPushed || undefined}
            onAnimationEnd={onAnimationEnd}
          >
            {!isPushed && screenReaderDescription}
            {!flyoutMenuProps && !hideCloseButton && (
              <EuiFlyoutCloseButton
                {...closeButtonProps}
                onClose={closeFlyout}
                closeButtonPosition={closeButtonPosition}
                side={side}
              />
            )}
            {flyoutMenuProps && <EuiFlyoutMenu {...flyoutMenuProps} />}
            {resizable && (
              <EuiFlyoutResizeButton
                isHorizontal
                indicator="border"
                css={resizableButtonStyles}
                type={type}
                side={side}
                ownFocus={ownFocus}
                isPushed={isPushed}
                onMouseDown={onMouseDownResizableButton}
                onTouchStart={onMouseDownResizableButton}
                onKeyDown={onKeyDownResizableButton}
              />
            )}
            {children}
          </Element>
        </EuiFocusTrap>
      </EuiFlyoutComponentWrapper>
    );
  }
  // React.forwardRef interferes with the inferred element type
  // Casting to ensure correct element prop type checking for `as`
  // e.g., `href` is not on a `div`
) as <T extends ElementType = 'div' | 'nav'>(
  props: EuiFlyoutComponentProps<T>
) => JSX.Element;
// Recast to allow `displayName`
(EuiFlyoutComponent as FunctionComponent).displayName = 'EuiFlyoutComponent';

/**
 * Light wrapper for conditionally rendering portals or overlay masks:
 *  - If ownFocus is set, wrap with an overlay and allow the user to click it to close it.
 *  - Otherwise still wrap within an EuiPortal so it appends to the bottom of the window.
 * Push flyouts have no overlay OR portal behavior.
 */
const EuiFlyoutComponentWrapper: FunctionComponent<{
  children: ReactNode;
  hasOverlayMask: boolean;
  maskProps: EuiFlyoutComponentProps['maskProps'];
  isPortalled: boolean;
}> = ({ children, hasOverlayMask, isPortalled }) => {
  // TODO(tkajtoch): Add EuiOverlayMask again

  if (isPortalled || hasOverlayMask) {
    return (
      <EuiPortal>
        <div>{children}</div>
      </EuiPortal>
    );
  } else {
    return <>{children}</>;
  }
};
