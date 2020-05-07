/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { EuiIcon } from '../icon';
import { EuiResizeObserver } from '../observer/resize_observer';

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
    paddingSize?: EuiAccordionSize;
    /**
     * Placement of the arrow indicator, or 'none' to hide it.
     * Placing on the `right` doesn't work with `extraAction` and so it will be ignored
     */
    arrowDisplay?: 'left' | 'right' | 'none';
    /**
     * Control the opening of accordin via prop
     */
    forceState?: 'closed' | 'open';
  };

export class EuiAccordion extends Component<
  EuiAccordionProps,
  { isOpen: boolean }
> {
  static defaultProps = {
    initialIsOpen: false,
    paddingSize: 'none',
    arrowDisplay: 'left',
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
    if (forceState) return this.setState({ isOpen: forceState === 'open' });
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
      arrowDisplay,
      forceState,
      ...rest
    } = this.props;

    const isOpen = forceState ? forceState === 'open' : this.state.isOpen;

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

    const buttonClasses = classNames(
      'euiAccordion__button',
      {
        euiAccordion__buttonReverse: !extraAction && arrowDisplay === 'right',
      },
      buttonClassName
    );

    const iconClasses = classNames('euiAccordion__icon', {
      'euiAccordion__icon-isOpen': isOpen,
    });

    let icon;
    if (arrowDisplay !== 'none') {
      icon = (
        <span className="euiAccordion__iconWrapper">
          <EuiIcon className={iconClasses} type="arrowRight" size="m" />
        </span>
      );
    }

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
            aria-expanded={isOpen}
            onClick={this.onToggle}
            className={buttonClasses}
            type="button">
            {icon}
            <span
              className={classNames(
                'euiIEFlexWrapFix',
                buttonContentClassName
              )}>
              {buttonContent}
            </span>
          </button>

          {optionalAction}
        </div>

        <div
          className="euiAccordion__childWrapper"
          ref={node => {
            this.childWrapper = node;
          }}
          id={id}>
          <EuiResizeObserver onResize={this.setChildContentHeight}>
            {resizeRef => (
              <div
                ref={ref => {
                  this.setChildContentRef(ref);
                  resizeRef(ref);
                }}>
                <div className={paddingClass}>{children}</div>
              </div>
            )}
          </EuiResizeObserver>
        </div>
      </div>
    );
  }
}
