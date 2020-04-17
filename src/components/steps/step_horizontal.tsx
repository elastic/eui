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

import React, {
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
} from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import { EuiI18n } from '../i18n';
import { EuiScreenReaderOnly, EuiKeyboardAccessible } from '../accessibility';

import { EuiStepStatus, EuiStepNumber } from './step_number';

export interface EuiStepHorizontalProps {
  /**
   * Is the current step
   */
  isSelected?: boolean;
  /**
   * Is a previous step that has been completed
   */
  isComplete?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
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

export const EuiStepHorizontal: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepHorizontalProps
> = ({
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
  const classes = classNames('euiStepHorizontal', className, {
    'euiStepHorizontal-isSelected': isSelected,
    'euiStepHorizontal-isComplete': isComplete,
    'euiStepHorizontal-isIncomplete': !isSelected && !isComplete,
    'euiStepHorizontal-isDisabled': disabled,
  });

  if (disabled) {
    status = 'disabled';
  } else if (isComplete) {
    status = 'complete';
  } else if (isSelected) {
    status = status;
  } else if (!status) {
    status = 'incomplete';
  }

  const onStepClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return;
    onClick(event);
  };

  return (
    <EuiI18n
      token="euiStepHorizontal.buttonTitle"
      default={({
        step,
        title,
        disabled,
        isComplete,
      }: Pick<
        EuiStepHorizontalProps,
        'step' | 'title' | 'disabled' | 'isComplete'
      >) => {
        let titleAppendix = '';
        if (disabled) {
          titleAppendix = ' is disabled';
        } else if (isComplete) {
          titleAppendix = ' is complete';
        }

        return `Step ${step}: ${title}${titleAppendix}`;
      }}
      values={{ step, title, disabled, isComplete }}>
      {(buttonTitle: string) => (
        <EuiKeyboardAccessible>
          <div
            role="tab"
            aria-selected={!!isSelected}
            aria-disabled={!!disabled}
            className={classes}
            onClick={onStepClick}
            tabIndex={disabled ? -1 : 0}
            title={buttonTitle}
            {...rest}>
            <EuiScreenReaderOnly>
              <div>
                <EuiI18n token="euiStepHorizontal.step" default="Step" />
              </div>
            </EuiScreenReaderOnly>

            <EuiStepNumber
              className="euiStepHorizontal__number"
              status={status}
              number={step}
            />

            <div className="euiStepHorizontal__title">{title}</div>
          </div>
        </EuiKeyboardAccessible>
      )}
    </EuiI18n>
  );
};
