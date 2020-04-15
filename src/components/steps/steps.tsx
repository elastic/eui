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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import { StandaloneEuiStepProps, EuiStep } from './step';

export type EuiContainedStepProps = Omit<StandaloneEuiStepProps, 'step'>;

export interface EuiStepsProps {
  /**
   * An array of `EuiStep` objects excluding the `step` prop
   */
  steps: EuiContainedStepProps[];
  /**
   * The number the steps should begin from
   */
  firstStepNumber?: number;
  /**
   * The HTML tag used for the title
   */
  headingElement?: string;
}

function renderSteps(
  steps: EuiContainedStepProps[],
  firstStepNumber: number,
  headingElement: string
) {
  return steps.map((step, index) => {
    const { className, children, title, status, ...rest } = step;

    return (
      <EuiStep
        className={className}
        key={index}
        headingElement={headingElement}
        step={firstStepNumber + index}
        title={title}
        status={status}
        {...rest}>
        {children}
      </EuiStep>
    );
  });
}

export const EuiSteps: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepsProps
> = ({
  className,
  firstStepNumber = 1,
  headingElement = 'p',
  steps,
  ...rest
}) => {
  const classes = classNames('euiSteps', className);

  return (
    <div className={classes} {...rest}>
      {renderSteps(steps, firstStepNumber, headingElement)}
    </div>
  );
};
