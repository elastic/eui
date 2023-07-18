/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  KeyboardEvent,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  Ref,
  RefCallback,
} from 'react';
import classNames from 'classnames';
import { focusable } from 'tabbable';

import { CommonProps, NoArgCallback } from '../common';
import { FocusTarget, EuiFocusTrap, EuiFocusTrapProps } from '../focus_trap';

import {
  cascadingMenuKeys,
  getTransitionTimings,
  getWaitDuration,
  performOnFrame,
  htmlIdGenerator,
} from '../../services';

import { EuiScreenReaderOnly } from '../accessibility';

import { EuiPortal } from '../portal';

import { EuiMutationObserver } from '../observer/mutation_observer';

import {
  findPopoverPosition,
  getElementZIndex,
  EuiPopoverPosition,
} from '../../services/popover';

import { EuiI18n } from '../i18n';
import { EuiOutsideClickDetector } from '../outside_click_detector';
import { EuiPopoverArrow, EuiPopoverArrowPositions } from './popover_arrow';
import { euiPopoverStyles } from './popover.styles';
import { EuiPopoverPanel } from './popover_panel';
import { EuiPopoverPanelProps } from './popover_panel/_popover_panel';
import { EuiPaddingSize } from '../../global_styling';

export const popoverAnchorPosition = [
  'upCenter',
  'upLeft',
  'upRight',
  'downCenter',
  'downLeft',
  'downRight',
  'leftCenter',
  'leftUp',
  'leftDown',
  'rightCenter',
  'rightUp',
  'rightDown',
] as const;

export type PopoverAnchorPosition = (typeof popoverAnchorPosition)[number];
type AnchorPosition = 'up' | 'right' | 'down' | 'left';

export interface EuiPopoverProps extends CommonProps {
  /**
   * Class name passed to the direct parent of the button
   */
  anchorClassName?: string;
  /**
   * Alignment of the popover and arrow relative to the button
   */
  anchorPosition?: PopoverAnchorPosition;
  /**
   * Style and position alteration for arrow-less, left-aligned
   * attachment. Intended for use with inputs as anchors, e.g.
   * EuiInputPopover
   */
  attachToAnchor?: boolean;
  /**
   * Triggering element for which to align the popover to
   */
  button: NonNullable<ReactNode>;
  buttonRef?: RefCallback<HTMLDivElement>;
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
   * Object of props passed to EuiPanel. See #EuiPopoverPanelProps
   */
  panelProps?: Omit<EuiPopoverPanelProps, 'style' | 'hasShadow' | 'hasBorder'>;
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
   * Must be set to true if using `EuiDragDropContext` within a popover,
   * otherwise your nested drag & drop will have incorrect positioning
   */
  hasDragDrop?: boolean;
  /**
   * By default, popover content inherits the z-index of the anchor
   * component; pass `zIndex` to override
   */
  zIndex?: number;
  /**
   * Distance away from the anchor that the popover will render
   */
  offset?: number;
  /**
   * Minimum distance between the popover and the bounding container;
   * Pass an array of 4 values to adjust each side differently: `[top, right, bottom, left]`
   * Default is 16
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

const anchorPositionToPopoverPositionMap: {
  [position in AnchorPosition]: EuiPopoverPosition;
} = {
  up: 'top',
  right: 'right',
  down: 'bottom',
  left: 'left',
};

export function getPopoverPositionFromAnchorPosition(
  anchorPosition: PopoverAnchorPosition
) {
  // maps the anchor position to the matching popover position
  // e.g. "upLeft" -> "top", "downRight" -> "bottom"

  // extract the first positional word from anchorPosition:
  // starts at the beginning (" ^ ") of anchorPosition and
  // captures all of the characters (" (.*?) ") until the
  // first capital letter (" [A-Z] ") is encountered
  const [, primaryPosition] = anchorPosition.match(/^(.*?)[A-Z]/)!;
  return anchorPositionToPopoverPositionMap[primaryPosition as AnchorPosition];
}

export function getPopoverAlignFromAnchorPosition(
  anchorPosition: PopoverAnchorPosition
) {
  // maps the gravity to the matching popover position
  // e.g. "upLeft" -> "left", "rightDown" -> "bottom"

  // extract the second positional word from anchorPosition:
  // starts a capture group at the first capital letter
  // and includes everything after it
  const [, align] = anchorPosition.match(/([A-Z].*)/)!;

  // this performs two tasks:
  // 1. normalizes the align position by lowercasing it
  // 2. `center` doesn't exist in the lookup map which converts it to `undefined` meaning no align
  return anchorPositionToPopoverPositionMap[
    align.toLowerCase() as AnchorPosition
  ];
}

const DEFAULT_POPOVER_STYLES = {
  top: 50,
  left: 50,
};

const returnFocusConfig = { preventScroll: true };
const closingTransitionTime = 250; // TODO: DRY out var when converting to CSS-in-JS

export type Props = EuiPopoverProps & HTMLAttributes<HTMLDivElement>;

interface State {
  prevProps: {
    isOpen?: boolean;
  };
  suppressingPopover?: boolean;
  isClosing: boolean;
  isOpening: boolean;
  popoverStyles: CSSProperties;
  arrowStyles?: CSSProperties;
  arrowPosition: EuiPopoverArrowPositions | null;
  openPosition: any; // What should this be?
  isOpenStable: boolean;
}

type PropsWithDefaults = Props & {
  anchorPosition: PopoverAnchorPosition;
  hasArrow: boolean;
  isOpen: boolean;
  ownFocus: boolean;
  panelPaddingSize: EuiPaddingSize;
};

export class EuiPopover extends Component<Props, State> {
  static defaultProps: Partial<PropsWithDefaults> = {
    isOpen: false,
    ownFocus: true,
    anchorPosition: 'downCenter',
    panelPaddingSize: 'm',
    hasArrow: true,
    display: 'inline-block',
  };

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): Partial<State> | null {
    if (prevState.prevProps.isOpen && !nextProps.isOpen) {
      return {
        prevProps: {
          isOpen: nextProps.isOpen,
        },
        isClosing: true,
        isOpening: false,
      };
    }

    if (prevState.prevProps.isOpen !== nextProps.isOpen) {
      return {
        prevProps: {
          isOpen: nextProps.isOpen,
        },
      };
    }

    return null;
  }

  private respositionTimeout: number | undefined;
  private strandedFocusTimeout: number | undefined;
  private closingTransitionTimeout: number | undefined;
  private closingTransitionAnimationFrame: number | undefined;
  private button: HTMLElement | null = null;
  private panel: HTMLElement | null = null;
  private descriptionId: string = htmlIdGenerator()();

  constructor(props: Props) {
    super(props);

    this.state = {
      prevProps: {
        isOpen: props.isOpen,
      },
      suppressingPopover: props.isOpen, // only suppress if created with isOpen=true
      isClosing: false,
      isOpening: false,
      popoverStyles: DEFAULT_POPOVER_STYLES,
      arrowStyles: {},
      arrowPosition: null,
      openPosition: null, // once a stable position has been found, keep the contents on that side
      isOpenStable: false, // wait for any initial opening transitions to finish before marking as stable
    };
  }

  closePopover = () => {
    if (this.props.isOpen) {
      this.props.closePopover();
    }
  };

  onEscapeKey = (event: Event) => {
    if (this.props.isOpen) {
      event.preventDefault();
      event.stopPropagation();
      this.closePopover();
      this.handleStrandedFocus();
    }
  };

  handleStrandedFocus = () => {
    this.strandedFocusTimeout = window.setTimeout(() => {
      // If `returnFocus` failed and focus was stranded on the body,
      // attempt to manually restore focus to the toggle button
      if (document.activeElement === document.body) {
        if (!this.button) return;

        const focusableItems = focusable(this.button);
        if (!focusableItems.length) return;

        const toggleButton = focusableItems[0];
        toggleButton.focus(returnFocusConfig);
      }
    }, closingTransitionTime);
  };

  onKeyDown = (event: KeyboardEvent) => {
    if (event.key === cascadingMenuKeys.ESCAPE) {
      this.onEscapeKey(event as unknown as Event);
    }
  };

  onClickOutside = (event: Event) => {
    // only close the popover if the event source isn't the anchor button
    // otherwise, it is up to the anchor to toggle the popover's open status
    if (this.button && this.button.contains(event.target as Node) === false) {
      this.closePopover();
    }
  };

  onOpenPopover = () => {
    clearTimeout(this.strandedFocusTimeout);
    clearTimeout(this.closingTransitionTimeout);
    if (this.closingTransitionAnimationFrame) {
      cancelAnimationFrame(this.closingTransitionAnimationFrame);
    }
    // We need to set this state a beat after the render takes place, so that the CSS
    // transition can take effect.
    this.closingTransitionAnimationFrame = window.requestAnimationFrame(() => {
      this.setState({
        isOpening: true,
      });
    });

    // for each child element of `this.panel`, find any transition duration we should wait for before stabilizing
    const { durationMatch, delayMatch } = Array.prototype.slice
      .call(this.panel ? [this.panel, ...Array.from(this.panel.children)] : [])
      .reduce(
        ({ durationMatch, delayMatch }, element) => {
          const transitionTimings = getTransitionTimings(element);

          return {
            durationMatch: Math.max(
              durationMatch,
              transitionTimings.durationMatch
            ),
            delayMatch: Math.max(delayMatch, transitionTimings.delayMatch),
          };
        },
        { durationMatch: 0, delayMatch: 0 }
      );

    clearTimeout(this.respositionTimeout);
    this.respositionTimeout = window.setTimeout(() => {
      this.setState({ isOpenStable: true }, () => {
        this.positionPopoverFixed();
      });
    }, durationMatch + delayMatch);
  };

  componentDidMount() {
    if (this.state.suppressingPopover) {
      // component was created with isOpen=true; now that it's mounted
      // stop suppressing and start opening
      this.setState({ suppressingPopover: false, isOpening: true }, () => {
        this.onOpenPopover();
      });
    }

    if (this.props.repositionOnScroll) {
      window.addEventListener('scroll', this.positionPopoverFixed, true);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // The popover is being opened.
    if (!prevProps.isOpen && this.props.isOpen) {
      this.onOpenPopover();
    }

    // update scroll listener
    if (prevProps.repositionOnScroll !== this.props.repositionOnScroll) {
      if (this.props.repositionOnScroll) {
        window.addEventListener('scroll', this.positionPopoverFixed, true);
      } else {
        window.removeEventListener('scroll', this.positionPopoverFixed, true);
      }
    }

    // The popover is being closed.
    if (prevProps.isOpen && !this.props.isOpen) {
      // If the user has just closed the popover, queue up the removal of the content after the
      // transition is complete.
      this.closingTransitionTimeout = window.setTimeout(() => {
        this.setState({
          isClosing: false,
        });
      }, closingTransitionTime);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.positionPopoverFixed, true);
    clearTimeout(this.respositionTimeout);
    clearTimeout(this.strandedFocusTimeout);
    clearTimeout(this.closingTransitionTimeout);
    cancelAnimationFrame(this.closingTransitionAnimationFrame!);
  }

  onMutation = (records: MutationRecord[]) => {
    const waitDuration = getWaitDuration(records);
    this.positionPopoverFixed();

    performOnFrame(waitDuration, this.positionPopoverFixed);
  };

  positionPopover = (allowEnforcePosition: boolean) => {
    if (this.button == null || this.panel == null) return;

    const { anchorPosition } = this.props as PropsWithDefaults;

    let position = getPopoverPositionFromAnchorPosition(anchorPosition);
    let forcePosition = undefined;
    if (
      allowEnforcePosition &&
      this.state.isOpenStable &&
      this.state.openPosition != null
    ) {
      position = this.state.openPosition;
      forcePosition = true;
    }

    const {
      top,
      left,
      position: foundPosition,
      arrow,
      anchorBoundingBox,
    } = findPopoverPosition({
      container: this.props.container,
      position,
      forcePosition,
      align: getPopoverAlignFromAnchorPosition(anchorPosition),
      anchor: this.button,
      popover: this.panel,
      offset:
        !this.props.attachToAnchor && this.props.hasArrow
          ? 16 + (this.props.offset || 0)
          : 8 + (this.props.offset || 0),
      arrowConfig: {
        arrowWidth: 24,
        arrowBuffer: 10,
      },
      returnBoundingBox: this.props.attachToAnchor,
      buffer: this.props.buffer,
    });

    // the popover's z-index must inherit from the button
    // this keeps a button's popover under a flyout that would cover the button
    // but a popover triggered inside a flyout will appear over that flyout
    const { zIndex: zIndexProp } = this.props;
    const zIndex =
      zIndexProp == null
        ? getElementZIndex(this.button, this.panel) + 2000
        : zIndexProp;

    const popoverStyles = {
      ...this.props.panelStyle,
      top,
      left:
        this.props.attachToAnchor && anchorBoundingBox
          ? anchorBoundingBox.left
          : left,
      zIndex,
    };

    const willRenderArrow = !this.props.attachToAnchor && this.props.hasArrow;
    const arrowStyles = willRenderArrow ? arrow : undefined;
    const arrowPosition: EuiPopoverPosition = foundPosition;

    this.props.onPositionChange && this.props.onPositionChange(arrowPosition);

    this.setState({
      popoverStyles,
      arrowStyles,
      arrowPosition,
      openPosition: foundPosition,
    });
  };

  positionPopoverFixed = () => {
    this.positionPopover(true);
  };

  positionPopoverFluid = () => {
    this.positionPopover(false);
  };

  panelRef = (node: HTMLElement | null) => {
    this.panel = node;
    this.props.panelRef && this.props.panelRef(node);

    if (node == null) {
      // panel has unmounted, restore the state defaults
      this.setState({
        popoverStyles: DEFAULT_POPOVER_STYLES,
        arrowStyles: {},
        arrowPosition: null,
        openPosition: null,
        isOpenStable: false,
      });
      window.removeEventListener('resize', this.positionPopoverFluid);
    } else {
      // panel is coming into existence
      this.positionPopoverFluid();
      window.addEventListener('resize', this.positionPopoverFluid);
    }
  };

  buttonRef = (node: HTMLDivElement | null) => {
    this.button = node;
    this.props.buttonRef && this.props.buttonRef(node);
  };

  render() {
    const {
      anchorClassName,
      anchorPosition,
      button,
      buttonRef,
      insert,
      isOpen,
      ownFocus,
      children,
      className,
      closePopover,
      panelClassName,
      panelPaddingSize,
      panelProps,
      panelRef,
      panelStyle,
      popoverScreenReaderText,
      popoverRef,
      hasArrow,
      arrowChildren,
      repositionOnScroll,
      hasDragDrop,
      zIndex,
      attachToAnchor,
      display,
      offset,
      onPositionChange,
      buffer,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      container,
      focusTrapProps,
      initialFocus: initialFocusProp,
      tabIndex: _tabIndexProp,
      ...rest
    } = this.props;
    const tabIndexProp = panelProps?.tabIndex ?? _tabIndexProp;

    const styles = euiPopoverStyles();
    const popoverStyles = [styles.euiPopover, { display }];
    const classes = classNames(
      'euiPopover',
      {
        'euiPopover-isOpen': this.state.isOpening,
      },
      className
    );

    const anchorClasses = classNames('euiPopover__anchor', anchorClassName);
    const showArrow = hasArrow && !attachToAnchor;

    let panel;

    if (!this.state.suppressingPopover && (isOpen || this.state.isClosing)) {
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
          initialFocus = () => this.panel!;
        }
      } else {
        ariaLive = 'assertive';
      }

      let focusTrapScreenReaderText;
      if (ownFocus || popoverScreenReaderText) {
        ariaDescribedby = this.descriptionId;

        focusTrapScreenReaderText = (
          <EuiScreenReaderOnly>
            <p id={this.descriptionId}>
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

      const returnFocus = this.state.isOpenStable ? returnFocusConfig : false;

      panel = (
        <EuiPortal insert={insert}>
          <EuiFocusTrap
            clickOutsideDisables={true}
            onClickOutside={this.onClickOutside}
            returnFocus={returnFocus} // Ignore temporary state of indecisive focus
            initialFocus={initialFocus}
            onEscapeKey={this.onEscapeKey}
            disabled={
              !ownFocus || !this.state.isOpenStable || this.state.isClosing
            }
            {...focusTrapProps}
          >
            <EuiPopoverPanel
              {...(panelProps as EuiPopoverPanelProps)}
              panelRef={this.panelRef}
              isOpen={this.state.isOpening}
              position={this.state.arrowPosition}
              isAttached={attachToAnchor}
              className={classNames(panelClassName, panelProps?.className)}
              hasDragDrop={hasDragDrop}
              hasShadow={false}
              paddingSize={panelPaddingSize}
              tabIndex={tabIndex}
              aria-live={ariaLive}
              role={panelRole}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-modal={panelAriaModal}
              aria-describedby={ariaDescribedby}
              style={{
                ...this.state.popoverStyles,
                // Adding `will-change` to reduce risk of a blurry animation in Chrome 86+
                willChange: !this.state.isOpenStable
                  ? 'transform, opacity'
                  : undefined,
              }}
            >
              {showArrow && this.state.arrowPosition && (
                <EuiPopoverArrow
                  position={this.state.arrowPosition}
                  style={this.state.arrowStyles}
                >
                  {arrowChildren}
                </EuiPopoverArrow>
              )}
              {focusTrapScreenReaderText}
              <EuiMutationObserver
                observerOptions={{
                  attributes: true, // element attribute changes
                  childList: true, // added/removed elements
                  characterData: true, // text changes
                  subtree: true, // watch all child elements
                }}
                onMutation={this.onMutation}
              >
                {(mutationRef) => <div ref={mutationRef}>{children}</div>}
              </EuiMutationObserver>
            </EuiPopoverPanel>
          </EuiFocusTrap>
        </EuiPortal>
      );
    }

    // react-focus-on and related do not register outside click detection
    // when disabled, so we still need to conditionally check for that ourselves
    if (ownFocus) {
      return (
        <div css={popoverStyles} className={classes} ref={popoverRef} {...rest}>
          <div css={{ display }} className={anchorClasses} ref={this.buttonRef}>
            {button instanceof HTMLElement ? null : button}
          </div>
          {panel}
        </div>
      );
    } else {
      return (
        <EuiOutsideClickDetector onOutsideClick={this.closePopover}>
          <div
            css={popoverStyles}
            className={classes}
            ref={popoverRef}
            onKeyDown={this.onKeyDown}
            {...rest}
          >
            <div
              css={{ display }}
              className={anchorClasses}
              ref={this.buttonRef}
            >
              {button instanceof HTMLElement ? null : button}
            </div>
            {panel}
          </div>
        </EuiOutsideClickDetector>
      );
    }
  }
}
