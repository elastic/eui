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
  useI18nLoadingStep,
} from './step_strings';
import { EuiLoadingSpinner } from '../loading';

const statusToClassNameMap = {
  incomplete: 'euiStepNumber--incomplete',
  disabled: 'euiStepNumber--disabled',
  loading: 'euiStepNumber--loading',
  warning: 'euiStepNumber--warning',
  danger: 'euiStepNumber--danger',
  complete: 'euiStepNumber--complete',
};

export const STATUS = keysOf(statusToClassNameMap);
export type EuiStepStatus = typeof STATUS[number];

export interface EuiStepNumberProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * May replace the number provided in props.number with alternate styling
   */
  status?: EuiStepStatus;
  number?: number;
  /**
   * **DEPRECATED IN AMSTERDAM**
   * Uses a border and removes the step number.
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
  const stepAriaLabel = useI18nStep({ number });
  const completeAriaLabel = useI18nCompleteStep({ number });
  const warningAriaLabel = useI18nWarningStep({ number });
  const errorsAriaLabel = useI18nErrorsStep({ number });
  const incompleteAriaLabel = useI18nIncompleteStep({ number });
  const disabledAriaLabel = useI18nDisabledStep({ number });
  const loadingAriaLabel = useI18nLoadingStep({ number });

  const classes = classNames(
    'euiStepNumber',
    status ? statusToClassNameMap[status] : undefined,
    { 'euiStepNumber-isHollow': isHollow },
    className
  );

  const iconSize = titleSize === 'xs' ? 's' : 'm';
  let screenReaderText = stepAriaLabel;
  if (status === 'incomplete') screenReaderText = incompleteAriaLabel;
  else if (status === 'disabled') screenReaderText = disabledAriaLabel;
  else if (status === 'loading') screenReaderText = loadingAriaLabel;

  let numberOrIcon = (
    <>
      <EuiScreenReaderOnly>
        <span>{screenReaderText}</span>
      </EuiScreenReaderOnly>
      <span className="euiStepNumber__number" aria-hidden="true">
        {number}
      </span>
    </>
  );

  if (status === 'complete') {
    numberOrIcon = (
      <EuiIcon
        type="check"
        className="euiStepNumber__icon"
        size={iconSize}
        aria-label={completeAriaLabel}
      />
    );
  } else if (status === 'warning') {
    numberOrIcon = (
      <EuiIcon
        type="alert"
        className="euiStepNumber__icon"
        size={iconSize}
        aria-label={warningAriaLabel}
      />
    );
  } else if (status === 'danger') {
    numberOrIcon = (
      <EuiIcon
        type="cross"
        className="euiStepNumber__icon"
        size={iconSize}
        aria-label={errorsAriaLabel}
      />
    );
  } else if (status === 'loading') {
    numberOrIcon = (
      <>
        <EuiScreenReaderOnly>
          <span>{screenReaderText}</span>
        </EuiScreenReaderOnly>
        <EuiLoadingSpinner
          className="euiStepNumber__loader"
          size={iconSize === 's' ? 'l' : 'xl'}
        />
      </>
    );
  }

  return (
    <span className={classes} {...rest}>
      {numberOrIcon}
    </span>
  );
};
