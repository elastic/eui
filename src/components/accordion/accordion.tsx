/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { EuiLoadingSpinner } from '../loading';
import { EuiResizeObserver } from '../observer/resize_observer';
import { EuiI18n } from '../i18n';
import { htmlIdGenerator } from '../../services';
import { EuiButtonIcon, EuiButtonIconProps } from '../button';

const paddingSizeToClassNameMap = {
  none: '',
  xs: 'euiAccordion__padding--xs',
  s: 'euiAccordion__padding--s',
  m: 'euiAccordion__padding--m',
  l: 'euiAccordion__padding--l',
  xl: 'euiAccordion__padding--xl',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);
export type EuiAccordionSize = keyof typeof paddingSizeToClassNameMap;

export type EuiAccordionProps = CommonProps &
  Omit<HTMLAttributes<HTMLElement>, 'id'> & {
    id: string;
    /**
     * Applied to the entire .euiAccordion wrapper.
     * When using `fieldset`, it will enforce `buttonElement = legend` as well.
     */
    element?: 'div' | 'fieldset';
    /**
     * Class that will apply to the trigger for the accordion.
     */
    buttonClassName?: string;
    /**
     * Apply more props to the triggering button
     */
    buttonProps?: CommonProps & HTMLAttributes<HTMLElement>;
    /**
     * Class that will apply to the trigger content for the accordion.
     */
    buttonContentClassName?: string;
    /**
     * The content of the clickable trigger
     */
    buttonContent?: ReactNode;
    /**
     * Applied to the main button receiving the `onToggle` event.
     * Anything other than the default `button` does not support removing the arrow display (for accessibility of focus).
     */
    buttonElement?: 'div' | 'legend' | 'button';
    /**
     * Extra props to pass to the EuiButtonIcon containing the arrow.
     */
    arrowProps?: Partial<
      Omit<EuiButtonIconProps, 'iconType' | 'onClick' | 'aria-labelledby'>
    >;
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
    paddingSize?: EuiAccordionSize;
    /**
     * Placement of the arrow indicator, or 'none' to hide it.
     */
    arrowDisplay?: 'left' | 'right' | 'none';
    /**
     * Control the opening of accordion via prop
     */
    forceState?: 'closed' | 'open';
    /**
     * Change `extraAction` and children into a loading spinner
     */
    isLoading?: boolean;
    /**
     * Choose whether the loading message replaces the content. Customize the message by passing a node
     */
    isLoadingMessage?: boolean | ReactNode;
  };

export class EuiAccordion extends Component<
  EuiAccordionProps,
  { isOpen: boolean }
> {
  static defaultProps = {
    initialIsOpen: false,
    paddingSize: 'none',
    arrowDisplay: 'left',
    isLoading: false,
    isLoadingMessage: false,
    element: 'div',
    buttonElement: 'button',
  };

  childContent: HTMLDivElement | null = null;
  childWrapper: HTMLDivElement | null = null;

  state = {
    isOpen: this.props.forceState
      ? this.props.forceState === 'open'
      : this.props.initialIsOpen,
  };

  setChildContentHeight = () => {
    const { forceState } = this.props;
    requestAnimationFrame(() => {
      const height =
        this.childContent &&
        (forceState ? forceState === 'open' : this.state.isOpen)
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
    const { forceState } = this.props;
    if (forceState) {
      this.props.onToggle &&
        this.props.onToggle(forceState === 'open' ? false : true);
    } else {
      this.setState(
        (prevState) => ({
          isOpen: !prevState.isOpen,
        }),
        () => {
          if (this.state.isOpen && this.childWrapper) {
            this.childWrapper.focus();
          }
          this.props.onToggle && this.props.onToggle(this.state.isOpen);
        }
      );
    }
  };

  setChildContentRef = (node: HTMLDivElement | null) => {
    this.childContent = node;
  };

  generatedId = htmlIdGenerator()();

  render() {
    const {
      children,
      buttonContent,
      className,
      id,
      element: Element = 'div',
      buttonClassName,
      buttonContentClassName,
      extraAction,
      paddingSize,
      initialIsOpen,
      arrowDisplay,
      forceState,
      isLoading,
      isLoadingMessage,
      buttonProps,
      buttonElement: _ButtonElement = 'button',
      arrowProps,
      ...rest
    } = this.props;

    const isOpen = forceState ? forceState === 'open' : this.state.isOpen;

    // Force button element to be a legend if the element is a fieldset
    const ButtonElement = Element === 'fieldset' ? 'legend' : _ButtonElement;
    const buttonElementIsFocusable = ButtonElement === 'button';

    // Force visibility of arrow button if button element is not focusable
    const _arrowDisplay =
      arrowDisplay === 'none' && !buttonElementIsFocusable
        ? 'left'
        : arrowDisplay;

    const classes = classNames(
      'euiAccordion',
      {
        'euiAccordion-isOpen': isOpen,
      },
      className
    );

    const paddingClass = paddingSize
      ? classNames(paddingSizeToClassNameMap[paddingSize])
      : undefined;

    const childrenClasses = classNames(paddingClass, {
      'euiAccordion__children-isLoading': isLoading,
    });

    const buttonClasses = classNames(
      'euiAccordion__button',
      buttonClassName,
      buttonProps?.className
    );

    const buttonContentClasses = classNames(
      'euiAccordion__buttonContent',
      buttonContentClassName
    );

    const iconButtonClasses = classNames(
      'euiAccordion__iconButton',
      {
        'euiAccordion__iconButton-isOpen': isOpen,
        'euiAccordion__iconButton--right': _arrowDisplay === 'right',
      },
      arrowProps?.className
    );

    let iconButton;
    const buttonId = buttonProps?.id ?? this.generatedId;
    if (_arrowDisplay !== 'none') {
      iconButton = (
        <EuiButtonIcon
          color="text"
          {...arrowProps}
          className={iconButtonClasses}
          iconType="arrowRight"
          onClick={this.onToggle}
          aria-controls={id}
          aria-expanded={isOpen}
          aria-labelledby={buttonId}
          tabIndex={buttonElementIsFocusable ? -1 : 0}
        />
      );
    }

    let optionalAction = null;

    if (extraAction) {
      optionalAction = (
        <div className="euiAccordion__optionalAction">
          {isLoading ? <EuiLoadingSpinner /> : extraAction}
        </div>
      );
    }

    let childrenContent: any;
    if (isLoading && isLoadingMessage) {
      childrenContent = (
        <>
          <EuiLoadingSpinner className="euiAccordion__spinner" />
          <span>
            {isLoadingMessage && isLoadingMessage !== true ? (
              isLoadingMessage
            ) : (
              <EuiI18n token="euiAccordion.isLoading" default="Loading" />
            )}
          </span>
        </>
      );
    } else {
      childrenContent = children;
    }

    const button = (
      <ButtonElement
        {...buttonProps}
        id={buttonId}
        className={buttonClasses}
        aria-controls={id}
        aria-expanded={isOpen}
        onClick={this.onToggle}
        type={ButtonElement === 'button' ? 'button' : undefined}
      >
        <span className={buttonContentClasses}>{buttonContent}</span>
      </ButtonElement>
    );

    return (
      <Element className={classes} {...rest}>
        <div className="euiAccordion__triggerWrapper">
          {_arrowDisplay === 'left' && iconButton}
          {button}
          {optionalAction}
          {_arrowDisplay === 'right' && iconButton}
        </div>

        <div
          className="euiAccordion__childWrapper"
          ref={(node) => {
            this.childWrapper = node;
          }}
          tabIndex={-1}
          role="region"
          aria-labelledby={buttonId}
          id={id}
        >
          <EuiResizeObserver onResize={this.setChildContentHeight}>
            {(resizeRef) => (
              <div
                ref={(ref) => {
                  this.setChildContentRef(ref);
                  resizeRef(ref);
                }}
              >
                <div className={childrenClasses}>{childrenContent}</div>
              </div>
            )}
          </EuiResizeObserver>
        </div>
      </Element>
    );
  }
}
