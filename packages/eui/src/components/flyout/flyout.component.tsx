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
  useLayoutEffect,
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
  JSX,
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
  focusTrapPubSub,
} from '../../services';
import { useIsInManagedFlyout, useFlyoutId, useFlyoutManager } from './manager';
import { LAYOUT_MODE_SIDE_BY_SIDE, LAYOUT_MODE_STACKED } from './manager/const';

import { CommonProps, PropsOfElement } from '../common';
import { EuiFocusTrap, EuiFocusTrapProps } from '../focus_trap';
import type { EuiOverlayMaskProps } from '../overlay_mask';
import type { EuiButtonIconPropsForButton } from '../button';
import { EuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
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
import { EuiFlyoutOverlay } from './_flyout_overlay';
import { EuiFlyoutResizeButton } from './_flyout_resize_button';
import { useEuiFlyoutResizable } from './use_flyout_resizable';
import type { EuiFlyoutCloseEvent } from './types';
import { useEuiFlyoutZIndex } from './use_flyout_z_index';
import {
  EuiFlyoutParentProvider,
  useParentFlyoutContainer,
} from './flyout_parent_context';

interface _EuiFlyoutComponentProps {
  /**
   * A required callback function fired when the flyout is closed.
   */
  onClose: (event: EuiFlyoutCloseEvent) => void;
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
   * Adjustments to the EuiOverlayMask that is added when `ownFocus = true`.
   *
   * @deprecated Use the `container` prop to scope flyouts to the document or to an application area.
   * When `container` is provided, `maskProps` is ignored.
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
   * When the flyout is used as a child in a managed flyout session, setting `true` gives the shaded background style.
   * @default false
   */
  hasChildBackground?: boolean;
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
   *
   * @deprecated Use the `container` prop to scope flyouts to the document or to an application area.
   * When `container` is provided, `includeFixedHeadersInFocusTrap` is ignored.
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

  /**
   * Optional reference container element. When not specified (or set to
   * `null`), the reference container defaults to `document.body`. The flyout
   * is positioned and sized relative to this single reference container.
   *
   * When a specific element is provided, the flyout is visually constrained
   * to that container's bounds (e.g. does not overlap side navigation, toolbars).
   * The flyout remains in `document.body` with `position: fixed`; the
   * container's bounding rect is read (via `ResizeObserver` and window
   * scroll/resize listeners) to compute inline positioning styles that pin
   * the flyout inside the container. No DOM mutations are applied to the
   * container except push-mode padding.
   *
   * Resize clamping and responsive breakpoints use the reference container's
   * width (body or the provided element).
   *
   * Child flyouts automatically inherit the `container` from the parent
   * flyout's context. To use the document body as the reference container
   * for a child (overriding an inherited container), pass `container={null}`.
   *
   * A getter function `() => HTMLElement | null` or a CSS selector string
   * (e.g. `'#app-main'`) can also be passed.
   */
  container?: HTMLElement | null | (() => HTMLElement | null) | string;
}

/**
 * Resolves the container prop (element, getter, or selector string) to an
 * HTMLElement, or null if not found / invalid.
 */
const resolveContainer = (
  raw: HTMLElement | string | (() => HTMLElement | null) | null | undefined
): HTMLElement | null => {
  if (raw == null) return null;
  if (typeof raw === 'string') {
    const el = document.querySelector(raw);
    return el instanceof HTMLElement ? el : null;
  }
  if (typeof raw === 'function') return raw();
  return raw instanceof HTMLElement ? raw : null;
};

const defaultElement = 'div';

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
      | ((instance: HTMLElement | null) => void)
      | MutableRefObject<HTMLElement | null>
      | null
  ) => {
    const {
      className,
      children,
      as,
      hideCloseButton = false,
      flyoutMenuProps: _flyoutMenuProps,
      closeButtonProps,
      closeButtonPosition = 'inside',
      onClose,
      ownFocus = true,
      side = DEFAULT_SIDE,
      size: _size = DEFAULT_SIZE,
      paddingSize = DEFAULT_PADDING_SIZE,
      maxWidth = false,
      style,
      hasChildBackground = false,
      maskProps,
      type = DEFAULT_TYPE,
      outsideClickCloses,
      pushMinBreakpoint = DEFAULT_PUSH_MIN_BREAKPOINT,
      pushAnimation = false,
      focusTrapProps: _focusTrapProps,
      includeFixedHeadersInFocusTrap = true,
      includeSelectorInFocusTrap,
      'aria-describedby': _ariaDescribedBy,
      'aria-labelledby': _ariaLabelledBy,
      id,
      resizable = false,
      minWidth,
      onResize,
      onAnimationEnd,
      container: containerProp,
      ...rest
    } = usePropsWithComponentDefaults('EuiFlyout', props);

    // Child flyouts inherit the container from the parent flyout's context.
    // This allows the main flyout to set `container` once, and all child
    // flyouts automatically use the same container without needing an
    // explicit prop.
    //
    // `undefined` = not provided, inherit from parent. `null` = explicitly
    // no container (viewport mode). Strings and getter functions are
    // resolved each render.
    const parentContainer = useParentFlyoutContainer();
    const containerRaw =
      containerProp !== undefined ? containerProp : parentContainer;
    const container = resolveContainer(containerRaw);

    // Value to pass to child context: selector string so children re-resolve,
    // or resolved element when prop was element/getter.
    const containerForContext =
      typeof containerRaw === 'string' ? containerRaw : container ?? undefined;

    // If this flyout inherited its container from the parent context (rather
    // than setting it explicitly), the parent flyout already reported the
    // container to the manager. Skip that effect to avoid redundant dispatch.
    const isContainerInherited =
      containerProp === undefined && parentContainer != null;

    const { setGlobalCSSVariables } = useEuiThemeCSSVariables();

    const Element = as || defaultElement;
    const maskRef = useRef<HTMLDivElement>(null);

    // Ref for the main flyout element to pass to context
    const internalParentFlyoutRef = useRef<HTMLDivElement>(null);
    const isPushed = useIsPushed({ type, pushMinBreakpoint });
    // When no explicit container is provided, push padding targets
    // document.body and global push-offset CSS vars are set. When a
    // container is provided, only that element receives padding.
    const shouldSetGlobalPushVars = container == null;

    if (
      container != null &&
      ('maskProps' in props || 'includeFixedHeadersInFocusTrap' in props) &&
      process.env.NODE_ENV === 'development'
    ) {
      if ('maskProps' in props) {
        console.warn(
          'EuiFlyout: `maskProps` is deprecated. Use the `container` prop to scope flyouts.'
        );
      }
      if ('includeFixedHeadersInFocusTrap' in props) {
        console.warn(
          'EuiFlyout: `includeFixedHeadersInFocusTrap` is deprecated. Use `includeSelectorInFocusTrap` when using `container`.'
        );
      }
    }
    const effectiveHeaderZindexLocation =
      maskProps?.headerZindexLocation ?? 'below';

    // Report the container element to the flyout manager for layout calculations.
    // Skip when the container was inherited — the parent flyout already reported it.
    useEffect(() => {
      if (!container || isContainerInherited) return;

      flyoutManagerRef.current?.setContainerElement(container);

      return () => {
        if (
          flyoutManagerRef.current?.state?.containerElement === container
        ) {
          flyoutManagerRef.current.setContainerElement(null);
        }
      };
    }, [container, isContainerInherited]); // eslint-disable-line react-hooks/exhaustive-deps

    // Performance: read context once and derive all manager-dependent values inline.
    const isInManagedContext = useIsInManagedFlyout();
    const flyoutId = useFlyoutId(id);
    const flyoutManager = useFlyoutManager();
    const managerState = flyoutManager?.state;

    const managerSessions = managerState?.sessions;
    const currentSession = managerSessions
      ? managerSessions[managerSessions.length - 1] ?? null
      : null;
    const layoutMode = managerState?.layoutMode ?? LAYOUT_MODE_SIDE_BY_SIDE;
    const isActiveManagedFlyout =
      currentSession?.mainFlyoutId === flyoutId ||
      currentSession?.childFlyoutId === flyoutId;
    const currentZIndexRef = useRef(managerState?.currentZIndex ?? 0);

    // Use a ref to access the latest flyoutManager without triggering effect re-runs
    const flyoutManagerRef = useRef(flyoutManager);
    useEffect(() => {
      flyoutManagerRef.current = flyoutManager;
    }, [flyoutManager]);

    useEffect(() => {
      // Keep track of unmanaged flyouts to properly calculate z-index
      // values for all flyouts
      if (!isInManagedContext) {
        flyoutManagerRef.current?.addUnmanagedFlyout(flyoutId);

        return () => flyoutManagerRef.current?.closeUnmanagedFlyout(flyoutId);
      }
    }, [isInManagedContext, flyoutId]);

    // Derive flyout identity and sibling info from the single context read
    const flyoutIdentity = useMemo(() => {
      if (!flyoutId || !currentSession) {
        return {
          isMainFlyout: false,
          siblingFlyoutId: null as string | null,
          hasValidSession: false,
        };
      }

      const siblingFlyoutId =
        currentSession.mainFlyoutId === flyoutId
          ? currentSession.childFlyoutId
          : currentSession.mainFlyoutId;

      return {
        isMainFlyout: currentSession.mainFlyoutId === flyoutId,
        siblingFlyoutId,
        hasValidSession: true,
      };
    }, [flyoutId, currentSession]);

    // Destructure for easier use
    const { siblingFlyoutId, isMainFlyout } = flyoutIdentity;

    // Derive sibling flyout data from manager state (single read, no extra hooks)
    const siblingFlyout = siblingFlyoutId
      ? managerState?.flyouts.find((f) => f.flyoutId === siblingFlyoutId) ??
        null
      : null;
    const _siblingFlyoutWidth = siblingFlyout?.width;
    const isSiblingFill = siblingFlyout?.size === 'fill';
    const siblingFlyoutMinWidth = siblingFlyout?.minWidth;
    const siblingFlyoutWidth =
      layoutMode === LAYOUT_MODE_STACKED ? 0 : _siblingFlyoutWidth;

    // Observe the container's dimensions so the resize hook and
    // positioning styles stay aligned with its bounding rect.
    // When no container is provided, these remain inert (null/undefined).
    const containerDimensions = useResizeObserver(container ?? null, 'width');
    const containerReferenceWidth = container
      ? containerDimensions.width || container.clientWidth
      : undefined;

    // Track the container's bounding rect for positioning the flyout.
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

    useLayoutEffect(() => {
      if (!container) {
        setContainerRect(null);
        return;
      }
      setContainerRect(container.getBoundingClientRect());
    }, [container, containerDimensions.width]);

    useEffect(() => {
      if (!container) return;

      const updateRect = () => {
        setContainerRect(container.getBoundingClientRect());
      };

      window.addEventListener('scroll', updateRect, { passive: true });
      window.addEventListener('resize', updateRect, { passive: true });
      return () => {
        window.removeEventListener('scroll', updateRect);
        window.removeEventListener('resize', updateRect);
      };
    }, [container]);
    // Prefer the manager's reference width when available so resize clamp
    // uses the same value as layout mode. When we have a container, cap by
    // its measured width so we never allow resize past the container (e.g. if
    // manager had viewport fallback or timing mismatch).
    const managerRefWidth =
      isInManagedContext &&
      typeof managerState?.referenceWidth === 'number' &&
      managerState.referenceWidth > 0
        ? managerState.referenceWidth
        : undefined;
    const effectiveReferenceWidth =
      containerReferenceWidth != null && containerReferenceWidth > 0
        ? managerRefWidth != null
          ? Math.min(managerRefWidth, containerReferenceWidth)
          : containerReferenceWidth
        : managerRefWidth ?? containerReferenceWidth;

    const {
      onMouseDown: onMouseDownResizableButton,
      onKeyDown: onKeyDownResizableButton,
      size,
      setFlyoutRef,
    } = useEuiFlyoutResizable({
      enabled: resizable,
      minWidth,
      maxWidth: typeof maxWidth === 'number' ? maxWidth : 0,
      // For fill siblings, clamp based on their minWidth rather than their
      // current measured width. Fill siblings dynamically adjust via CSS
      // (`calc(90% - mainWidth)`), so subtracting their current width from
      // the max creates a circular dependency where the main flyout can
      // never grow (max = 90% - (90% - main) = main). Using minWidth
      // breaks this cycle while ensuring the fill sibling never collapses
      // below its configured minimum.
      siblingFlyoutWidth: isSiblingFill
        ? siblingFlyoutMinWidth
        : siblingFlyoutWidth ?? undefined,
      referenceWidth: effectiveReferenceWidth,
      onResize,
      side,
      size: _size,
    });

    // Publish the main flyout's resolved width as a CSS custom property on
    // the document element so that the child (fill) flyout can track it
    // synchronously during drag resize, avoiding the 1-frame lag that
    // results from the async ResizeObserver → manager-state pipeline.
    useLayoutEffect(() => {
      if (!isMainFlyout) return;

      // Only set when we have a computed percentage (during active resize)
      if (typeof size === 'string' && size.endsWith('%')) {
        document.documentElement.style.setProperty(
          '--euiFlyoutMainWidth',
          size
        );
      }

      return () => {
        document.documentElement.style.removeProperty('--euiFlyoutMainWidth');
      };
    }, [isMainFlyout, size]);

    /**
     * Setting up the refs on the actual flyout element in order to
     * accommodate for the `isPushed` state by adding padding to the body equal to the width of the element
     */
    const [resizeRef, setResizeRef] = useState<HTMLElement | null>(null);
    const setRef = useCombinedRefs([
      setResizeRef,
      ref,
      internalParentFlyoutRef,
      setFlyoutRef,
    ]);
    const { width } = useResizeObserver(isPushed ? resizeRef : null, 'width');

    /**
     * Effect for adding push padding so the flyout has room. Targets the
     * container element when one is provided, otherwise document.body.
     * Uses useLayoutEffect so padding is applied before child render.
     */
    useLayoutEffect(() => {
      if (!isPushed) {
        return;
      }

      const paddingTarget = container ?? document.body;

      const shouldApplyPadding = !isInManagedContext || isActiveManagedFlyout;

      const paddingSide =
        side === 'left' ? 'paddingInlineStart' : 'paddingInlineEnd';
      const cssVarName = `--euiPushFlyoutOffset${
        side === 'left' ? 'InlineStart' : 'InlineEnd'
      }`;
      const managerSide = side === 'left' ? 'left' : 'right';

      const paddingWidth =
        layoutMode === LAYOUT_MODE_STACKED &&
        isMainFlyout &&
        _siblingFlyoutWidth
          ? _siblingFlyoutWidth
          : width;

      if (shouldApplyPadding) {
        paddingTarget.style[paddingSide] = `${paddingWidth}px`;

        if (shouldSetGlobalPushVars) {
          setGlobalCSSVariables({
            [cssVarName]: `${paddingWidth}px`,
          });
        }
        if (isInManagedContext && flyoutManagerRef.current) {
          flyoutManagerRef.current.setPushPadding(managerSide, paddingWidth);
        }
      } else {
        paddingTarget.style[paddingSide] = '';
        if (shouldSetGlobalPushVars) {
          setGlobalCSSVariables({
            [cssVarName]: null,
          });
        }
        if (isInManagedContext && flyoutManagerRef.current) {
          flyoutManagerRef.current.setPushPadding(managerSide, 0);
        }
      }

      return () => {
        paddingTarget.style[paddingSide] = '';
        if (shouldSetGlobalPushVars) {
          setGlobalCSSVariables({
            [cssVarName]: null,
          });
        }
        if (isInManagedContext && flyoutManagerRef.current) {
          flyoutManagerRef.current.setPushPadding(managerSide, 0);
        }
      };
    }, [
      isPushed,
      isInManagedContext,
      isActiveManagedFlyout,
      setGlobalCSSVariables,
      side,
      width,
      layoutMode,
      isMainFlyout,
      _siblingFlyoutWidth,
      shouldSetGlobalPushVars,
      container,
    ]);

    /**
     * This class doesn't actually do anything by EUI, but is nice to add for consumers (JIC)
     */
    useEffect(() => {
      document.body.classList.add('euiBody--hasFlyout');
      return () => {
        document.body.classList.remove('euiBody--hasFlyout');
      };
    }, []);

    const hasChildFlyout = currentSession?.childFlyoutId != null;
    const isChildFlyout =
      isInManagedContext &&
      hasChildFlyout &&
      currentSession?.childFlyoutId === id;

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

    const handleClose = useCallback(
      (event: EuiFlyoutCloseEvent) => {
        onClose(event);
      },
      [onClose]
    );

    /**
     * ESC key closes flyout based on flyout hierarchy rules
     */
    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (!isPushed && event.key === keys.ESCAPE && shouldCloseOnEscape) {
          event.preventDefault();
          handleClose(event);
        }
      },
      [handleClose, isPushed, shouldCloseOnEscape]
    );

    let managedFlyoutIndex = currentZIndexRef.current;
    if (isInManagedContext && currentSession) {
      managedFlyoutIndex = currentSession.zIndex;
    }

    const { flyoutZIndex, maskZIndex } = useEuiFlyoutZIndex({
      headerZindexLocation: effectiveHeaderZindexLocation,
      isPushed,
      managedFlyoutIndex,
      isChildFlyout: isChildFlyout,
    });

    /**
     * Inline styles position the flyout inside the reference container's
     * bounding rect (document.body or a specific element) while remaining in
     * document.body with position: fixed.
     */
    const inlineStyles = useMemo(() => {
      const composedStyles = composeFlyoutInlineStyles(
        size,
        layoutMode,
        siblingFlyoutId,
        siblingFlyoutWidth || null,
        maxWidth,
        flyoutZIndex
      );

      // Constrain the flyout to the reference container's bounding rect.
      let containerPositionStyles: React.CSSProperties = {};
      if (containerRect) {
        const containerMaxWidth = containerRect.width * 0.9;
        const containerRightOffset = window.innerWidth - containerRect.right;

        // Compute the container-relative width for this flyout.
        //
        // For `position: fixed` elements CSS resolves `%` values against
        // the viewport, not the container. The resize hook outputs
        // percentage strings relative to `_referenceWidth` (the container),
        // so we must convert them to pixel values here.
        //
        // Named sizes use their standard proportions (matching
        // `composeFlyoutSizing`). Percentage strings from the resize hook
        // are parsed and resolved against the container width. Numeric
        // values are used directly.
        const sizePercentMap: Record<string, number> = {
          s: 0.25,
          m: 0.5,
          l: 0.75,
          fill: 0.9,
        };

        let containerRelativeWidth: number | undefined;
        if (typeof size === 'string') {
          const namedPct = sizePercentMap[size];
          if (namedPct !== undefined) {
            containerRelativeWidth = containerRect.width * namedPct;
          } else if (size.endsWith('%')) {
            // Percentage string from the resize hook — the value is
            // relative to `_referenceWidth` (container width). Parse it
            // and resolve against the container to get the correct pixels.
            const pct = parseFloat(size);
            if (!isNaN(pct)) {
              containerRelativeWidth = containerRect.width * (pct / 100);
            }
          }
        } else if (typeof size === 'number') {
          containerRelativeWidth = size;
        }

        // All container-scoped flyouts get top/height from the container rect.
        // Reset minInlineSize to 0 so that the CSS `min-inline-size` (which
        // resolves against the viewport for `position: fixed`) does not
        // prevent the container-relative width constraints from taking effect.
        containerPositionStyles = {
          top: containerRect.top,
          height: containerRect.height,
          minInlineSize: 0,
        };

        if (isChildFlyout) {
          // Child flyouts position themselves relative to the main flyout.
          // In side-by-side mode, `siblingFlyoutWidth` is the main flyout's
          // pixel width; in stacked mode it's 0 (child sits on top).
          const siblingPx = siblingFlyoutWidth || 0;
          if (side === 'left') {
            containerPositionStyles.left = containerRect.left + siblingPx;
          } else {
            containerPositionStyles.right = containerRightOffset + siblingPx;
          }

          if (containerRelativeWidth !== undefined) {
            // Set `inlineSize` (logical property) so it properly overrides
            // `inlineSize` from composedStyles. We intentionally do NOT set
            // maxInlineSize — the CSS `max-inline-size` from the size class
            // provides the size-specific cap on initial render, and the
            // resize hook's clamp handles it after resize interactions.
            //
            // For fill-size children in side-by-side mode, subtract the
            // main flyout's width so the child takes only the remaining
            // available space. For non-fill children, do NOT subtract —
            // a fill-size main will shrink dynamically to accommodate.
            const fillDeduction =
              size === 'fill' &&
              layoutMode === LAYOUT_MODE_SIDE_BY_SIDE &&
              siblingFlyoutWidth
                ? siblingFlyoutWidth
                : 0;
            containerPositionStyles.inlineSize = Math.min(
              Math.max(0, containerRelativeWidth - fillDeduction),
              containerMaxWidth
            );
          } else {
            containerPositionStyles.maxInlineSize = containerMaxWidth;
          }
        } else {
          // Main/standalone flyouts align to the container's edge.
          if (side === 'left') {
            containerPositionStyles.left = containerRect.left;
          } else {
            containerPositionStyles.right = containerRightOffset;
          }

          if (containerRelativeWidth !== undefined) {
            // For fill-size flyouts in side-by-side mode, subtract the
            // sibling's width so the main shrinks to accommodate the child.
            const siblingPx =
              size === 'fill' &&
              layoutMode === LAYOUT_MODE_SIDE_BY_SIDE &&
              siblingFlyoutWidth
                ? siblingFlyoutWidth
                : 0;
            containerPositionStyles.inlineSize = Math.min(
              Math.max(0, containerRelativeWidth - siblingPx),
              containerMaxWidth
            );
          } else {
            containerPositionStyles.maxInlineSize = containerMaxWidth;
          }
        }
      }

      return { ...style, ...composedStyles, ...containerPositionStyles };
    }, [
      style,
      size,
      layoutMode,
      siblingFlyoutId,
      siblingFlyoutWidth,
      maxWidth,
      flyoutZIndex,
      containerRect,
      side,
      isChildFlyout,
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

    const classes = classnames(
      'euiFlyout',
      isChildFlyout && hasChildBackground && 'euiFlyout--hasChildBackground',
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
     * If the flyout menu is to be rendered, ensure the flyout has aria-labelledby referencing the menu's titleId
     */
    const generatedMenuId = useGeneratedHtmlId();
    const { titleId: _titleId, ...flyoutMenuProps } = _flyoutMenuProps || {};
    const hasMenu = !!_flyoutMenuProps;

    const flyoutMenuId = useMemo(() => {
      if (!hasMenu) return undefined;
      return _titleId || generatedMenuId;
    }, [hasMenu, _titleId, generatedMenuId]);

    // If the flyout level is LEVEL_MAIN, the title should be hidden by default
    const flyoutMenuHideTitle = useMemo(() => {
      if (!hasMenu) return undefined;
      if (_flyoutMenuProps?.hideTitle !== undefined) {
        return _flyoutMenuProps.hideTitle;
      }
      return currentSession?.mainFlyoutId === flyoutId;
    }, [hasMenu, _flyoutMenuProps, currentSession, flyoutId]);

    const ariaLabelledBy = useMemo(() => {
      if (flyoutMenuId) {
        return classnames(flyoutMenuId, _ariaLabelledBy);
      }
      return _ariaLabelledBy;
    }, [flyoutMenuId, _ariaLabelledBy]);

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
          if (event.target === maskRef.current) return handleClose(event);
        } else {
          // No overlay mask is present, so any outside clicks should close the flyout
          if (outsideClickCloses === true) return handleClose(event);
        }
        // Otherwise if ownFocus is false and outsideClickCloses is undefined, outside clicks should not close the flyout
        return undefined;
      },
      [handleClose, hasOverlayMask, outsideClickCloses]
    );

    const maskCombinedRefs = useCombinedRefs([maskProps?.maskRef, maskRef]);

    /**
     * For overlay flyouts in managed contexts, coordinate scroll locking with push flyout state.
     */
    const pushPadding = managerState?.pushPadding ?? { left: 0, right: 0 };
    const hasPushPaddingInManager =
      pushPadding.left > 0 || pushPadding.right > 0;
    const shouldDeferScrollLock =
      !isPushed && isInManagedContext && hasPushPaddingInManager;
    const shouldUseScrollLock = hasOverlayMask && !shouldDeferScrollLock;

    return (
      <EuiFlyoutOverlay
        hasOverlayMask={hasOverlayMask}
        isPushed={isPushed}
        maskZIndex={maskZIndex}
        headerZindexLocation={effectiveHeaderZindexLocation}
        maskProps={{
          ...maskProps,
          maskRef: maskCombinedRefs,
        }}
      >
        <EuiWindowEvent event="keydown" handler={onKeyDown} />
        <EuiFocusTrap
          disabled={isPushed}
          scrollLock={shouldUseScrollLock}
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
            aria-labelledby={ariaLabelledBy}
            data-autofocus={!isPushed || undefined}
            onAnimationEnd={onAnimationEnd}
          >
            {!isPushed && screenReaderDescription}
            {!_flyoutMenuProps && !hideCloseButton && (
              <EuiFlyoutCloseButton
                {...closeButtonProps}
                onClose={handleClose}
                closeButtonPosition={closeButtonPosition}
                side={side}
              />
            )}
            {_flyoutMenuProps && (
              <EuiFlyoutMenu
                {...flyoutMenuProps}
                hideTitle={flyoutMenuHideTitle}
                titleId={flyoutMenuId}
              />
            )}
            {resizable && (
              <EuiFlyoutResizeButton
                type={type}
                side={side}
                ownFocus={ownFocus}
                isPushed={isPushed}
                onMouseDown={onMouseDownResizableButton}
                onTouchStart={onMouseDownResizableButton}
                onKeyDown={onKeyDownResizableButton}
              />
            )}
            <EuiFlyoutParentProvider container={containerForContext}>
              {children}
            </EuiFlyoutParentProvider>
          </Element>
        </EuiFocusTrap>
      </EuiFlyoutOverlay>
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
