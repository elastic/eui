/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEvent as ReactMouseEvent,
  MouseEventHandler,
} from 'react';
import { CommonProps } from '../common';
import { EuiStepNumber, EuiStepStatus } from './step_number';
import {
  useI18nCompleteStep,
  useI18nCurrentStep,
  useI18nDisabledStep,
  useI18nIncompleteStep,
  useI18nStep,
  useI18nWarningStep,
} from './step_strings';

export interface EuiStepHorizontalProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    CommonProps {
  /**
   * **DEPRECATED: Use `status = 'current'` instead**
   * Adds to the line before the indicator for showing current progress
   */
  isSelected?: boolean;
  /**
   * **DEPRECATED: Use `status = 'complete'` instead**
   * Adds to the line after the indicator for showing current progress
   */
  isComplete?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  /**
   * Makes the whole step button disabled.
   */
  disabled?: boolean;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title?: string;
  /**
   * Visual representation of the step number indicator.
   * May replace the number provided in props.step with alternate styling.
   * The `isSelected`, `isComplete`, and `disabled` props will override these.
   */
  status?: EuiStepStatus;
}

export const EuiStepHorizontal: FunctionComponent<EuiStepHorizontalProps> = ({
  className,
  step = 1,
  title,
  isSelected,
  isComplete,
  onClick,
  disabled,
  status = 'incomplete',
  ...rest
}) => {
  const buttonTitle = useI18nStep({ number: step, title });
  const completeTitle = useI18nCompleteStep({ number: step, title });
  const disabledTitle = useI18nDisabledStep({ number: step, title });
  const incompleteTitle = useI18nIncompleteStep({ number: step, title });
  const warningTitle = useI18nWarningStep({ number: step, title });
  const currentTitle = useI18nCurrentStep({ number: step, title });

  if (disabled) status = 'disabled';
  else if (isComplete) status = 'complete';
  else if (isSelected) status = 'current';

  const classes = classNames('euiStepHorizontal', className, {
    'euiStepHorizontal-isSelected': status === 'current',
    'euiStepHorizontal-isComplete': status === 'complete',
    'euiStepHorizontal-isIncomplete': status === 'incomplete',
    'euiStepHorizontal-isDisabled': status === 'disabled',
  });

  let stepTitle = buttonTitle;
  if (status === 'disabled') stepTitle = disabledTitle;
  if (status === 'complete') stepTitle = completeTitle;
  if (status === 'incomplete') stepTitle = incompleteTitle;
  if (status === 'warning') stepTitle = warningTitle;
  if (status === 'current') stepTitle = currentTitle;

  const onStepClick = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!disabled) onClick(event);
  };

  return (
    <button
      className={classes}
      title={stepTitle}
      onClick={onStepClick}
      disabled={disabled}
      {...rest}>
      <EuiStepNumber
        className="euiStepHorizontal__number"
        status={status}
        number={step}
      />

      <span className="euiStepHorizontal__title">{title}</span>
    </button>
  );
};
