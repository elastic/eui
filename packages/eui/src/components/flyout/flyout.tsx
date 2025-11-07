/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ComponentProps,
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
  useEuiThemeCSSVariables,
  focusTrapPubSub,
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
import { EuiFlyoutChild } from './flyout_child';
import { EuiFlyoutChildProvider } from './flyout_child_manager';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';

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
    props: EuiFlyoutProps<T>,
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
      closeButtonProps,
      closeButtonPosition: _closeButtonPosition = 'inside',
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
      includeSelectorInFocusTrap,
      'aria-describedby': _ariaDescribedBy,
      ...rest
    } = usePropsWithComponentDefaults('EuiFlyout', props);

    const { setGlobalCSSVariables } = useEuiThemeCSSVariables();

    const Element = as || defaultElement;
    const maskRef = useRef<HTMLDivElement>(null);

    // Ref for the main flyout element to pass to context
    const internalParentFlyoutRef = useRef<HTMLDivElement>(null);

    const [isChildFlyoutOpen, setIsChildFlyoutOpen] = useState(false);
    const [childLayoutMode, setChildLayoutMode] = useState<
      'side-by-side' | 'stacked'
    >('side-by-side');

    // Check for child flyout
    const childFlyoutElement = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        (child.type === EuiFlyoutChild ||
          (child.type as any).displayName === 'EuiFlyoutChild')
    ) as React.ReactElement<ComponentProps<typeof EuiFlyoutChild>> | undefined;

    const hasChildFlyout = !!childFlyoutElement;

    // Validate props, determine close button position and set child flyout classes
    let closeButtonPosition: 'inside' | 'outside';
    let childFlyoutClasses: string[] = [];
    if (hasChildFlyout) {
      if (side !== 'right') {
        throw new Error(
          'EuiFlyout: When an EuiFlyoutChild is present, the `side` prop of EuiFlyout must be "right".'
        );
      }
      if (!isEuiFlyoutSizeNamed(size) || !['s', 'm'].includes(size)) {
        throw new Error(
          `EuiFlyout: When an EuiFlyoutChild is present, the \`size\` prop of EuiFlyout must be "s" or "m". Received "${size}".`
        );
      }
      if (_closeButtonPosition !== 'inside') {
        throw new Error(
          'EuiFlyout: When an EuiFlyoutChild is present, the `closeButtonPosition` prop of EuiFlyout must be "inside".'
        );
      }

      closeButtonPosition = 'inside';
      childFlyoutClasses = [
        'euiFlyout--hasChild',
        `euiFlyout--hasChild--${childLayoutMode}`,
        `euiFlyout--hasChild--${childFlyoutElement.props.size || 's'}`,
      ];
    } else {
      closeButtonPosition = _closeButtonPosition;
    }

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
    const setRef = useCombinedRefs([
      setResizeRef,
      ref,
      internalParentFlyoutRef,
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

    /**
     * ESC key closes flyout (always?)
     */
    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (!isPushed && event.key === keys.ESCAPE && !isChildFlyoutOpen) {
          event.preventDefault();
          onClose(event);
        }
      },
      [onClose, isPushed, isChildFlyoutOpen]
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

    const classes = classnames('euiFlyout', ...childFlyoutClasses, className);

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

    /**
     * Finds the shards to include in the focus trap by querying by `focusTrapSelectors`.
     *
     * @param shouldAutoFocus Whether to auto-focus the flyout wrapper when the focus trap is activated.
     * This is necessary because when a flyout is toggled from within a shard, the focus trap's `autoFocus`
     * feature doesn't work. This logic manually focuses the flyout as a workaround.
     */
    const findShards = useCallback(
      (shouldAutoFocus: boolean = false) => {
        if (focusTrapSelectors.length > 0) {
          const shardsEls = focusTrapSelectors.flatMap((selector) =>
            Array.from(document.querySelectorAll<HTMLElement>(selector))
          );

          setFocusTrapShards(Array.from(shardsEls));

          if (shouldAutoFocus) {
            shardsEls.forEach((shard) => {
              if (shard.contains(flyoutToggle.current)) {
                resizeRef?.focus();
              }
            });
          }
        } else {
          // Clear existing shards if necessary, e.g. switching to `false`
          setFocusTrapShards((shards) => (shards.length ? [] : shards));
        }
      },
      [focusTrapSelectors, resizeRef]
    );

    useEffect(() => {
      // Auto-focus should only happen on initial flyout mount (or when the dependencies change)
      // because it snaps focus to the flyout wrapper, which steals it from subsequently focused elements.
      findShards(true);

      const unsubscribe = focusTrapPubSub.subscribe(() => findShards());
      return unsubscribe;
    }, [findShards]);

    const focusTrapProps: EuiFlyoutProps['focusTrapProps'] = useMemo(
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

    const closeButton = !hideCloseButton && (
      <EuiFlyoutCloseButton
        {...closeButtonProps}
        onClose={onClose}
        closeButtonPosition={closeButtonPosition}
        side={side}
      />
    );

    // render content within EuiFlyoutChildProvider if childFlyoutElement is present
    let contentToRender: React.ReactElement = children;
    if (hasChildFlyout && childFlyoutElement) {
      contentToRender = (
        <EuiFlyoutChildProvider
          parentSize={size as 's' | 'm'}
          parentFlyoutRef={internalParentFlyoutRef}
          childElement={childFlyoutElement}
          childrenToRender={children}
          reportIsChildOpen={setIsChildFlyoutOpen}
          reportChildLayoutMode={setChildLayoutMode}
        />
      );
    }

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
          disabled={isPushed || (ownFocus && isChildFlyoutOpen)}
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
            aria-modal={!isPushed || undefined}
            tabIndex={!isPushed ? 0 : rest.tabIndex}
            aria-describedby={!isPushed ? ariaDescribedBy : _ariaDescribedBy}
            data-autofocus={!isPushed || undefined}
          >
            {!isPushed && screenReaderDescription}
            {closeButton}
            {contentToRender}
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
