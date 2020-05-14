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

import { EuiStepProps, EuiStep } from './step';

export type EuiContainedStepProps = Omit<EuiStepProps, 'step'>;

export interface EuiStepsProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
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
  /**
   * Title sizing equivalent to EuiTitle, but only `m`, `s` and `xs`. Defaults to `s`
   */
  titleSize?: EuiStepProps['titleSize'];
}

function renderSteps(
  steps: EuiContainedStepProps[],
  firstStepNumber: number,
  headingElement: string,
  titleSize?: EuiStepProps['titleSize']
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
        titleSize={titleSize}
        status={status}
        {...rest}>
        {children}
      </EuiStep>
    );
  });
}

export const EuiSteps: FunctionComponent<EuiStepsProps> = ({
  className,
  firstStepNumber = 1,
  headingElement = 'p',
  titleSize,
  steps,
  ...rest
}) => {
  const classes = classNames('euiSteps', className);

  return (
    <div className={classes} {...rest}>
      {renderSteps(steps, firstStepNumber, headingElement, titleSize)}
    </div>
  );
};
