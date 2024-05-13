/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
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
import {
  euiStepNumberStyles,
  euiStepNumberContentStyles,
} from './step_number.styles';

export const STATUS = [
  'incomplete',
  'disabled',
  'loading',
  'warning',
  'danger',
  'complete',
  'current',
] as const;

export type EuiStepStatus = (typeof STATUS)[number];

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
  titleSize = 's',
  ...rest
}) => {
  const ariaLabelsMap: Record<EuiStepStatus | 'step', string> = {
    step: useI18nStep({ number }),
    current: useI18nCurrentStep({ number }),
    incomplete: useI18nIncompleteStep({ number }),
    complete: useI18nCompleteStep({ number }),
    disabled: useI18nDisabledStep({ number }),
    warning: useI18nWarningStep({ number }),
    danger: useI18nErrorsStep({ number }),
    loading: useI18nLoadingStep({ number }),
  };

  const classes = classNames('euiStepNumber', className);

  const euiTheme = useEuiTheme();
  const styles = euiStepNumberStyles(euiTheme);
  const cssStyles = [
    styles.euiStepNumber,
    styles[titleSize],
    status && styles[status],
  ];

  const contentStyles = euiStepNumberContentStyles(euiTheme);
  let content: ReactNode;
  let screenReaderText: string | undefined;

  switch (status) {
    // Loading spinner
    case 'loading':
      screenReaderText = ariaLabelsMap.loading;
      content = (
        <EuiLoadingSpinner
          className="euiStepNumber__loader"
          size={titleSize === 'xs' ? 'l' : 'xl'}
        />
      );
      break;
    // Statuses with icons
    case 'danger':
    case 'warning':
    case 'complete':
      const cssIconStyles = [
        contentStyles.euiStepNumber__icon,
        contentStyles[status],
      ];
      const iconTypeMap = {
        danger: 'cross',
        warning: 'warning',
        complete: 'check',
      };

      content = (
        <EuiIcon
          type={iconTypeMap[status]}
          aria-label={ariaLabelsMap[status]}
          size={titleSize === 'xs' ? 's' : 'm'}
          className="euiStepNumber__icon"
          css={cssIconStyles}
        />
      );
      break;
    // Statuses with numbers
    case 'incomplete':
    case 'current':
    case 'disabled':
    default:
      const cssNumberStyles = [
        contentStyles.euiStepNumber__number,
        status && contentStyles[status],
      ];

      screenReaderText = ariaLabelsMap[status || 'step'];
      content = (
        <span
          aria-hidden="true"
          className="euiStepNumber__number"
          css={cssNumberStyles}
        >
          {number}
        </span>
      );
      break;
  }

  return (
    <span className={classes} css={cssStyles} {...rest}>
      {screenReaderText && (
        <EuiScreenReaderOnly>
          <span>{screenReaderText}</span>
        </EuiScreenReaderOnly>
      )}
      {content}
    </span>
  );
};
