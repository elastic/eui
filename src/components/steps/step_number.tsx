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
import classNames from 'classnames';

import { EuiIcon } from '../icon';

import { StandaloneEuiStepProps } from './step';

import { EuiI18n } from '../i18n';
import { CommonProps, keysOf } from '../common';

const statusToClassNameMap = {
  complete: 'euiStepNumber--complete',
  incomplete: 'euiStepNumber--incomplete',
  warning: 'euiStepNumber--warning',
  danger: 'euiStepNumber--danger',
  disabled: 'euiStepNumber--disabled',
};

export const STATUS = keysOf(statusToClassNameMap);

export type EuiStepStatus =
  | 'complete'
  | 'incomplete'
  | 'warning'
  | 'danger'
  | 'disabled';

export interface EuiStepNumberProps {
  /**
   * May replace the number provided in props.number with alternate styling
   */
  status?: EuiStepStatus;
  number?: number;
  /**
   * Uses a border and removes the step number
   */
  isHollow?: boolean;
  /**
   * Title sizing equivalent to EuiTitle, but only `m`, `s` and `xs`. Defaults to `s`
   */
  titleSize?: StandaloneEuiStepProps['titleSize'];
}

export const EuiStepNumber: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepNumberProps
  // Note - tslint:disable refers to the `number` as it conflicts with the build in number type
  // tslint:disable-next-line:variable-name
> = ({ className, status, number, isHollow, titleSize, ...rest }) => {
  const classes = classNames(
    'euiStepNumber',
    status ? statusToClassNameMap[status] : undefined,
    {
      'euiStepNumber-isHollow': isHollow,
    },
    className
  );

  const iconSize = titleSize === 'xs' ? 's' : 'm';

  let numberOrIcon;
  if (status === 'complete') {
    numberOrIcon = (
      <EuiI18n token="euiStepNumber.isComplete" default="complete">
        {(isComplete: string) => (
          <EuiIcon
            type="check"
            className="euiStepNumber__icon"
            size={iconSize}
            aria-label={isComplete}
          />
        )}
      </EuiI18n>
    );
  } else if (status === 'warning') {
    numberOrIcon = (
      <EuiI18n token="euiStepNumber.hasWarnings" default="has warnings">
        {(hasWarnings: string) => (
          <EuiIcon
            type="alert"
            className="euiStepNumber__icon"
            size={iconSize}
            aria-label={hasWarnings}
          />
        )}
      </EuiI18n>
    );
  } else if (status === 'danger') {
    numberOrIcon = (
      <EuiI18n token="euiStepNumber.hasErrors" default="has errors">
        {(hasErrors: string) => (
          <EuiIcon
            type="cross"
            className="euiStepNumber__icon"
            size={iconSize}
            aria-label={hasErrors}
          />
        )}
      </EuiI18n>
    );
  } else if (!isHollow) {
    numberOrIcon = number;
  }

  return (
    <div className={classes} {...rest}>
      {numberOrIcon}
    </div>
  );
};
