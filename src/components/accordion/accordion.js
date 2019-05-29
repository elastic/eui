import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../icon';

import { EuiFlexGroup, EuiFlexItem } from '../flex';

import { EuiMutationObserver } from '../observer/mutation_observer';

const paddingSizeToClassNameMap = {
  none: null,
  xs: 'euiAccordion__padding--xs',
  s: 'euiAccordion__padding--s',
  m: 'euiAccordion__padding--m',
  l: 'euiAccordion__padding--l',
  xl: 'euiAccordion__padding--xl',
};

export const PADDING_SIZES = Object.keys(paddingSizeToClassNameMap);

export class EuiAccordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.initialIsOpen,
    };

    this.onToggle = this.onToggle.bind(this);
  }

  setChildContentHeight = () => {
    requestAnimationFrame(() => {
      const height =
        this.childContent && this.state.isOpen
          ? this.childContent.clientHeight
          : 0;
      this.childWrapper &&
        this.childWrapper.setAttribute('style', `height: ${height}px`);
    });
  };

  componentDidMount() {
    this.setChildContentHeight();
  }

  componentDidUpdate() {
    this.setChildContentHeight();
  }

  onToggle() {
    this.setState(
      prevState => ({
        isOpen: !prevState.isOpen,
      }),
      () => {
        this.props.onToggle && this.props.onToggle(this.state.isOpen);
      }
    );
  }

  setChildContentRef = node => {
    this.childContent = node;
  };

  render() {
    const {
      children,
      buttonContent,
      className,
      id,
      buttonClassName,
      buttonContentClassName,
      extraAction,
      paddingSize,
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

    const paddingClass = classNames(paddingSizeToClassNameMap[paddingSize]);

    const buttonClasses = classNames('euiAccordion__button', buttonClassName);

    const buttonContentClasses = classNames(
      'euiAccordion__buttonContent',
      buttonContentClassName
    );

    const icon = (
      <EuiIcon type={this.state.isOpen ? 'arrowDown' : 'arrowRight'} size="m" />
    );

    let optionalAction = null;

    if (extraAction) {
      optionalAction = <EuiFlexItem grow={false}>{extraAction}</EuiFlexItem>;
    }

    return (
      <div className={classes} {...rest}>
        <EuiFlexGroup gutterSize="none" alignItems="center">
          <EuiFlexItem>
            <button
              aria-controls={id}
              aria-expanded={!!this.state.isOpen}
              onClick={this.onToggle}
              className={buttonClasses}
              type="button">
              <EuiFlexGroup
                gutterSize="s"
                alignItems="center"
                responsive={false}>
                <EuiFlexItem grow={false} className="euiAccordion__iconWrapper">
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
          ref={node => {
            this.childWrapper = node;
          }}
          id={id}>
          <EuiMutationObserver
            observerOptions={{ childList: true, subtree: true }}
            onMutation={this.setChildContentHeight}>
            {mutationRef => (
              <div
                ref={ref => {
                  this.setChildContentRef(ref);
                  mutationRef(ref);
                }}>
                <div className={paddingClass}>{children}</div>
              </div>
            )}
          </EuiMutationObserver>
        </div>
      </div>
    );
  }
}

EuiAccordion.propTypes = {
  /**
   * The content of the exposed accordion.
   */
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  /**
   * Class that will apply to the entire accordion.
   */
  className: PropTypes.string,
  /**
   * Class that will apply to the trigger for the accordion.
   */
  buttonContentClassName: PropTypes.string,
  /**
   * The content of the clickable trigger
   */
  buttonContent: PropTypes.node,
  /**
   * Will appear right aligned against the button. Useful for separate actions like deletions.
   */
  extraAction: PropTypes.node,
  /**
   * The accordion will start in the open state.
   */
  initialIsOpen: PropTypes.bool,
  /**
   * The padding around the exposed accordion content.
   */
  paddingSize: PropTypes.oneOf(PADDING_SIZES),
  /**
   * Optional callback method called on open and close with a single `isOpen` parameter
   */
  onToggle: PropTypes.func,
};

EuiAccordion.defaultProps = {
  initialIsOpen: false,
  paddingSize: 'none',
};
