import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiKeyboardAccessible,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '..';

export class EuiAccordion extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    const currentState = this.state.isOpen;
    const height = this.childContent.clientHeight;
    this.setState({
      isOpen: !currentState,
    });

    if (!currentState) {
      this.childWrapper.setAttribute('style', `height: ${height}px`);
    } else {
      this.childWrapper.setAttribute('style', `height: 0px`);
    }
  }

  render() {
    const {
      children,
      buttonContent,
      className,
      buttonClassName,
      buttonContentClassName,
      extraAction,
      ...rest,
    } = this.props;

    const classes = classNames(
      'kuiAccordion',
      {
        'kuiAccordion-isOpen': this.state.isOpen,
      },
      className
    );

    const buttonClasses = classNames(
      'kuiAccordion__button',
      buttonClassName,
    );

    const buttonContentClasses = classNames(
      'kuiAccordion__buttonContent',
      buttonContentClassName,
    );

    const icon = (
      <EuiIcon type={this.state.isOpen ? 'arrowDown' : 'arrowRight'} size="medium" />
    );

    let optionalAction = null;

    if (extraAction) {
      optionalAction = (
        <EuiFlexItem grow={false}>
          {extraAction}
        </EuiFlexItem>
      );
    }

    return (
      <div
        className={classes}
        {...rest}
      >
        <EuiFlexGroup gutterSize="none" alignItems="center">
          <EuiFlexItem>
            <EuiKeyboardAccessible>
              <div onClick={this.onToggleOpen} className={buttonClasses}>
                <EuiFlexGroup gutterSize="small" alignItems="center">
                  <EuiFlexItem grow={false}>
                    {icon}
                  </EuiFlexItem>
                  <EuiFlexItem className={buttonContentClasses}>
                    {buttonContent}
                  </EuiFlexItem>
                </EuiFlexGroup>
              </div>
            </EuiKeyboardAccessible>
          </EuiFlexItem>
          {optionalAction}
        </EuiFlexGroup>

        <div className="kuiAccordion__childWrapper"  ref={node => { this.childWrapper = node; }}>
          <div ref={node => { this.childContent = node; }}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

EuiAccordion.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  buttonContentClassName: PropTypes.string,
  buttonContent: PropTypes.node,
  extraAction: PropTypes.node,
};
