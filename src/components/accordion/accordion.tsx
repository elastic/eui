import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

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

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);
export type EuiAccordionSize = keyof typeof paddingSizeToClassNameMap;

export type EuiAccordionProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    id: string;
    /**
     * Class that will apply to the trigger for the accordion.
     */
    buttonClassName?: string;
    /**
     * Class that will apply to the trigger content for the accordion.
     */
    buttonContentClassName?: string;
    /**
     * The content of the clickable trigger
     */
    buttonContent?: ReactNode;
    /**
     * Will appear right aligned against the button. Useful for separate actions like deletions.
     */
    extraAction?: ReactNode;
    /**
     * The accordion will start in the open state.
     */
    initialIsOpen: boolean;
    /**
     * Optional callback method called on open and close with a single `isOpen` parameter
     */
    onToggle?: (isOpen: boolean) => void;
    /**
     * The padding around the exposed accordion content.
     */
    paddingSize: EuiAccordionSize;
  };

export class EuiAccordion extends Component<
  EuiAccordionProps,
  { isOpen: boolean }
> {
  static defaultProps = {
    initialIsOpen: false,
    paddingSize: 'none',
  };

  childContent: HTMLDivElement | null = null;
  childWrapper: HTMLDivElement | null = null;

  state = {
    isOpen: this.props.initialIsOpen,
  };

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

  onToggle = () => {
    this.setState(
      prevState => ({
        isOpen: !prevState.isOpen,
      }),
      () => {
        this.props.onToggle && this.props.onToggle(this.state.isOpen);
      }
    );
  };

  setChildContentRef = (node: HTMLDivElement | null) => {
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
      initialIsOpen,
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
