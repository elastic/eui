/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  KeyboardEvent,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  Ref,
  RefCallback,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { focusable, type FocusableElement } from 'tabbable';

import { CommonProps, NoArgCallback } from '../common';
import { FocusTarget, EuiFocusTrap, EuiFocusTrapProps } from '../focus_trap';
import {
  keys,
  getWaitDuration,
  performOnFrame,
  focusTrapPubSub,
  useCombinedRefs,
  useGeneratedHtmlId,
  useLatest,
} from '../../services';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiPortal } from '../portal';
import { EuiMutationObserver } from '../observer/mutation_observer';
import {
  findPopoverPosition,
  getElementZIndex,
  getPopoverAlignFromAnchorPosition,
  getPopoverPositionFromAnchorPosition,
  popoverAnchorPosition,
  type PopoverAnchorPosition,
  EuiPopoverPosition,
} from '../../services/popover';
import { createRepositionOnScroll } from '../../services/popover/reposition_on_scroll';
import { EuiI18n } from '../i18n';
import { EuiOutsideClickDetector } from '../outside_click_detector';
import { EuiPopoverArrow, EuiPopoverArrowPositions } from './popover_arrow';
import { euiPopoverStyles } from './popover.styles';
import { EuiPopoverPanel } from './popover_panel';
import { EuiPopoverPanelProps } from './popover_panel/_popover_panel';
import { EuiButtonResetProvider } from '../button/button_context';
import { EuiPaddingSize } from '../../global_styling';
import { EuiComponentDefaultsContext } from '../provider/component_defaults';

export { popoverAnchorPosition };
export type { PopoverAnchorPosition };

export interface EuiPopoverProps extends PropsWithChildren, CommonProps {
  /**
   * Alignment of the popover and arrow relative to the button
   * @default downLeft
   */
  anchorPosition?: PopoverAnchorPosition;
  /**
   * Style and position alteration for arrow-less attachment.
   * Intended for use with inputs as anchors, e.g. EuiInputPopover
   */
  attachToAnchor?: boolean;
  /**
   * Triggering element for which to align the popover to
   */
  button: NonNullable<ReactNode>;
  /**
   * Callback to handle hiding of the popover
   */
  closePopover: NoArgCallback<void>;
  /**
   * Restrict the popover's position within this element
   */
  container?: HTMLElement;
  /**
   * CSS display type for both the popover and anchor
   */
  display?: CSSProperties['display'];
  /**
   * Object of props passed to EuiFocusTrap
   */
  focusTrapProps?: Partial<EuiFocusTrapProps>;
  /**
   * Show arrow indicating to originating button
   * @default false
   */
  hasArrow?: boolean;
  /**
   * Specifies what element should initially have focus; Can be a DOM
   * node, or a selector string (which will be passed to
   * document.querySelector() to find the DOM node), or a function that
   * returns a DOM node.
   *
   * If not passed, initial focus defaults to the popover panel.
   */
  initialFocus?: FocusTarget;
  /**
   * Passed directly to EuiPortal for DOM positioning. Both properties are
   * required if prop is specified
   */
  insert?: {
    sibling: HTMLElement;
    position: 'before' | 'after';
  };
  /**
   * Visibility state of the popover
   */
  isOpen?: boolean;
  /**
   * Traps tab focus within the popover contents
   */
  ownFocus?: boolean;
  /**
   * Custom class added to the EuiPanel containing the popover contents
   */
  panelClassName?: string;
  /**
   * EuiPanel padding on all sides
   */
  panelPaddingSize?: EuiPaddingSize;
  /**
   * Standard DOM `style` attribute. Passed to the EuiPanel
   */
  panelStyle?: CSSProperties;
  /**
   * Object of props passed to EuiPanel. See {@link EuiPopoverPanelProps}
   */
  panelProps?: Omit<
    EuiPopoverPanelProps,
    'style' | 'hasShadow' | 'hasBorder' | 'color'
  >;
  panelRef?: RefCallback<HTMLElement | null>;
  /**
   * Optional screen reader instructions to announce upon popover open,
   * in addition to EUI's default popover instructions for Escape on close.
   * Useful for popovers that may have additional keyboard capabilities such as
   * arrow navigation.
   */
  popoverScreenReaderText?: string | ReactNode;
  popoverRef?: Ref<HTMLDivElement>;
  /**
   * When `true`, the popover's position is re-calculated when the user
   * scrolls, this supports having fixed-position popover anchors. When nesting
   * an `EuiPopover` in a scrollable container, `repositionOnScroll` should be `true`
   */
  repositionOnScroll?: boolean;
  /**
   * By default, popovers will attempt to position themselves along the initial
   * axis specified. If there is not enough room either vertically or horizontally
   * however, the popover will attempt to reposition itself along the secondary
   * cross axis if there is room there instead.
   *
   * If you do not want this repositioning to occur (and it is acceptable for
   * the popover to appear offscreen), set this to false to disable this behavior.
   *
   * @default true
   */
  repositionToCrossAxis?: boolean;
  /**
   * By default, popover content inherits the z-index of the anchor
   * component; pass `zIndex` to override
   */
  zIndex?: number;
  /**
   * Distance away from the anchor that the popover will render
   * @default 4 (0 when `hasArrow=true`)
   */
  offset?: number;
  /**
   * Minimum distance between the popover and the bounding container;
   * Pass an array of 4 values to adjust each side differently: `[top, right, bottom, left]`
   * @default 16
   */
  buffer?: number | [number, number, number, number];
  /**
   * Element to pass as the child element of the arrow;
   * Use case is typically limited to an accompanying `EuiBeacon`
   */
  arrowChildren?: ReactNode;
  /**
   * Provide a name to the popover panel
   */
  'aria-label'?: string;
  /**
   * Alternative option to `aria-label` that takes an `id`.
   * Usually takes the `id` of the popover title
   */
  'aria-labelledby'?: string;
  /**
   * Function callback for when the popover positon changes
   */
  onPositionChange?: (position: EuiPopoverPosition) => void;
}

const DEFAULT_POPOVER_STYLES = {
  top: 50,
  left: 50,
};

const returnFocusConfig = { preventScroll: true };
const closingTransitionTime = 250; // TODO: DRY out var when converting to CSS-in-JS

export type Props = EuiPopoverProps & HTMLAttributes<HTMLDivElement>;

export type EuiPopoverRef = {
  positionPopoverFluid: () => void;
};

/**
 * @see {@link https://eui.elastic.co/docs/components/containers/popover/|EuiPopover documentation}
 */
export const EuiPopover = forwardRef<EuiPopoverRef, Props>(
  (
    {
      anchorPosition = 'downLeft',
      button,
      insert,
      isOpen = false,
      ownFocus = true,
      children,
      className,
      closePopover: closePopoverProp,
      panelClassName,
      panelPaddingSize = 'm',
      panelProps,
      panelRef: panelRefProp,
      panelStyle,
      popoverScreenReaderText,
      popoverRef: popoverRefProp,
      hasArrow = false,
      arrowChildren,
      repositionOnScroll,
      repositionToCrossAxis = true,
      zIndex: zIndexProp,
      attachToAnchor,
      display = 'inline-block',
      offset: offsetProp,
      onPositionChange,
      buffer,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-live': ariaLiveProp,
      container,
      focusTrapProps,
      initialFocus: initialFocusProp,
      tabIndex: tabIndexPropFromProps,
      ...rest
    },
    ref
  ) => {
    const componentDefaults = useContext(EuiComponentDefaultsContext);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const panelElementRef = useRef<HTMLElement | null>(null);
    const strandedFocusTimeout = useRef<number>();
    const closingTransitionTimeout = useRef<number>();

    const panelId = useGeneratedHtmlId({
      prefix: 'euiPopover',
      suffix: 'panelId',
    });
    const descriptionId = useGeneratedHtmlId({
      prefix: 'euiPopover',
      suffix: 'descriptionId',
    });

    const [previousIsOpen, setPreviousIsOpen] = useState(isOpen);
    const [suppressingPopover, setSuppressingPopover] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);
    const [popoverPanelStyles, setPopoverPanelStyles] = useState<CSSProperties>(
      DEFAULT_POPOVER_STYLES
    );
    const [arrowStyles, setArrowStyles] = useState<CSSProperties>();
    const [arrowPosition, setArrowPosition] =
      useState<EuiPopoverArrowPositions | null>(null);
    const [openPosition, setOpenPosition] = useState<EuiPopoverPosition | null>(
      null
    );

    if (previousIsOpen !== isOpen) {
      setPreviousIsOpen(isOpen);
      setIsClosing(previousIsOpen && !isOpen);
    }

    const getFocusableToggleButton = useCallback(() => {
      if (buttonRef.current) {
        try {
          const focusableItems = focusable(buttonRef.current);
          if (focusableItems.length) {
            return focusableItems[0];
          }
        } catch {
          // tabbable's focusable() can throw in environments that don't
          // fully support CSS selector parsing (e.g. jsdom with :has())
        }
      }
    }, []);

    const closePopover = useCallback(() => {
      if (isOpen) {
        closePopoverProp();
      }
    }, [closePopoverProp, isOpen]);

    const handleStrandedFocus = useCallback(() => {
      strandedFocusTimeout.current = window.setTimeout(() => {
        if (
          document.activeElement === document.body ||
          panelElementRef.current?.contains(document.activeElement)
        ) {
          getFocusableToggleButton()?.focus(returnFocusConfig);
        }
      }, closingTransitionTime);
    }, [getFocusableToggleButton]);

    const onEscapeKey = useCallback(
      (event: Event) => {
        if (isOpen) {
          event.preventDefault();
          event.stopPropagation();
          closePopover();
          handleStrandedFocus();
        }
      },
      [closePopover, handleStrandedFocus, isOpen]
    );

    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === keys.ESCAPE) {
          onEscapeKey(event as unknown as Event);
        }
      },
      [onEscapeKey]
    );

    const onClickOutside = useCallback(
      (event: Event) => {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          closePopover();
        }
      },
      [closePopover]
    );

    const positionPopover = useCallback(
      (allowEnforcePosition: boolean) => {
        const buttonElement = buttonRef.current;
        const panelElement = panelElementRef.current;
        if (buttonElement == null || panelElement == null) return;

        const offset = offsetProp != null ? offsetProp : hasArrow ? 0 : 4;
        let position = getPopoverPositionFromAnchorPosition(anchorPosition);
        let forcePosition;

        if (allowEnforcePosition && isOpen && openPosition != null) {
          position = openPosition;
          forcePosition = true;
        }

        const {
          top,
          left,
          position: foundPosition,
          arrow,
        } = findPopoverPosition({
          container,
          position,
          forcePosition,
          align: getPopoverAlignFromAnchorPosition(anchorPosition),
          anchor: buttonElement,
          popover: panelElement,
          offset: attachToAnchor ? offset : hasArrow ? 16 + offset : 8 + offset,
          arrowConfig: hasArrow
            ? { arrowWidth: 16, arrowBuffer: 10, borderRadius: 12 }
            : { arrowWidth: 0, arrowBuffer: 0 },
          returnBoundingBox: attachToAnchor,
          allowCrossAxis: repositionToCrossAxis,
          buffer,
        });

        const zIndex =
          zIndexProp == null
            ? getElementZIndex(buttonElement, panelElement) + 2000
            : zIndexProp;
        const nextArrowPosition: EuiPopoverPosition = foundPosition;

        onPositionChange?.(nextArrowPosition);
        setPopoverPanelStyles({ ...panelStyle, top, left, zIndex });
        setArrowStyles(!attachToAnchor && hasArrow ? arrow : undefined);
        setArrowPosition(nextArrowPosition);
        setOpenPosition(foundPosition);
      },
      [
        anchorPosition,
        attachToAnchor,
        buffer,
        container,
        hasArrow,
        isOpen,
        offsetProp,
        onPositionChange,
        openPosition,
        panelStyle,
        repositionToCrossAxis,
        zIndexProp,
      ]
    );

    const positionPopoverFixed = useCallback(
      () => positionPopover(true),
      [positionPopover]
    );
    const positionPopoverFluid = useCallback(
      () => positionPopover(false),
      [positionPopover]
    );

    useImperativeHandle(ref, () => ({ positionPopoverFluid }), [
      positionPopoverFluid,
    ]);

    const positionPopoverFixedRef = useLatest(positionPopoverFixed);
    const positionPopoverFluidRef = useLatest(positionPopoverFluid);
    const repositionOnScrollPropRef = useLatest(repositionOnScroll);
    const componentDefaultsRef = useLatest(componentDefaults.EuiPopover);

    const repositionOnScrollCallback = useCallback(
      () => positionPopoverFixedRef.current?.(),
      [positionPopoverFixedRef]
    );
    const repositionOnScrollManager = useMemo(
      () =>
        createRepositionOnScroll(() => ({
          repositionOnScroll: repositionOnScrollPropRef.current ?? undefined,
          componentDefaults: componentDefaultsRef.current ?? undefined,
          repositionFn: repositionOnScrollCallback,
        })),
      [
        componentDefaultsRef,
        repositionOnScrollCallback,
        repositionOnScrollPropRef,
      ]
    );

    const resizeCallback = useCallback(
      () => positionPopoverFluidRef.current?.(),
      [positionPopoverFluidRef]
    );

    const setPanelElement = useCallback(
      (node: HTMLElement | null) => {
        panelElementRef.current = node;

        if (node == null) {
          setPopoverPanelStyles(DEFAULT_POPOVER_STYLES);
          setArrowStyles(undefined);
          setArrowPosition(null);
          setOpenPosition(null);
        } else {
          positionPopoverFluidRef.current?.();
        }
      },
      [positionPopoverFluidRef]
    );

    const panelRefs = useMemo(
      () => [setPanelElement, panelRefProp],
      [panelRefProp, setPanelElement]
    );
    const setPanelRef = useCombinedRefs<HTMLDivElement | null>(panelRefs);
    const popoverRefs = useMemo(
      () => [buttonRef, popoverRefProp],
      [popoverRefProp]
    );
    const setPopoverRef = useCombinedRefs<HTMLDivElement | null>(popoverRefs);

    const updateTriggerButtonAriaAttributes = useCallback(
      (toggleButton: FocusableElement | undefined) => {
        if (!toggleButton) return;

        const tag = toggleButton.tagName?.toLowerCase();
        const role = toggleButton.getAttribute('role')?.toLowerCase();
        const isButtonLike = tag === 'button' || role === 'button';
        if (!isButtonLike) return;

        toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        if (isOpen) {
          toggleButton.setAttribute('aria-controls', panelId);
        } else {
          toggleButton.removeAttribute('aria-controls');
        }
      },
      [isOpen, panelId]
    );

    const onMutation = useCallback(
      (records: MutationRecord[]) => {
        const waitDuration = getWaitDuration(records);
        const repositionPopover = positionPopoverFixedRef.current;
        if (!repositionPopover) return;

        repositionPopover();
        performOnFrame(waitDuration, repositionPopover);
      },
      [positionPopoverFixedRef]
    );

    useLayoutEffect(() => {
      setSuppressingPopover(false);
    }, []);

    useLayoutEffect(() => {
      updateTriggerButtonAriaAttributes(getFocusableToggleButton());
    }, [getFocusableToggleButton, updateTriggerButtonAriaAttributes]);

    useLayoutEffect(() => {
      if (isOpen && !suppressingPopover) {
        clearTimeout(strandedFocusTimeout.current);
        clearTimeout(closingTransitionTimeout.current);
        positionPopoverFixedRef.current?.();
        focusTrapPubSub.publish();
      }
    }, [isOpen, positionPopoverFixedRef, suppressingPopover]);

    const previousPositioningProps = useRef({
      anchorPosition,
      buffer,
      offset: offsetProp,
      panelPaddingSize,
    });

    useLayoutEffect(() => {
      const previous = previousPositioningProps.current;
      previousPositioningProps.current = {
        anchorPosition,
        buffer,
        offset: offsetProp,
        panelPaddingSize,
      };

      if (
        isOpen &&
        (previous.anchorPosition !== anchorPosition ||
          previous.buffer !== buffer ||
          previous.offset !== offsetProp ||
          previous.panelPaddingSize !== panelPaddingSize)
      ) {
        positionPopoverFluidRef.current?.();
      }
    }, [
      anchorPosition,
      buffer,
      isOpen,
      offsetProp,
      panelPaddingSize,
      positionPopoverFluidRef,
    ]);

    useEffect(() => {
      if (!isClosing) return;

      closingTransitionTimeout.current = window.setTimeout(() => {
        setIsClosing(false);
        focusTrapPubSub.publish();
      }, closingTransitionTime);

      return () => clearTimeout(closingTransitionTimeout.current);
    }, [isClosing]);

    useEffect(() => {
      if (!isOpen) return;

      window.addEventListener('resize', resizeCallback);
      return () => window.removeEventListener('resize', resizeCallback);
    }, [isOpen, resizeCallback]);

    useEffect(() => {
      repositionOnScrollManager.subscribe();
      return () => {
        repositionOnScrollManager.cleanup();
        clearTimeout(strandedFocusTimeout.current);
        clearTimeout(closingTransitionTimeout.current);
        focusTrapPubSub.publish();
      };
    }, [repositionOnScrollManager]);

    useEffect(() => {
      repositionOnScrollManager.update();
    }, [
      componentDefaults.EuiPopover,
      repositionOnScroll,
      repositionOnScrollManager,
    ]);

    const tabIndexProp = panelProps?.tabIndex ?? tabIndexPropFromProps;
    const styles = euiPopoverStyles();
    const popoverStyles = [styles.euiPopover, { display, label: display }];
    const classes = classNames(
      'euiPopover',
      { 'euiPopover-isOpen': isOpen },
      className
    );
    const showArrow = hasArrow && !attachToAnchor;

    let panel;
    if (!suppressingPopover && (isOpen || isClosing)) {
      let tabIndex = tabIndexProp;
      let initialFocus = initialFocusProp;
      let ariaDescribedby;
      let ariaLive: HTMLAttributes<any>['aria-live'];

      const panelAriaModal = panelProps?.hasOwnProperty('aria-modal')
        ? panelProps['aria-modal']
        : 'true';
      const panelRole = panelProps?.hasOwnProperty('role')
        ? panelProps.role
        : 'dialog';

      if (ownFocus || panelAriaModal !== 'true') {
        tabIndex = tabIndexProp ?? 0;
        ariaLive = 'off';
        if (!initialFocus) {
          initialFocus = () => panelElementRef.current!;
        }
      } else {
        ariaLive = ariaLiveProp ?? 'assertive';
      }

      let focusTrapScreenReaderText;
      if (ownFocus || popoverScreenReaderText) {
        ariaDescribedby = descriptionId;
        focusTrapScreenReaderText = (
          <EuiScreenReaderOnly>
            <p id={descriptionId}>
              {ownFocus && (
                <EuiI18n
                  token="euiPopover.screenReaderAnnouncement"
                  default="You are in a dialog. Press Escape, or tap/click outside the dialog to close."
                />
              )}
              {popoverScreenReaderText}
            </p>
          </EuiScreenReaderOnly>
        );
      }

      panel = (
        <EuiPortal {...(insert && { insert })}>
          <EuiFocusTrap
            clickOutsideDisables={true}
            onClickOutside={onClickOutside}
            returnFocus={isOpen ? returnFocusConfig : false}
            initialFocus={initialFocus}
            onEscapeKey={onEscapeKey}
            disabled={!ownFocus || !isOpen || isClosing}
            {...focusTrapProps}
          >
            <EuiButtonResetProvider>
              <EuiPopoverPanel
                id={panelId}
                {...(panelProps as EuiPopoverPanelProps)}
                panelRef={setPanelRef}
                isOpen={isOpen}
                position={arrowPosition}
                isAttached={attachToAnchor}
                className={classNames(panelClassName, panelProps?.className)}
                hasShadow={false}
                hasBorder={false}
                paddingSize={panelPaddingSize}
                tabIndex={tabIndex}
                aria-live={ariaLive}
                role={panelRole}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-modal={panelAriaModal}
                aria-describedby={ariaDescribedby}
                style={popoverPanelStyles}
              >
                {showArrow && arrowPosition && (
                  <EuiPopoverArrow position={arrowPosition} style={arrowStyles}>
                    {arrowChildren}
                  </EuiPopoverArrow>
                )}
                {focusTrapScreenReaderText}
                <EuiMutationObserver
                  observerOptions={{
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true,
                  }}
                  onMutation={onMutation}
                >
                  {(mutationRef) => <div ref={mutationRef}>{children}</div>}
                </EuiMutationObserver>
              </EuiPopoverPanel>
            </EuiButtonResetProvider>
          </EuiFocusTrap>
        </EuiPortal>
      );
    }

    const content = (
      <div
        css={popoverStyles}
        className={classes}
        ref={setPopoverRef}
        {...(!ownFocus && { onKeyDown })}
        {...rest}
      >
        {button instanceof HTMLElement ? null : button}
        {panel}
      </div>
    );

    return ownFocus ? (
      content
    ) : (
      <EuiOutsideClickDetector onOutsideClick={closePopover}>
        {content}
      </EuiOutsideClickDetector>
    );
  }
);

EuiPopover.displayName = 'EuiPopover';
