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

import classNames from 'classnames';
import React, {
  createRef,
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
} from 'react';
import { CommonProps } from '../common';
import { EuiStepNumber, EuiStepStatus } from './step_number';
import {
  useI18nCompleteStep,
  useI18nDisabledStep,
  useI18nStep,
  useI18nWarningStep,
} from './step_strings';

export interface EuiStepHorizontalProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {
  /**
   * Is the current step
   */
  isSelected?: boolean;
  /**
   * Is a previous step that has been completed
   */
  isComplete?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title?: string;
  /**
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
  status,
  ...rest
}) => {
  const buttonRef = createRef<HTMLButtonElement>();
  const defaultButton = useI18nStep(step);
  const completeButton = useI18nCompleteStep(step);
  const disabledButton = useI18nDisabledStep(step);
  const incompleteButton = useI18nCompleteStep(step);
  const warningButton = useI18nWarningStep(step);

  const classes = classNames('euiStepHorizontal', className, {
    'euiStepHorizontal-isSelected': isSelected,
    'euiStepHorizontal-isComplete': isComplete,
    'euiStepHorizontal-isIncomplete': !isSelected && !isComplete,
    'euiStepHorizontal-isDisabled': disabled,
  });

  let stepTitle = defaultButton as string;

  if (disabled || status === 'disabled') {
    status = 'disabled';
    stepTitle = disabledButton;
  } else if (isComplete || status === 'complete') {
    status = 'complete';
    stepTitle = completeButton;
  } else if (isSelected) {
    if (status === 'warning') stepTitle = warningButton;
    status = status;
  } else if (!status || status === 'incomplete') {
    status = 'incomplete';
    stepTitle = incompleteButton;
  }

  const onStepClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (disabled) return;
    onClick(event);
  };

  const ariaProps = isSelected ? { 'aria-current': 'step' as const } : {};

  return (
    <li // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
      className={classes}
      title={stepTitle}
      onClick={() => buttonRef.current?.click()}
      {...ariaProps}
      {...rest}>
      <button ref={buttonRef} onClick={onStepClick} disabled={disabled}>
        <EuiStepNumber
          className="euiStepHorizontal__number"
          status={status}
          number={step}
        />
      </button>

      <p className="euiStepHorizontal__title">{title}</p>
    </li>
  );
};
