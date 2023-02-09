/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { EuiScreenReaderOnly } from '../accessibility';
import { CommonProps } from '../common';
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
  useI18nCurrentStep,
} from './step_strings';
import { EuiLoadingSpinner } from '../loading';

import { useEuiTheme } from '../../services';
import { euiStepNumberStyles } from './step_number.styles';

export const STATUS = [
  'incomplete',
  'disabled',
  'loading',
  'warning',
  'danger',
  'complete',
  'current',
] as const;

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
   * Title sizing equivalent to EuiTitle, but only `m`, `s` and `xs`. Defaults to `s`
   */
  titleSize?: EuiStepProps['titleSize'];
}

export const EuiStepNumber: FunctionComponent<EuiStepNumberProps> = ({
  className,
  status,
  number,
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
  const currentAriaLabel = useI18nCurrentStep({ number });

  const isSmall = titleSize === 'xs';

  const classes = classNames('euiStepNumber', className);

  const euiTheme = useEuiTheme();
  const styles = euiStepNumberStyles(euiTheme);
  const cssStyles = [
    styles.euiStepNumber,
    isSmall && styles.small,
    !isSmall && styles.medium,
    status && styles[status],
  ];

  const cssIconStyles = styles.euiStepNumber__icon;

  const iconSize = titleSize === 'xs' ? 's' : 'm';
  let screenReaderText = stepAriaLabel;
  if (status === 'incomplete') screenReaderText = incompleteAriaLabel;
  else if (status === 'disabled') screenReaderText = disabledAriaLabel;
  else if (status === 'loading') screenReaderText = loadingAriaLabel;
  else if (status === 'current') screenReaderText = currentAriaLabel;

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
        css={cssIconStyles}
      />
    );
  } else if (status === 'warning') {
    numberOrIcon = (
      <EuiIcon
        type="alert"
        className="euiStepNumber__icon"
        size={iconSize}
        aria-label={warningAriaLabel}
        css={cssIconStyles}
      />
    );
  } else if (status === 'danger') {
    numberOrIcon = (
      <EuiIcon
        type="cross"
        className="euiStepNumber__icon"
        size={iconSize}
        aria-label={errorsAriaLabel}
        css={cssIconStyles}
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
    <span className={classes} css={cssStyles} {...rest}>
      {numberOrIcon}
    </span>
  );
};
