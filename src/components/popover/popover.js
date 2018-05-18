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

export class EuiPopover extends Component {
  constructor(props) {
    super(props);

    this.closingTransitionTimeout = undefined;

    this.state = {
      isClosing: false,
      isOpening: false,
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
      if (!this.panel) {
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

  // TODO: React 16.3 - componentDidUpdate
  componentWillReceiveProps(nextProps) {
    // The popover is being opened.
    if (!this.props.isOpen && nextProps.isOpen) {
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
    if (this.props.isOpen && !nextProps.isOpen) {
      // If the user has just closed the popover, queue up the removal of the content after the
      // transition is complete.
      this.setState({
        isClosing: true,
        isOpening: false,
      });

      this.closingTransitionTimeout = setTimeout(() => {
        this.setState({
          isClosing: false,
        });
      }, 250);
    }
  }

  componentDidUpdate() {
    this.updateFocus();
  }

  componentWillUnmount() {
    clearTimeout(this.closingTransitionTimeout);
  }

  panelRef = node => {
    if (this.props.ownFocus) {
      this.panel = node;
    }
  };

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
      className,
      {
        'euiPopover-isOpen': this.state.isOpening,
        'euiPopover--withTitle': withTitle,
      },
    );

    const panelClasses = classNames('euiPopover__panel', panelClassName);

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
            <p role="alert">You are in a popup menu. To exit this menu hit escape.</p>
          </EuiScreenReaderOnly>
        );
      }

      panel = (
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
          >
            {children}
          </EuiPanel>
        </FocusTrap>
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
          {button}
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
