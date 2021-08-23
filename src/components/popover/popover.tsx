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
import tabbable from 'tabbable';

import { CommonProps, NoArgCallback } from '../common';
import { FocusTarget, EuiFocusTrap, EuiFocusTrapProps } from '../focus_trap';
import { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';

import {
  cascadingMenuKeys,
  getTransitionTimings,
  getWaitDuration,
  performOnFrame,
  htmlIdGenerator,
} from '../../services';

import { EuiScreenReaderOnly } from '../accessibility';

import { EuiPanel, PanelPaddingSize, EuiPanelProps } from '../panel';

import { EuiPortal } from '../portal';

import { EuiMutationObserver } from '../observer/mutation_observer';

import {
  findPopoverPosition,
  getElementZIndex,
  EuiPopoverPosition,
} from '../../services/popover';

import { EuiI18n } from '../i18n';
import { EuiOutsideClickDetector } from '../outside_click_detector';

export type PopoverAnchorPosition =
  | 'upCenter'
  | 'upLeft'
  | 'upRight'
  | 'downCenter'
  | 'downLeft'
  | 'downRight'
  | 'leftCenter'
  | 'leftUp'
  | 'leftDown'
  | 'rightCenter'
  | 'rightUp'
  | 'rightDown';

const generateId = htmlIdGenerator();

export interface EuiPopoverProps {
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
  display?: keyof typeof displayToClassNameMap;
  /**
   * Object of props passed to EuiFocusTrap
   */
  focusTrapProps?: Pick<
    EuiFocusTrapProps,
    'clickOutsideDisables' | 'noIsolation' | 'scrollLock' | 'shards'
  >;
  /**
   * Show arrow indicating to originating button
   */
  hasArrow?: boolean;
  /**
   * Specifies what element should initially have focus; Can be a DOM
   * node, or a selector string (which will be passed to
   * document.querySelector() to find the DOM node), or a function that
   * returns a DOM node
   * Set to `false` to prevent initial auto-focus. Use only
   * when your app handles setting initial focus state.
   */
  initialFocus?: FocusTarget | false;
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
  panelPaddingSize?: PanelPaddingSize;
  /**
   * Standard DOM `style` attribute. Passed to the EuiPanel
   */
  panelStyle?: CSSProperties;
  /**
   * Object of props passed to EuiPanel
   */
  panelProps?: Omit<EuiPanelProps, 'style'>;
  panelRef?: RefCallback<HTMLElement | null>;
  popoverRef?: Ref<HTMLDivElement>;
  /**
   * When `true`, the popover's position is re-calculated when the user
   * scrolls, this supports having fixed-position popover anchors
   */
  repositionOnScroll?: boolean;
  /**
   * By default, popover content inherits the z-index of the anchor
   * component; pass `zIndex` to override
   */
  zIndex?: number;
  /**
   * Function callback for when the focus trap is deactivated
   */
  onTrapDeactivation?: ReactFocusOnProps['onDeactivation'];
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
}

type AnchorPosition = 'up' | 'right' | 'down' | 'left';

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

const anchorPositionToClassNameMap = {
  upCenter: 'euiPopover--anchorUpCenter',
  upLeft: 'euiPopover--anchorUpLeft',
  upRight: 'euiPopover--anchorUpRight',
  downCenter: 'euiPopover--anchorDownCenter',
  downLeft: 'euiPopover--anchorDownLeft',
  downRight: 'euiPopover--anchorDownRight',
  leftCenter: 'euiPopover--anchorLeftCenter',
  leftUp: 'euiPopover--anchorLeftUp',
  leftDown: 'euiPopover--anchorLeftDown',
  rightCenter: 'euiPopover--anchorRightCenter',
  rightUp: 'euiPopover--anchorRightUp',
  rightDown: 'euiPopover--anchorRightDown',
};

export const ANCHOR_POSITIONS = Object.keys(anchorPositionToClassNameMap);

const displayToClassNameMap = {
  inlineBlock: undefined,
  block: 'euiPopover--displayBlock',
};

export const DISPLAY = Object.keys(displayToClassNameMap);

const DEFAULT_POPOVER_STYLES = {
  top: 50,
  left: 50,
};

function getElementFromInitialFocus(
  initialFocus?: FocusTarget
): HTMLElement | null {
  const initialFocusType = typeof initialFocus;

  if (initialFocusType === 'string') {
    return document.querySelector(initialFocus as string);
  }

  if (initialFocusType === 'function') {
    return (initialFocus as () => HTMLElement | null)();
  }

  return initialFocus as HTMLElement | null;
}

const returnFocusConfig = { preventScroll: true };

export type Props = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiPopoverProps;

interface State {
  prevProps: {
    isOpen?: boolean;
  };
  suppressingPopover?: boolean;
  isClosing: boolean;
  isOpening: boolean;
  popoverStyles: CSSProperties;
  arrowStyles?: CSSProperties;
  arrowPosition: any; // What should this be?
  openPosition: any; // What should this be?
  isOpenStable: boolean;
}

type PropsWithDefaults = Props & {
  anchorPosition: PopoverAnchorPosition;
  /** CSS display type for both the popover and anchor */
  display: keyof typeof displayToClassNameMap;
  hasArrow: boolean;
  isOpen: boolean;
  ownFocus: boolean;
  panelPaddingSize: PanelPaddingSize;
};

export class EuiPopover extends Component<Props, State> {
  static defaultProps: Partial<PropsWithDefaults> = {
    isOpen: false,
    ownFocus: true,
    anchorPosition: 'downCenter',
    panelPaddingSize: 'm',
    hasArrow: true,
    display: 'inlineBlock',
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
  private closingTransitionTimeout: number | undefined;
  private closingTransitionAnimationFrame: number | undefined;
  private updateFocusAnimationFrame: number | undefined;
  private button: HTMLElement | null = null;
  private panel: HTMLElement | null = null;
  private hasSetInitialFocus: boolean = false;

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
    }
  };

  onKeyDown = (event: KeyboardEvent) => {
    if (event.key === cascadingMenuKeys.ESCAPE) {
      this.onEscapeKey((event as unknown) as Event);
    }
  };

  onClickOutside = (event: Event) => {
    // only close the popover if the event source isn't the anchor button
    // otherwise, it is up to the anchor to toggle the popover's open status
    if (this.button && this.button.contains(event.target as Node) === false) {
      this.closePopover();
    }
  };

  updateFocus() {
    // Wait for the DOM to update.
    this.updateFocusAnimationFrame = window.requestAnimationFrame(() => {
      if (
        !this.props.ownFocus ||
        !this.panel ||
        this.props.initialFocus === false
      ) {
        return;
      }

      // If we've already focused on something inside the panel, everything's fine.
      if (
        this.hasSetInitialFocus &&
        this.panel.contains(document.activeElement)
      ) {
        return;
      }

      // Otherwise let's focus the first tabbable item and expedite input from the user.
      let focusTarget;

      if (this.props.initialFocus != null) {
        focusTarget = getElementFromInitialFocus(this.props.initialFocus);
      } else {
        const tabbableItems = tabbable(this.panel);
        if (tabbableItems.length) {
          focusTarget = tabbableItems[0];
        }
      }

      // there's a race condition between the popover content becoming visible and this function call
      // if the element isn't visible yet (due to css styling) then it can't accept focus
      // so wait for another render and try again
      if (focusTarget == null) {
        // there isn't a focus target, one of two reasons:
        // #1 is the whole panel hidden? If so, schedule another check
        // #2 panel is visible but no tabbables exist, move focus to the panel
        const panelVisibility = window.getComputedStyle(this.panel).visibility;
        if (panelVisibility === 'hidden') {
          // #1
          this.updateFocus();
        } else {
          // #2
          focusTarget = this.panel;
        }
      } else {
        // found an element to focus, but is it visible?
        const visibility = window.getComputedStyle(focusTarget).visibility;
        if (visibility === 'hidden') {
          // not visible, check again next render frame
          this.updateFocus();
        }
      }

      if (focusTarget != null) {
        this.hasSetInitialFocus = true;
        focusTarget.focus();
      }
    });
  }

  onOpenPopover = () => {
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
        this.updateFocus();
      });
    }, durationMatch + delayMatch);
  };

  componentDidMount() {
    if (this.state.suppressingPopover) {
      // component was created with isOpen=true; now that it's mounted
      // stop suppressing and start opening
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ suppressingPopover: false, isOpening: true }, () => {
        this.onOpenPopover();
      });
    }

    if (this.props.repositionOnScroll) {
      window.addEventListener('scroll', this.positionPopoverFixed);
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
        window.addEventListener('scroll', this.positionPopoverFixed);
      } else {
        window.removeEventListener('scroll', this.positionPopoverFixed);
      }
    }

    // The popover is being closed.
    if (prevProps.isOpen && !this.props.isOpen) {
      // If the user has just closed the popover, queue up the removal of the content after the
      // transition is complete.
      this.closingTransitionTimeout = window.setTimeout(() => {
        this.hasSetInitialFocus = false;
        this.setState({
          isClosing: false,
        });
      }, 250);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.positionPopoverFixed);
    clearTimeout(this.respositionTimeout);
    clearTimeout(this.closingTransitionTimeout);
    cancelAnimationFrame(this.closingTransitionAnimationFrame!);
    cancelAnimationFrame(this.updateFocusAnimationFrame!);
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
    const arrowPosition = foundPosition;

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
      popoverRef,
      hasArrow,
      arrowChildren,
      repositionOnScroll,
      zIndex,
      initialFocus,
      attachToAnchor,
      display,
      onTrapDeactivation,
      buffer,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      container,
      focusTrapProps,
      tabIndex: tabIndexProp,
      ...rest
    } = this.props;

    const descriptionId = generateId();

    const classes = classNames(
      'euiPopover',
      anchorPosition ? anchorPositionToClassNameMap[anchorPosition] : null,
      display ? displayToClassNameMap[display] : null,
      {
        'euiPopover-isOpen': this.state.isOpening,
      },
      className
    );

    const anchorClasses = classNames('euiPopover__anchor', anchorClassName);

    const panelClasses = classNames(
      'euiPopover__panel',
      `euiPopover__panel--${this.state.arrowPosition}`,
      { 'euiPopover__panel-isOpen': this.state.isOpening },
      { 'euiPopover__panel-noArrow': !hasArrow || attachToAnchor },
      { 'euiPopover__panel-isAttached': attachToAnchor },
      panelClassName,
      panelProps?.className
    );

    let panel;

    if (!this.state.suppressingPopover && (isOpen || this.state.isClosing)) {
      let tabIndex = tabIndexProp;
      let initialFocus;
      let ariaDescribedby;
      let ariaLive: HTMLAttributes<any>['aria-live'];

      if (ownFocus) {
        tabIndex = tabIndexProp ?? 0;
        ariaLive = 'off';

        initialFocus = () => this.panel!;
      } else {
        ariaLive = 'assertive';
      }

      let focusTrapScreenReaderText;
      if (ownFocus) {
        ariaDescribedby = descriptionId;
        focusTrapScreenReaderText = (
          <EuiScreenReaderOnly>
            <p id={descriptionId}>
              <EuiI18n
                token="euiPopover.screenReaderAnnouncement"
                default="You are in a dialog. To close this dialog, hit escape."
              />
            </p>
          </EuiScreenReaderOnly>
        );
      }

      const arrowClassNames = classNames(
        'euiPopover__panelArrow',
        `euiPopover__panelArrow--${this.state.arrowPosition}`
      );

      const returnFocus = this.state.isOpenStable ? returnFocusConfig : false;

      panel = (
        <EuiPortal insert={insert}>
          <EuiFocusTrap
            clickOutsideDisables={true}
            {...focusTrapProps}
            returnFocus={returnFocus} // Ignore temporary state of indecisive focus
            initialFocus={initialFocus}
            onDeactivation={onTrapDeactivation}
            onClickOutside={this.onClickOutside}
            onEscapeKey={this.onEscapeKey}
            disabled={
              !ownFocus || !this.state.isOpenStable || this.state.isClosing
            }
          >
            <EuiPanel
              {...(panelProps as EuiPanelProps)}
              panelRef={this.panelRef}
              className={panelClasses}
              hasShadow={false}
              paddingSize={panelPaddingSize}
              tabIndex={tabIndex}
              aria-live={ariaLive}
              role="dialog"
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-modal="true"
              aria-describedby={ariaDescribedby}
              style={{
                ...this.state.popoverStyles,
                // Adding `will-change` to reduce risk of a blurry animation in Chrome 86+
                willChange: !this.state.isOpenStable
                  ? 'transform, opacity'
                  : undefined,
              }}
            >
              <div className={arrowClassNames} style={this.state.arrowStyles}>
                {arrowChildren}
              </div>
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
            </EuiPanel>
          </EuiFocusTrap>
        </EuiPortal>
      );
    }

    // react-focus-on and relataed do not register outside click detection
    // when disabled, so we still need to conditionally check for that ourselves
    if (ownFocus) {
      return (
        <div className={classes} ref={popoverRef} {...rest}>
          <div className={anchorClasses} ref={this.buttonRef}>
            {button instanceof HTMLElement ? null : button}
          </div>
          {panel}
        </div>
      );
    } else {
      return (
        <EuiOutsideClickDetector onOutsideClick={this.closePopover}>
          <div
            className={classes}
            ref={popoverRef}
            onKeyDown={this.onKeyDown}
            {...rest}
          >
            <div className={anchorClasses} ref={this.buttonRef}>
              {button instanceof HTMLElement ? null : button}
            </div>
            {panel}
          </div>
        </EuiOutsideClickDetector>
      );
    }
  }
}
