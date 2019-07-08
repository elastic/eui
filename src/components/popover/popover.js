import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tabbable from 'tabbable';

import { cascadingMenuKeyCodes } from '../../services';

import { EuiFocusTrap } from '../focus_trap';

import { EuiOutsideClickDetector } from '../outside_click_detector';

import { EuiScreenReaderOnly } from '../accessibility';

import { EuiPanel, SIZES } from '../panel';

import { EuiPortal } from '../portal';

import { EuiMutationObserver } from '../observer/mutation_observer';

import {
  findPopoverPosition,
  getElementZIndex,
} from '../../services/popover/popover_positioning';
import { EuiI18n } from '../i18n';

const anchorPositionToPopoverPositionMap = {
  up: 'top',
  right: 'right',
  down: 'bottom',
  left: 'left',
};
export function getPopoverPositionFromAnchorPosition(anchorPosition) {
  // maps the anchor position to the matching popover position
  // e.g. "upLeft" -> "top", "downRight" -> "bottom"

  // extract the first positional word from anchorPosition:
  // starts at the beginning (" ^ ") of anchorPosition and
  // captures all of the characters (" (.*?) ") until the
  // first capital letter (" [A-Z] ") is encountered
  const [, primaryPosition] = anchorPosition.match(/^(.*?)[A-Z]/);
  return anchorPositionToPopoverPositionMap[primaryPosition];
}
export function getPopoverAlignFromAnchorPosition(anchorPosition) {
  // maps the gravity to the matching popover position
  // e.g. "upLeft" -> "left", "rightDown" -> "bottom"

  // extract the second positional word from anchorPosition:
  // starts a capture group at the first capital letter
  // and includes everything after it
  const [, align] = anchorPosition.match(/([A-Z].*)/);

  // this performs two tasks:
  // 1. normalizes the align position by lowercasing it
  // 2. `center` doesn't exist in the lookup map which converts it to `undefined` meaning no align
  return anchorPositionToPopoverPositionMap[align.toLowerCase()];
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

const DEFAULT_POPOVER_STYLES = {
  top: 50,
  left: 50,
};

const GROUP_NUMERIC = /^([\d.]+)/;

function getElementFromInitialFocus(initialFocus) {
  const initialFocusType = typeof initialFocus;
  if (initialFocusType === 'string')
    return document.querySelector(initialFocus);
  if (initialFocusType === 'function') return initialFocus();
  return initialFocus;
}

function getTransitionTimings(element) {
  const computedStyle = window.getComputedStyle(element);

  const computedDuration = computedStyle.getPropertyValue(
    'transition-duration'
  );
  let durationMatch = computedDuration.match(GROUP_NUMERIC);
  durationMatch = durationMatch ? parseFloat(durationMatch[1]) * 1000 : 0;

  const computedDelay = computedStyle.getPropertyValue('transition-delay');
  let delayMatch = computedDelay.match(GROUP_NUMERIC);
  delayMatch = delayMatch ? parseFloat(delayMatch[1]) * 1000 : 0;

  return { durationMatch, delayMatch };
}

export class EuiPopover extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
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

  constructor(props) {
    super(props);

    this.closingTransitionTimeout = undefined;
    this.button = null;

    this.state = {
      prevProps: {
        isOpen: props.isOpen,
      },
      suppressingPopover: this.props.isOpen, // only suppress if created with isOpen=true
      isClosing: false,
      isOpening: false,
      popoverStyles: DEFAULT_POPOVER_STYLES,
      arrowStyles: {},
      arrowPosition: null,
      openPosition: null, // once a stable position has been found, keep the contents on that side
      isOpenStable: false, // wait for any initial opening transitions to finish before marking as stable
    };
  }

  onKeyDown = e => {
    if (e.keyCode === cascadingMenuKeyCodes.ESCAPE) {
      if (this.state.isOpenStable || this.state.isOpening) {
        e.preventDefault();
        e.stopPropagation();
        this.props.closePopover();
      }
    }
  };

  updateFocus() {
    // Wait for the DOM to update.
    window.requestAnimationFrame(() => {
      if (!this.props.ownFocus || !this.panel) {
        return;
      }

      // If we've already focused on something inside the panel, everything's fine.
      if (this.panel.contains(document.activeElement)) {
        return;
      }

      // Otherwise let's focus the first tabbable item and expedite input from the user.
      let focusTarget;

      if (this.props.initialFocus != null) {
        focusTarget = getElementFromInitialFocus(this.props.initialFocus);
        // there's a race condition between the popover content becoming visible and this function call
        // if the element isn't visible yet (due to css styling) then it can't accept focus
        // so wait for another render and try again
        const visibility = window.getComputedStyle(focusTarget).visibility;
        if (visibility === 'hidden') {
          this.updateFocus();
        }
      } else {
        const tabbableItems = tabbable(this.panel);
        if (tabbableItems.length) {
          focusTarget = tabbableItems[0];
        }
      }

      if (focusTarget != null) focusTarget.focus();
    });
  }

  componentDidMount() {
    if (this.state.suppressingPopover) {
      // component was created with isOpen=true; now that it's mounted
      // stop suppressing and start opening
      this.setState({ suppressingPopover: false, isOpening: true }); // eslint-disable-line react/no-did-mount-set-state
    }

    if (this.props.repositionOnScroll) {
      window.addEventListener('scroll', this.positionPopoverFixed);
    }

    this.updateFocus();
  }

  componentDidUpdate(prevProps) {
    // The popover is being opened.
    if (!prevProps.isOpen && this.props.isOpen) {
      clearTimeout(this.closingTransitionTimeout);
      // We need to set this state a beat after the render takes place, so that the CSS
      // transition can take effect.
      window.requestAnimationFrame(() => {
        this.setState({
          isOpening: true,
        });
      });

      // for each child element of `this.panel`, find any transition duration we should wait for before stabilizing
      const { durationMatch, delayMatch } = Array.prototype.slice
        .call(this.panel.children)
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

      setTimeout(() => {
        this.setState({ isOpenStable: true }, this.positionPopoverFixed);
      }, durationMatch + delayMatch);
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
      this.closingTransitionTimeout = setTimeout(() => {
        this.setState({
          isClosing: false,
        });
      }, 250);
    }

    this.updateFocus();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.positionPopoverFixed);
    clearTimeout(this.closingTransitionTimeout);
  }

  onMutation = records => {
    const waitDuration = records.reduce((waitDuration, record) => {
      // only check for CSS transition values for ELEMENT nodes
      if (record.target.nodeType === document.ELEMENT_NODE) {
        const { durationMatch, delayMatch } = getTransitionTimings(
          record.target
        );
        waitDuration = Math.max(waitDuration, durationMatch + delayMatch);
      }

      return waitDuration;
    }, 0);
    this.positionPopoverFixed();

    if (waitDuration > 0) {
      const startTime = Date.now();
      const endTime = startTime + waitDuration;

      const onFrame = () => {
        this.positionPopoverFixed();

        if (endTime > Date.now()) {
          requestAnimationFrame(onFrame);
        }
      };

      requestAnimationFrame(onFrame);
    }
  };

  positionPopover = allowEnforcePosition => {
    if (this.button == null || this.panel == null) return;

    let position = getPopoverPositionFromAnchorPosition(
      this.props.anchorPosition
    );
    let forcePosition = null;
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
      align: getPopoverAlignFromAnchorPosition(this.props.anchorPosition),
      anchor: this.button,
      popover: this.panel,
      offset: !this.props.attachToAnchor && this.props.hasArrow ? 16 : 8,
      arrowConfig: {
        arrowWidth: 24,
        arrowBuffer: 10,
      },
      returnBoundingBox: this.props.attachToAnchor,
    });

    // the popover's z-index must inherit from the button
    // this keeps a button's popover under a flyout that would cover the button
    // but a popover triggered inside a flyout will appear over that flyout
    const { zIndex: zIndexProp } = this.props;
    const zIndex =
      zIndexProp == null
        ? getElementZIndex(this.button, this.panel)
        : zIndexProp;

    const popoverStyles = {
      top,
      left: this.props.attachToAnchor ? anchorBoundingBox.left : left,
      zIndex,
    };

    const willRenderArrow = !this.props.attachToAnchor && this.props.hasArrow;
    const arrowStyles = willRenderArrow ? arrow : null;
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

  panelRef = node => {
    this.panel = node;

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

  buttonRef = node => (this.button = node);

  render() {
    const {
      anchorClassName,
      anchorPosition,
      button,
      insert,
      isOpen,
      ownFocus,
      withTitle,
      children,
      className,
      closePopover,
      panelClassName,
      panelPaddingSize,
      popoverRef,
      hasArrow,
      repositionOnScroll,
      zIndex,
      initialFocus,
      attachToAnchor,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiPopover',
      anchorPositionToClassNameMap[anchorPosition],
      {
        'euiPopover-isOpen': this.state.isOpening,
        'euiPopover--withTitle': withTitle,
      },
      className
    );

    const anchorClasses = classNames('euiPopover__anchor', anchorClassName);

    const panelClasses = classNames(
      'euiPopover__panel',
      `euiPopover__panel--${this.state.arrowPosition}`,
      { 'euiPopover__panel-isOpen': this.state.isOpening },
      { 'euiPopover__panel-withTitle': withTitle },
      { 'euiPopover__panel-noArrow': !hasArrow || attachToAnchor },
      panelClassName
    );

    let panel;

    if (!this.state.suppressingPopover && (isOpen || this.state.isClosing)) {
      let tabIndex;
      let initialFocus;
      let ariaLive;

      if (ownFocus) {
        tabIndex = '0';
        ariaLive = 'off';

        initialFocus = () => this.panel;
      } else {
        ariaLive = 'assertive';
      }

      let focusTrapScreenReaderText;
      if (ownFocus) {
        focusTrapScreenReaderText = (
          <EuiScreenReaderOnly>
            <p role="alert">
              <EuiI18n
                token="euiPopover.screenReaderAnnouncement"
                default="You are in a popup. To exit this popup, hit escape."
              />
            </p>
          </EuiScreenReaderOnly>
        );
      }

      const arrowClassNames = classNames(
        'euiPopover__panelArrow',
        `euiPopover__panelArrow--${this.state.arrowPosition}`
      );

      panel = (
        <EuiPortal insert={insert}>
          <EuiFocusTrap
            clickOutsideDisables={true}
            initialFocus={initialFocus}
            disabled={!ownFocus}>
            {focusTrapScreenReaderText}
            <EuiPanel
              panelRef={this.panelRef}
              className={panelClasses}
              paddingSize={panelPaddingSize}
              tabIndex={tabIndex}
              aria-live={ariaLive}
              style={this.state.popoverStyles}>
              <div className={arrowClassNames} style={this.state.arrowStyles} />
              <EuiMutationObserver
                observerOptions={{
                  attributes: true, // element attribute changes
                  childList: true, // added/removed elements
                  characterData: true, // text changes
                  subtree: true, // watch all child elements
                }}
                onMutation={this.onMutation}>
                {mutationRef => <div ref={mutationRef}>{children}</div>}
              </EuiMutationObserver>
            </EuiPanel>
          </EuiFocusTrap>
        </EuiPortal>
      );
    }

    return (
      <EuiOutsideClickDetector
        isDisabled={!isOpen}
        onOutsideClick={closePopover}>
        <div
          className={classes}
          onKeyDown={this.onKeyDown}
          ref={popoverRef}
          {...rest}>
          <div className={anchorClasses} ref={this.buttonRef}>
            {button instanceof HTMLElement ? null : button}
          </div>
          {panel}
        </div>
      </EuiOutsideClickDetector>
    );
  }
}

EuiPopover.propTypes = {
  anchorClassName: PropTypes.string,
  anchorPosition: PropTypes.oneOf(ANCHOR_POSITIONS),
  isOpen: PropTypes.bool,
  ownFocus: PropTypes.bool,
  withTitle: PropTypes.bool,
  closePopover: PropTypes.func.isRequired,
  button: PropTypes.node.isRequired,
  children: PropTypes.node,
  panelClassName: PropTypes.string,
  panelPaddingSize: PropTypes.oneOf(SIZES),
  popoverRef: PropTypes.func,
  hasArrow: PropTypes.bool,
  container: PropTypes.instanceOf(HTMLElement),
  /** When `true`, the popover's position is re-calculated when the user scrolls, this supports having fixed-position popover anchors. */
  repositionOnScroll: PropTypes.bool,
  /** By default, popover content inherits the z-index of the anchor component; pass zIndex to override */
  zIndex: PropTypes.number,
  /** specifies what element should initially have focus; Can be a DOM node, or a selector string (which will be passed to document.querySelector() to find the DOM node), or a function that returns a DOM node. */
  initialFocus: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLElement),
    PropTypes.func,
    PropTypes.string,
  ]),
  /** Passed directly to EuiPortal for DOM positioning. Both properties are required if prop is specified **/
  insert: PropTypes.shape({
    sibling: PropTypes.instanceOf(HTMLElement),
    position: PropTypes.oneOf(['before', 'after']),
  }),
  /** Style and position alteration for arrow-less, left-aligned attachment. Intended for use with inputs as anchors, à la EuiColorPicker */
  attachToAnchor: PropTypes.bool,
};

EuiPopover.defaultProps = {
  isOpen: false,
  ownFocus: false,
  anchorPosition: 'downCenter',
  panelPaddingSize: 'm',
  hasArrow: true,
};
