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
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { EuiIcon } from '../icon';
import { EuiI18n } from '../i18n';

const statusToClassNameMap = {
  complete: 'euiTourStepIndicator--complete',
  incomplete: 'euiTourStepIndicator--incomplete',
  active: 'euiTourStepIndicator--active',
};

export const STATUS = keysOf(statusToClassNameMap);

export type EuiTourStepStatus = keyof typeof statusToClassNameMap;

export interface EuiTourStepIndicatorProps
  extends CommonProps,
    HTMLAttributes<HTMLLIElement> {
  number: number;
  status: EuiTourStepStatus;
}

export const EuiTourStepIndicator: FunctionComponent<EuiTourStepIndicatorProps> = ({
  className,
  number,
  status,
  ...rest
}) => {
  const classes = classNames(
    'euiTourStepIndicator',
    status ? statusToClassNameMap[status] : undefined,
    className
  );

  let indicatorIcon: ReactNode;
  if (status === 'active') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isActive" default="active">
        {(isActive: string) => (
          <EuiIcon
            type="dot"
            className="euiStepNumber__icon"
            aria-label={isActive}
            color="secondary"
            aria-current="step"
          />
        )}
      </EuiI18n>
    );
  } else if (status === 'complete') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isComplete" default="complete">
        {(isComplete: string) => (
          <EuiIcon
            type="dot"
            className="euiStepNumber__icon"
            aria-label={isComplete}
            color="subdued"
          />
        )}
      </EuiI18n>
    );
  } else if (status === 'incomplete') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isIncomplete" default="incomplete">
        {(isIncomplete: string) => (
          <EuiIcon
            type="dot"
            className="euiStepNumber__icon"
            aria-label={isIncomplete}
            color="subdued"
          />
        )}
      </EuiI18n>
    );
  }

  return (
    <EuiI18n
      token="euiTourStepIndicator.ariaLabel"
      default="Step {number} {status}"
      values={{ status, number }}>
      {(ariaLabel: string) => (
        <li className={classes} aria-label={ariaLabel} {...rest}>
          {indicatorIcon}
        </li>
      )}
    </EuiI18n>
  );
};
