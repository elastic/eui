/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, MouseEventHandler } from 'react';

import { EuiAccordionProps } from '../accordion';
import { EuiAccordionButton } from './accordion_button';
import { EuiAccordionArrow } from './accordion_arrow';

type _EuiAccordionTriggerProps = Pick<
  EuiAccordionProps,
  | 'arrowDisplay'
  | 'arrowProps'
  | 'buttonElement'
  | 'buttonClassName'
  | 'buttonProps'
  | 'buttonContent'
  | 'buttonContentClassName'
  | 'extraAction'
  | 'isDisabled'
> & {
  isOpen: boolean;
  ariaControlsId: string;
  buttonId: string;
  onToggle: MouseEventHandler;
};

export const EuiAccordionTrigger: FunctionComponent<
  _EuiAccordionTriggerProps
> = ({
  arrowDisplay: _arrowDisplay,
  arrowProps,
  buttonElement = 'button',
  buttonProps,
  buttonClassName,
  buttonContent,
  buttonContentClassName,
  buttonId,
  ariaControlsId,
  isDisabled,
  isOpen,
  onToggle,
  extraAction,
}) => {
  // Force visibility of arrow button icon if button element is not interactive
  const buttonIsInteractive = buttonElement === 'button';
  const arrowDisplay =
    _arrowDisplay === 'none' && !buttonIsInteractive ? 'left' : _arrowDisplay;

  const arrow = (
    <EuiAccordionArrow
      arrowDisplay={arrowDisplay}
      arrowProps={arrowProps}
      isOpen={isOpen}
      onClick={onToggle}
      isDisabled={isDisabled}
      aria-controls={ariaControlsId}
      aria-expanded={isOpen}
      aria-labelledby={buttonId}
      aria-hidden={buttonIsInteractive ? 'true' : 'false'}
      tabIndex={buttonIsInteractive ? -1 : 0}
    />
  );

  const button = (
    <EuiAccordionButton
      buttonElement={buttonElement}
      buttonProps={buttonProps}
      buttonClassName={buttonClassName}
      buttonContentClassName={buttonContentClassName}
      arrowDisplay={arrowDisplay}
      isDisabled={isDisabled}
      id={buttonId}
      aria-controls={ariaControlsId}
      aria-expanded={buttonIsInteractive ? isOpen : undefined} // `aria-expanded` is only a valid attribute on interactive controls - axe-core throws a violation otherwise
      onClick={isDisabled ? undefined : onToggle}
    >
      {buttonContent}
    </EuiAccordionButton>
  );

  const optionalAction = extraAction && (
    <div
      className="euiAccordion__optionalAction"
      css={{ flexShrink: 0, label: 'euiAccordion' }}
    >
      {extraAction}
    </div>
  );

  return (
    <div
      className="euiAccordion__triggerWrapper"
      css={{ display: 'flex', alignItems: 'center' }}
    >
      {arrowDisplay === 'left' && arrow}
      {button}
      {optionalAction}
      {arrowDisplay === 'right' && arrow}
    </div>
  );
};
