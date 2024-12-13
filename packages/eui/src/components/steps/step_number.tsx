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
import { EuiIcon, IconSize } from '../icon';
import { EuiLoadingSpinner } from '../loading';
import { EuiLoadingSpinnerSize } from '../loading/loading_spinner';
import { EuiTitleProps } from '../title';
import { useEuiMemoizedStyles } from '../../services';

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
   * Title sizing equivalent to EuiTitle, but only `m`, `s`, `xs`.
   * `none` indicates no step number should be rendered.
   * @default s
   */
  titleSize?: Extract<EuiTitleProps['size'], 'xs' | 's' | 'm'> | 'none';
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

  const styles = useEuiMemoizedStyles(euiStepNumberStyles);
  const cssStyles = [
    styles.euiStepNumber,
    styles[titleSize],
    status && styles[status],
  ];

  const iconStyles = useEuiMemoizedStyles(euiStepNumberContentStyles);
  let content: ReactNode;
  let screenReaderText: string | undefined;

  switch (status) {
    // Loading spinner
    case 'loading': {
      const iconSizeMap: Record<string, EuiLoadingSpinnerSize> = {
        none: 'm',
        xs: 'l',
        s: 'xl',
        m: 'xl',
      };
      screenReaderText = ariaLabelsMap.loading;
      content = (
        <EuiLoadingSpinner
          className="euiStepNumber__loader"
          size={iconSizeMap[titleSize]}
        />
      );
      break;
    }
    // Statuses with icons
    case 'danger':
    case 'warning':
    case 'complete': {
      const cssIconStyles = [
        iconStyles.euiStepNumber__icon,
        status === 'warning'
          ? iconStyles.warning[titleSize]
          : iconStyles[status],
        // EuiIcon does not support a xxs size so far,
        // we use custom sizing here instead
        titleSize === 'none' && iconStyles[titleSize],
      ];
      const iconTypeMap = {
        danger: 'cross',
        warning: 'warning',
        complete: 'check',
      };
      const iconSizeMap: Record<string, IconSize> = {
        xxs: 's',
        xs: 's',
        s: 'm',
        m: 'm',
      };

      content = (
        <EuiIcon
          type={iconTypeMap[status]}
          aria-label={ariaLabelsMap[status]}
          size={iconSizeMap[titleSize]}
          className="euiStepNumber__icon"
          css={cssIconStyles}
        />
      );
      break;
    }
    // Statuses with numbers
    case 'incomplete':
    case 'current':
    case 'disabled':
    default:
      screenReaderText = ariaLabelsMap[status || 'step'];

      if (titleSize === 'none') {
        break;
      }

      content = (
        <span aria-hidden="true" className="euiStepNumber__number">
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
