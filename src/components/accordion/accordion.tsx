import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { EuiIcon } from '../icon';
import { EuiMutationObserver } from '../observer/mutation_observer';
import { getDurationAndPerformOnFrame } from '../../services';

const MUTATION_ATTRIBUTE_FILTER = ['style'];

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

  onMutation = (records: MutationRecord[]) => {
    const isChildStyleMutation = records.find((record: MutationRecord) => {
      return record.attributeName
        ? MUTATION_ATTRIBUTE_FILTER.indexOf(record.attributeName) > -1
        : false;
    });
    if (isChildStyleMutation) {
      getDurationAndPerformOnFrame(records, this.setChildContentHeight);
    } else {
      this.setChildContentHeight();
    }
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

    const icon = (
      <EuiIcon
        className="euiAccordion__icon"
        type={this.state.isOpen ? 'arrowDown' : 'arrowRight'}
        size="m"
      />
    );

    let optionalAction = null;

    if (extraAction) {
      optionalAction = (
        <div className="euiAccordion__optionalAction">{extraAction}</div>
      );
    }

    return (
      <div className={classes} {...rest}>
        <div className="euiAccordion__triggerWrapper">
          <button
            aria-controls={id}
            aria-expanded={!!this.state.isOpen}
            onClick={this.onToggle}
            className={buttonClasses}
            type="button">
            <span className="euiAccordion__iconWrapper">{icon}</span>
            <span className={buttonContentClassName}>{buttonContent}</span>
          </button>

          {optionalAction}
        </div>

        <div
          className="euiAccordion__childWrapper"
          ref={node => {
            this.childWrapper = node;
          }}
          id={id}>
          <EuiMutationObserver
            observerOptions={{
              childList: true,
              subtree: true,
              attributeFilter: MUTATION_ATTRIBUTE_FILTER,
            }}
            onMutation={this.onMutation}>
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
