import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import tabbable from 'tabbable';

import { cascadingMenuKeyCodes } from '../../services';

import { EuiOutsideClickDetector } from '../outside_click_detector';

import { EuiScreenReaderOnly } from '../accessibility';

import { EuiPanel, SIZES } from '../panel';

import { EuiPortal } from '../portal';

import { findPopoverPosition, getElementZIndex } from '../../services/popover/popover_positioning';

const anchorPositionToPopoverPositionMap = {
  'up': 'top',
  'right': 'right',
  'down': 'bottom',
  'left': 'left'
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
  'upCenter': 'euiPopover--anchorUpCenter',
  'upLeft': 'euiPopover--anchorUpLeft',
  'upRight': 'euiPopover--anchorUpRight',
  'downCenter': 'euiPopover--anchorDownCenter',
  'downLeft': 'euiPopover--anchorDownLeft',
  'downRight': 'euiPopover--anchorDownRight',
  'leftCenter': 'euiPopover--anchorLeftCenter',
  'leftUp': 'euiPopover--anchorLeftUp',
  'leftDown': 'euiPopover--anchorLeftDown',
  'rightCenter': 'euiPopover--anchorRightCenter',
  'rightUp': 'euiPopover--anchorRightUp',
  'rightDown': 'euiPopover--anchorRightDown',
};

export const ANCHOR_POSITIONS = Object.keys(anchorPositionToClassNameMap);

const DEFAULT_POPOVER_STYLES = {
  top: 50,
  left: 50,
};

export class EuiPopover extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.prevProps.isOpen && !nextProps.isOpen) {
      return {
        prevProps: {
          isOpen: nextProps.isOpen
        },
        isClosing: true,
        isOpening: false,
      };
    }

    if (prevState.prevProps.isOpen !== nextProps.isOpen) {
      return {
        prevProps: {
          isOpen: nextProps.isOpen
        }
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
        isOpen: props.isOpen
      },
      isClosing: false,
      isOpening: false,
      popoverStyles: DEFAULT_POPOVER_STYLES,
      arrowStyles: {},
      arrowPosition: null,
    };
  }

  onKeyDown = e => {
    if (e.keyCode === cascadingMenuKeyCodes.ESCAPE) {
      e.preventDefault();
      e.stopPropagation();
      this.props.closePopover();
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
      const tabbableItems = tabbable(this.panel);
      if (tabbableItems.length) {
        tabbableItems[0].focus();
      }
    });
  }

  componentDidMount() {
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
    clearTimeout(this.closingTransitionTimeout);
  }

  positionPopover = () => {
    const { top, left, position, arrow } = findPopoverPosition({
      position: getPopoverPositionFromAnchorPosition(this.props.anchorPosition),
      align: getPopoverAlignFromAnchorPosition(this.props.anchorPosition),
      anchor: this.button,
      popover: this.panel,
      offset: 16,
      arrowConfig: {
        arrowWidth: 24,
        arrowBuffer: 0,
      }
    });

    // the popver's z-index must inherit from the button
    // this keeps a button's popover under a flyout that would cover the button
    // but a popover triggered inside a flyout will appear over that flyout
    const zIndex = getElementZIndex(this.button, this.panel);

    const popoverStyles = {
      top,
      left,
      zIndex,
    };

    const arrowStyles = arrow;
    const arrowPosition = position;

    this.setState({ popoverStyles, arrowStyles, arrowPosition });
  }

  panelRef = node => {
    this.panel = node;

    if (node == null) {
      // panel has unmounted, restore the state defaults
      this.setState({
        popoverStyles: DEFAULT_POPOVER_STYLES,
        arrowStyles: {},
        arrowPosition: null,
      });
      window.removeEventListener('resize', this.positionPopover);
    } else {
      // panel is coming into existence
      this.positionPopover();
      window.addEventListener('resize', this.positionPopover);
    }
  };

  buttonRef = node => this.button = node;

  render() {
    const {
      anchorPosition,
      button,
      isOpen,
      ownFocus,
      withTitle,
      children,
      className,
      closePopover,
      panelClassName,
      panelPaddingSize,
      popoverRef,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiPopover',
      anchorPositionToClassNameMap[anchorPosition],
      {
        'euiPopover-isOpen': this.state.isOpening,
        'euiPopover--withTitle': withTitle,
      },
      className,
    );

    const panelClasses = classNames(
      'euiPopover__panel',
      `euiPopover__panel-${this.state.arrowPosition}`,
      { 'euiPopover__panel-isOpen': this.state.isOpening },
      { 'euiPopover__panel-withTitle': withTitle },
      panelClassName
    );

    let panel;

    if (isOpen || this.state.isClosing) {
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
            <p role="alert">You are in a popup. To exit this popup, hit escape.</p>
          </EuiScreenReaderOnly>
        );
      }

      const arrowClassNames = classNames(
        'euiPopover__panel__arrow',
        `euiPopover__panel__arrow-${this.state.arrowPosition}`
      );

      panel = (
        <EuiPortal>
          <FocusTrap
            active={ownFocus}
            focusTrapOptions={{
              clickOutsideDeactivates: true,
              initialFocus,
            }}
          >
            {focusTrapScreenReaderText}
            <EuiPanel
              panelRef={this.panelRef}
              className={panelClasses}
              paddingSize={panelPaddingSize}
              tabIndex={tabIndex}
              hasShadow
              aria-live={ariaLive}
              style={this.state.popoverStyles}
            >
              <div className={arrowClassNames} style={this.state.arrowStyles}/>
              {children}
            </EuiPanel>
          </FocusTrap>
        </EuiPortal>
      );
    }

    return (
      <EuiOutsideClickDetector onOutsideClick={closePopover}>
        <div
          className={classes}
          onKeyDown={this.onKeyDown}
          ref={popoverRef}
          {...rest}
        >
          <div className="euiPopover__anchor" ref={this.buttonRef}>
            {button}
          </div>
          {panel}
        </div>
      </EuiOutsideClickDetector>
    );
  }
}

EuiPopover.propTypes = {
  isOpen: PropTypes.bool,
  ownFocus: PropTypes.bool,
  withTitle: PropTypes.bool,
  closePopover: PropTypes.func.isRequired,
  button: PropTypes.node.isRequired,
  children: PropTypes.node,
  anchorPosition: PropTypes.oneOf(ANCHOR_POSITIONS),
  panelClassName: PropTypes.string,
  panelPaddingSize: PropTypes.oneOf(SIZES),
  popoverRef: PropTypes.func
};

EuiPopover.defaultProps = {
  isOpen: false,
  ownFocus: false,
  anchorPosition: 'downCenter',
  panelPaddingSize: 'm',
};
