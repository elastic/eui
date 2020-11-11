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
import React, { FunctionComponent, OlHTMLAttributes } from 'react';
import { CommonProps } from '../common';
import { EuiStepHorizontal, EuiStepHorizontalProps } from './step_horizontal';

export interface EuiStepsHorizontalProps
  extends OlHTMLAttributes<HTMLOListElement>,
    CommonProps {
  /**
   * An array of `EuiStepHorizontal` objects excluding the `step` prop
   */
  steps: Array<Omit<EuiStepHorizontalProps, 'step'>>;
}

export const EuiStepsHorizontal: FunctionComponent<EuiStepsHorizontalProps> = ({
  className,
  steps,
  ...rest
}) => {
  const classes = classNames('euiStepsHorizontal', className);

  return (
    <ol className={classes} {...rest}>
      {steps.map((stepProps, index) => {
        const isCurrent = stepProps.isSelected
          ? { 'aria-current': 'step' as const }
          : {};

        return (
          <li key={index} className="euiStepHorizontal__item" {...isCurrent}>
            <EuiStepHorizontal step={index + 1} {...stepProps} />
          </li>
        );
      })}
    </ol>
  );
};
