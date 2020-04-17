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

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { CommonProps } from '../common';

import classNames from 'classnames';

import { EuiTitle } from '../title';

import { EuiStepStatus, EuiStepNumber } from './step_number';

import { EuiI18n } from '../i18n';

export interface EuiStepProps {
  children: ReactNode;
  /**
   * The HTML tag used for the title
   */
  headingElement?: string;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title: string;
  /**
   * May replace the number provided in props.step with alternate styling.
   */
  status?: EuiStepStatus;
}

export type StandaloneEuiStepProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiStepProps;

export const EuiStep: FunctionComponent<StandaloneEuiStepProps> = ({
  className,
  children,
  headingElement = 'p',
  step = 1,
  title,
  status,
  ...rest
}) => {
  const classes = classNames('euiStep', className);

  return (
    <div className={classes} {...rest}>
      <div className="euiStep__titleWrapper">
        <EuiI18n
          token="euiStep.ariaLabel"
          default={({ status }: { status?: EuiStepStatus }) => {
            if (status === 'incomplete') return 'Incomplete Step';
            return 'Step';
          }}
          values={{ status }}>
          {(ariaLabel: string) => (
            <EuiStepNumber
              className="euiStep__circle"
              aria-label={`${ariaLabel} ${step}`}
              number={step}
              status={status}
              isHollow={status === 'incomplete'}
            />
          )}
        </EuiI18n>

        <EuiTitle size="s" className="euiStep__title">
          {React.createElement(headingElement, null, title)}
        </EuiTitle>
      </div>

      <div className="euiStep__content">{children}</div>
    </div>
  );
};
