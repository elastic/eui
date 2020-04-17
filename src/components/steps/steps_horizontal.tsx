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

import { EuiStepHorizontalProps, EuiStepHorizontal } from './step_horizontal';

type ContainedEuiStepHorizontalProps = Omit<EuiStepHorizontalProps, 'step'>;

export interface EuiStepsHorizontalProps {
  /**
   * An array of `EuiStepHorizontal` objects excluding the `step` prop
   */
  steps: ContainedEuiStepHorizontalProps[];
}

function renderHorizontalSteps(steps: ContainedEuiStepHorizontalProps[]) {
  return steps.map((step, index) => {
    return <EuiStepHorizontal key={index} step={index + 1} {...step} />;
  });
}

export const EuiStepsHorizontal: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepsHorizontalProps
> = ({ className, steps, ...rest }) => {
  const classes = classNames('euiStepsHorizontal', className);

  return (
    <div role="tablist" className={classes} {...rest}>
      {renderHorizontalSteps(steps)}
    </div>
  );
};
