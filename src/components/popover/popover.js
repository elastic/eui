import React, {
  cloneElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import tabbable from 'tabbable';

import { cascadingMenuKeyCodes } from '../../services';

import { EuiOutsideClickDetector } from '../outside_click_detector';

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
      id,
      className,
      closePopover,
      panelClassName,
      panelPaddingSize,
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

      if (ownFocus) {
        tabIndex = '0';
        initialFocus = () => this.panel;
      }

      panel = (
        <FocusTrap
          focusTrapOptions={{
            clickOutsideDeactivates: true,
            initialFocus,
          }}
        >
          <EuiPanel
            panelRef={this.panelRef}
            className={panelClasses}
            paddingSize={panelPaddingSize}
            tabIndex={tabIndex}
            hasShadow
            id={id}
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
          {...rest}
        >
          {cloneElement(button, {
            'aria-controls': id,
            'aria-expanded': !!isOpen,
          })}
          {panel}
        </div>
      </EuiOutsideClickDetector>
    );
  }
}

EuiPopover.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  ownFocus: PropTypes.bool,
  withTitle: PropTypes.bool,
  closePopover: PropTypes.func.isRequired,
  button: PropTypes.node.isRequired,
  children: PropTypes.node,
  anchorPosition: PropTypes.oneOf(ANCHOR_POSITIONS),
  panelClassName: PropTypes.string,
  panelPaddingSize: PropTypes.oneOf(SIZES),
};

EuiPopover.defaultProps = {
  isOpen: false,
  ownFocus: false,
  anchorPosition: 'downCenter',
  panelPaddingSize: 'm',
};
