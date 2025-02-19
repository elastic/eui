/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import {
  htmlIdGenerator,
  withEuiTheme,
  WithEuiThemeProps,
} from '../../services';
import { CommonProps } from '../common';
import { EuiLoadingSpinner } from '../loading';
import type { EuiButtonIconProps } from '../button';

import { EuiAccordionTrigger } from './accordion_trigger';
import { EuiAccordionChildren } from './accordion_children';
import { euiAccordionStyles } from './accordion.styles';

export const PADDING_SIZES = ['none', 'xs', 's', 'm', 'l', 'xl'] as const;
export type EuiAccordionPaddingSize = (typeof PADDING_SIZES)[number];

export type EuiAccordionProps = CommonProps &
  Omit<HTMLAttributes<HTMLElement>, 'id' | 'role'> & {
    id: string;
    /**
     * Applied to the entire .euiAccordion wrapper.
     * When using `fieldset`, it will enforce `buttonElement = legend` as well.
     */
    element?: 'div' | 'fieldset';
    /**
     * Defaults to the [group role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role).
     *
     * If your accordion contains significant enough content to be a document
     * [landmark role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role#accessibility_concerns), consider using the `region` role instead.
     * @default group
     */
    role?: HTMLAttributes<HTMLElement>['role'];
    /**
     * Class that will apply to the trigger for the accordion.
     */
    buttonClassName?: string;
    /**
     * Apply more props to the triggering button.
     *
     * Includes optional `paddingSize` prop which allows sizes of `s`, `m`, or `l`.
     * Note: Padding will not be present on the side closest to the accordion arrow.
     */
    buttonProps?: CommonProps &
      HTMLAttributes<HTMLElement> & { paddingSize?: 's' | 'm' | 'l' };
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
     * Optional border styling. Defaults to 'none'.
     */
    borders?: 'horizontal' | 'all' | 'none';
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
    borders: 'none' as const,
    paddingSize: 'none' as const,
    arrowDisplay: 'left' as const,
    isLoading: false,
    isDisabled: false,
    isLoadingMessage: false,
    element: 'div' as const,
    buttonElement: 'button' as const,
    role: 'group' as const,
  };

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

  onToggle = () => {
    const { forceState } = this.props;
    if (forceState) {
      const nextState = !this.isOpen;
      this.props.onToggle?.(nextState);
    } else {
      this.setState(
        (prevState) => ({
          isOpen: !prevState.isOpen,
        }),
        () => {
          this.props.onToggle?.(this.state.isOpen);
        }
      );
    }
  };

  generatedId = htmlIdGenerator()();

  render() {
    const {
      children,
      className,
      id,
      role,
      element: Element = 'div',
      buttonElement,
      buttonProps,
      buttonClassName,
      buttonContentClassName,
      buttonContent,
      arrowDisplay,
      arrowProps,
      extraAction,
      paddingSize,
      borders,
      initialIsOpen,
      forceState,
      isLoading,
      isLoadingMessage,
      isDisabled,
      theme,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiAccordion',
      { 'euiAccordion-isOpen': this.isOpen },
      className
    );

    const styles = euiAccordionStyles(theme);
    const cssStyles = [
      styles.euiAccordion,
      borders !== 'none' && styles.borders.borders,
      borders !== 'none' && styles.borders[borders!],
    ];

    const buttonId = buttonProps?.id ?? this.generatedId;

    return (
      <Element className={classes} css={cssStyles} {...rest}>
        <EuiAccordionTrigger
          ariaControlsId={id}
          buttonId={buttonId}
          // Force button element to be a legend if the element is a fieldset
          buttonElement={Element === 'fieldset' ? 'legend' : buttonElement}
          buttonClassName={buttonClassName}
          buttonContent={buttonContent}
          buttonContentClassName={buttonContentClassName}
          buttonProps={buttonProps}
          arrowProps={arrowProps}
          arrowDisplay={arrowDisplay}
          isDisabled={isDisabled}
          isOpen={this.isOpen}
          onToggle={this.onToggle}
          extraAction={isLoading ? <EuiLoadingSpinner /> : extraAction}
        />

        <EuiAccordionChildren
          role={role}
          id={id}
          aria-labelledby={buttonId}
          paddingSize={paddingSize}
          isLoading={isLoading}
          isLoadingMessage={isLoadingMessage}
          isOpen={this.isOpen}
          initialIsOpen={initialIsOpen}
        >
          {children}
        </EuiAccordionChildren>
      </Element>
    );
  }
}

export const EuiAccordion = withEuiTheme<EuiAccordionProps>(EuiAccordionClass);
