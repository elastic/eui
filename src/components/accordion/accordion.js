import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../icon';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../flex';

export class EuiAccordion extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.initialIsOpen,
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
      id,
      buttonClassName,
      buttonContentClassName,
      extraAction,
      initialIsOpen, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classNames(
      'euiAccordion',
      {
        'euiAccordion-isOpen': this.state.isOpen,
      },
      className
    );

    const buttonClasses = classNames(
      'euiAccordion__button',
      buttonClassName,
    );

    const buttonContentClasses = classNames(
      'euiAccordion__buttonContent',
      buttonContentClassName,
    );

    const icon = (
      <EuiIcon type={this.state.isOpen ? 'arrowDown' : 'arrowRight'} size="m" />
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
            <button
              aria-controls={id}
              aria-expanded={!!this.state.isOpen}
              onClick={this.onToggleOpen}
              className={buttonClasses}
            >
              <EuiFlexGroup gutterSize="s" alignItems="center">
                <EuiFlexItem grow={false}>
                  {icon}
                </EuiFlexItem>

                <EuiFlexItem className={buttonContentClasses}>
                  {buttonContent}
                </EuiFlexItem>
              </EuiFlexGroup>
            </button>
          </EuiFlexItem>

          {optionalAction}
        </EuiFlexGroup>

        <div
          className="euiAccordion__childWrapper"
          ref={node => { this.childWrapper = node; }}
          id={id}
        >
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
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  buttonContentClassName: PropTypes.string,
  buttonContent: PropTypes.node,
  extraAction: PropTypes.node,
  initialIsOpen: PropTypes.bool,
};

EuiAccordion.defaultProps = {
  initialIsOpen: false,
};
