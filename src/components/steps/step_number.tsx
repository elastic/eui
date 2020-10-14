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
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { EuiScreenReaderOnly } from '../accessibility';
import { CommonProps, keysOf } from '../common';
import { EuiIcon } from '../icon';
import { EuiStepProps } from './step';
import {
  useI18nCompleteStep,
  useI18nDisabledStep,
  useI18nErrorsStep,
  useI18nIncompleteStep,
  useI18nStep,
  useI18nWarningStep,
} from './step_strings';

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

export interface EuiStepNumberProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
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
  titleSize?: EuiStepProps['titleSize'];
}

export const EuiStepNumber: FunctionComponent<EuiStepNumberProps> = ({
  className,
  status,
  number,
  isHollow,
  titleSize,
  ...rest
}) => {
  const step = useI18nStep(number);
  const complete = useI18nCompleteStep(number);
  const warning = useI18nWarningStep(number);
  const errors = useI18nErrorsStep(number);
  const incomplete = useI18nIncompleteStep(number);
  const disabled = useI18nDisabledStep(number);

  const classes = classNames(
    'euiStepNumber',
    status ? statusToClassNameMap[status] : undefined,
    { 'euiStepNumber-isHollow': isHollow },
    className
  );

  const iconSize = titleSize === 'xs' ? 's' : 'm';

  let numberOrIcon;
  if (status === 'complete') {
    numberOrIcon = (
      <EuiIcon
        type="check"
        className="euiStepNumber__icon"
        size={iconSize}
        aria-label={complete}
      />
    );
  } else if (status === 'warning') {
    numberOrIcon = (
      <EuiIcon
        type="alert"
        className="euiStepNumber__icon"
        size={iconSize}
        aria-label={warning}
      />
    );
  } else if (status === 'danger') {
    numberOrIcon = (
      <EuiIcon
        type="cross"
        className="euiStepNumber__icon"
        size={iconSize}
        aria-label={errors}
      />
    );
  } else if (!isHollow) {
    let screenReaderText = step as string;
    if (status === 'incomplete') screenReaderText = incomplete;
    else if (status === 'disabled') screenReaderText = disabled;

    numberOrIcon = (
      <>
        <EuiScreenReaderOnly>
          <p>{screenReaderText}</p>
        </EuiScreenReaderOnly>
        <p aria-hidden="true">{number}</p>
      </>
    );
  }

  return (
    <div className={classes} {...rest}>
      {numberOrIcon}
    </div>
  );
};
