/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { tabbable, FocusableElement } from 'tabbable';

import { CommonProps } from '../common';

import { EuiLoadingSpinner } from '../loading';
import { EuiResizeObserver } from '../observer/resize_observer';
import { EuiText } from '../text';
import { EuiI18n } from '../i18n';
import {
  htmlIdGenerator,
  withEuiTheme,
  WithEuiThemeProps,
} from '../../services';
import { EuiButtonIcon, EuiButtonIconProps } from '../button';
import {
  euiAccordionButtonStyles,
  euiAccordionChildrenStyles,
  euiAccordionChildWrapperStyles,
  euiAccordionIconButtonStyles,
  euiAccordionOptionalActionStyles,
  euiAccordionSpinnerStyles,
  euiAccordionTriggerWrapperStyles,
} from './accordion.styles';
import { logicalCSS } from '../../global_styling';

export const PADDING_SIZES = ['none', 'xs', 's', 'm', 'l', 'xl'] as const;
export type EuiAccordionPaddingSize = (typeof PADDING_SIZES)[number];

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
    initialIsOpen?: boolean;
    /**
     * Optional callback method called on open and close with a single `isOpen` parameter
     */
    onToggle?: (isOpen: boolean) => void;
    /**
     * The padding around the exposed accordion content.
     */
    paddingSize?: EuiAccordionPaddingSize;
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
    /**
     * Disable the open/close interaction and visually subdues the trigger
     */
    isDisabled?: boolean;
  };

type EuiAccordionState = {
  isOpen: boolean;
};

export class EuiAccordionClass extends Component<
  WithEuiThemeProps & EuiAccordionProps,
  EuiAccordionState
> {
  static defaultProps = {
    initialIsOpen: false,
    paddingSize: 'none' as const,
    arrowDisplay: 'left' as const,
    isLoading: false,
    isDisabled: false,
    isLoadingMessage: false,
    element: 'div' as const,
    buttonElement: 'button' as const,
  };

  childContent: HTMLDivElement | null = null;
  childWrapper: HTMLDivElement | null = null;
  tabbableChildren: FocusableElement[] | null = null;

  state = {
    isOpen: this.props.forceState
      ? this.props.forceState === 'open'
      : this.props.initialIsOpen!,
  };

  get isOpen() {
    return this.props.forceState
      ? this.props.forceState === 'open'
      : this.state.isOpen;
  }

  setChildContentHeight = () => {
    requestAnimationFrame(() => {
      const height =
        this.childContent && this.isOpen ? this.childContent.clientHeight : 0;
      this.childWrapper &&
        this.childWrapper.setAttribute(
          'style',
          logicalCSS('height', `${height}px`)
        );
    });
  };

  componentDidMount() {
    this.setChildContentHeight();
    if (!this.isOpen) this.preventTabbing();
  }

  componentDidUpdate(
    prevProps: EuiAccordionProps,
    prevState: EuiAccordionState
  ) {
    this.setChildContentHeight();

    if (
      (prevProps.forceState === 'open' && this.props.forceState === 'closed') ||
      (prevState.isOpen === true && this.state.isOpen === false)
    ) {
      this.preventTabbing();
    }
    if (
      (prevProps.forceState === 'closed' && this.props.forceState === 'open') ||
      (prevState.isOpen === false && this.state.isOpen === true)
    ) {
      this.enableTabbing();
    }
  }

  onToggle = () => {
    const { forceState } = this.props;
    if (forceState) {
      this.props.onToggle?.(forceState === 'open' ? false : true);
    } else {
      this.setState(
        (prevState) => ({
          isOpen: !prevState.isOpen,
        }),
        () => {
          if (this.state.isOpen && this.childWrapper) {
            this.childWrapper.focus();
          }
          this.props.onToggle?.(this.state.isOpen);
        }
      );
    }
  };

  // When accordions are closed, tabbable children should not be present in the tab order
  preventTabbing = () => {
    if (this.childContent) {
      // Re-check for children on every close - content can change dynamically
      this.tabbableChildren = tabbable(this.childContent);

      this.tabbableChildren.forEach((element) => {
        // If the element has an existing `tabIndex` set, make sure we can restore it
        const originalTabIndex = element.getAttribute('tabIndex');
        if (originalTabIndex) {
          element.setAttribute('data-original-tabindex', originalTabIndex);
        }

        element.setAttribute('tabIndex', '-1');
      });
    }
  };

  enableTabbing = () => {
    // If no tabbable children were set, we don't need to re-enable anything
    if (this.tabbableChildren) {
      this.tabbableChildren.forEach((element) => {
        const originalTabIndex = element.getAttribute('data-original-tabindex');
        if (originalTabIndex) {
          // If the element originally had an existing `tabIndex` set, restore it
          element.setAttribute('tabIndex', originalTabIndex);
          element.removeAttribute('data-original-tabindex');
        } else {
          // If not, remove the tabIndex property
          element.removeAttribute('tabIndex');
        }
      });
      // Cleanup - unset the list of children
      this.tabbableChildren = null;
    }
  };

  setChildContentRef = (node: HTMLDivElement | null) => {
    this.childContent = node;
  };

  generatedId = htmlIdGenerator()();

  // Storing resize/observer refs as an instance variable is a performance optimization
  // and also resolves https://github.com/elastic/eui/issues/5903
  resizeRef: (e: HTMLElement | null) => void = () => {};
  observerRef = (ref: HTMLDivElement) => {
    this.setChildContentRef(ref);
    this.resizeRef(ref);
  };

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
      isDisabled,
      buttonProps,
      buttonElement: _ButtonElement = 'button',
      arrowProps,
      theme,
      ...rest
    } = this.props;

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
        'euiAccordion-isOpen': this.isOpen,
      },
      className
    );

    const childrenClasses = classNames('euiAccordion__children', {
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
        'euiAccordion__iconButton-isOpen': this.isOpen,
        'euiAccordion__iconButton--right': _arrowDisplay === 'right',
      },
      arrowProps?.className
    );

    // Emotion styles
    const buttonStyles = euiAccordionButtonStyles(theme);
    const cssButtonStyles = [
      buttonStyles.euiAccordion__button,
      isDisabled && buttonStyles.disabled,
      buttonProps?.css,
    ];

    const childrenStyles = euiAccordionChildrenStyles(theme);
    const cssChildrenStyles = [
      childrenStyles.euiAccordion__children,
      isLoading && childrenStyles.isLoading,
      paddingSize && paddingSize !== 'none' && childrenStyles[paddingSize],
    ];

    const childWrapperStyles = euiAccordionChildWrapperStyles(theme);
    const cssChildWrapperStyles = [
      childWrapperStyles.euiAccordion__childWrapper,
      this.isOpen && childWrapperStyles.isOpen,
    ];

    const iconButtonStyles = euiAccordionIconButtonStyles(theme);
    const cssIconButtonStyles = [
      iconButtonStyles.euiAccordion__iconButton,
      this.isOpen && iconButtonStyles.isOpen,
      _arrowDisplay === 'right' && iconButtonStyles.arrowRight,
      arrowProps?.css,
    ];

    const optionalActionStyles = euiAccordionOptionalActionStyles();
    const cssOptionalActionStyles = [
      optionalActionStyles.euiAccordion__optionalAction,
    ];

    const spinnerStyles = euiAccordionSpinnerStyles(theme);
    const cssSpinnerStyles = [spinnerStyles.euiAccordion__spinner];

    const triggerWrapperStyles = euiAccordionTriggerWrapperStyles();
    const cssTriggerWrapperStyles = [
      triggerWrapperStyles.euiAccordion__triggerWrapper,
    ];

    let iconButton;
    const buttonId = buttonProps?.id ?? this.generatedId;
    if (_arrowDisplay !== 'none') {
      iconButton = (
        <EuiButtonIcon
          color="text"
          {...arrowProps}
          className={iconButtonClasses}
          css={cssIconButtonStyles}
          iconType="arrowRight"
          onClick={this.onToggle}
          aria-controls={id}
          aria-expanded={this.isOpen}
          aria-labelledby={buttonId}
          tabIndex={buttonElementIsFocusable ? -1 : 0}
          isDisabled={isDisabled}
        />
      );
    }

    let optionalAction = null;

    if (isLoading || extraAction) {
      optionalAction = (
        <div
          className="euiAccordion__optionalAction"
          css={cssOptionalActionStyles}
        >
          {isLoading ? <EuiLoadingSpinner /> : extraAction}
        </div>
      );
    }

    let childrenContent: any;
    if (isLoading && isLoadingMessage) {
      childrenContent = (
        <>
          <EuiLoadingSpinner
            className="euiAccordion__spinner"
            css={cssSpinnerStyles}
          />
          <EuiText size="s">
            <p>
              {isLoadingMessage !== true ? (
                isLoadingMessage
              ) : (
                <EuiI18n token="euiAccordion.isLoading" default="Loading" />
              )}
            </p>
          </EuiText>
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
        css={cssButtonStyles}
        aria-controls={id}
        // `aria-expanded` is only a valid attribute on interactive controls - axe-core throws a violation otherwise
        aria-expanded={ButtonElement === 'button' ? this.isOpen : undefined}
        onClick={isDisabled ? undefined : this.onToggle}
        type={ButtonElement === 'button' ? 'button' : undefined}
        disabled={ButtonElement === 'button' ? isDisabled : undefined}
      >
        <span className={buttonContentClasses}>{buttonContent}</span>
      </ButtonElement>
    );

    return (
      <Element className={classes} {...rest}>
        <div
          className="euiAccordion__triggerWrapper"
          css={cssTriggerWrapperStyles}
        >
          {_arrowDisplay === 'left' && iconButton}
          {button}
          {optionalAction}
          {_arrowDisplay === 'right' && iconButton}
        </div>

        <div
          className="euiAccordion__childWrapper"
          css={cssChildWrapperStyles}
          ref={(node) => {
            this.childWrapper = node;
          }}
          tabIndex={-1}
          role="region"
          aria-labelledby={buttonId}
          id={id}
        >
          <EuiResizeObserver onResize={this.setChildContentHeight}>
            {(resizeRef) => {
              this.resizeRef = resizeRef;
              return (
                <div ref={this.observerRef}>
                  <div className={childrenClasses} css={cssChildrenStyles}>
                    {childrenContent}
                  </div>
                </div>
              );
            }}
          </EuiResizeObserver>
        </div>
      </Element>
    );
  }
}

export const EuiAccordion = withEuiTheme<EuiAccordionProps>(EuiAccordionClass);
