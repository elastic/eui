/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEvent as ReactMouseEvent,
  MouseEventHandler,
} from 'react';
import { CommonProps } from '../common';
import { useEuiMemoizedStyles } from '../../services';
import {
  EuiStepNumber,
  EuiStepNumberProps,
  EuiStepStatus,
} from './step_number';
import { EuiStepsHorizontalSizes } from './steps_horizontal';
import {
  useI18nCompleteStep,
  useI18nCurrentStep,
  useI18nDisabledStep,
  useI18nIncompleteStep,
  useI18nStep,
  useI18nWarningStep,
  useI18nErrorsStep,
  useI18nLoadingStep,
} from './step_strings';
import {
  euiStepHorizontalStyles,
  euiStepHorizontalNumberStyles,
  euiStepHorizontalTitleStyles,
} from './step_horizontal.styles';

export interface EuiStepHorizontalProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    CommonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  /**
   * Makes the whole step button disabled.
   */
  disabled?: boolean;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title?: string;
  /**
   * Visual representation of the step number indicator.
   * May replace the number provided in props.step with alternate styling.
   * The `disabled` prop will override this.
   */
  status?: EuiStepStatus;
  size?: EuiStepsHorizontalSizes;
}

// The titleSize map is not 1 to 1; small == xs on the titleSize map
const stepNumberSizeMap: Record<string, EuiStepNumberProps['titleSize']> = {
  xs: 'none',
  s: 'xs',
  m: 'm',
};

export const EuiStepHorizontal: FunctionComponent<EuiStepHorizontalProps> = ({
  className,
  step = 1,
  title,
  onClick,
  disabled,
  status = 'incomplete',
  size = 'm',
  ...rest
}) => {
  if (disabled) status = 'disabled';

  const classes = classNames('euiStepHorizontal', className);

  const styles = useEuiMemoizedStyles(euiStepHorizontalStyles);
  const cssStyles = [
    styles.euiStepHorizontal,
    styles[size],
    status === 'disabled' ? styles.disabled : styles.enabled,
  ];

  const numberStyles = useEuiMemoizedStyles(euiStepHorizontalNumberStyles);
  const cssNumberStyles = [numberStyles.euiStepHorizontal__number];

  const titleStyles = useEuiMemoizedStyles(euiStepHorizontalTitleStyles);
  const cssTitleStyles = [
    titleStyles.euiStepHorizontal__title,
    status === 'disabled' && titleStyles.disabled,
  ];

  const titleAttrsMap: Record<EuiStepStatus | 'step', string> = {
    step: useI18nStep({ number: step, title }),
    current: useI18nCurrentStep({ number: step, title }),
    disabled: useI18nDisabledStep({ number: step, title }),
    incomplete: useI18nIncompleteStep({ number: step, title }),
    complete: useI18nCompleteStep({ number: step, title }),
    warning: useI18nWarningStep({ number: step, title }),
    danger: useI18nErrorsStep({ number: step, title }),
    loading: useI18nLoadingStep({ number: step, title }),
  };
  const titleAttr = titleAttrsMap[status || 'step'];

  const onStepClick = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!disabled) onClick(event);
  };

  return (
    <button
      aria-disabled={status === 'disabled' ? true : undefined}
      className={classes}
      title={titleAttr}
      onClick={onStepClick}
      disabled={disabled}
      css={cssStyles}
      data-step-status={status}
      {...rest}
    >
      <EuiStepNumber
        className="euiStepHorizontal__number"
        status={status}
        number={step}
        titleSize={stepNumberSizeMap[size]}
        css={cssNumberStyles}
      />

      <span className="euiStepHorizontal__title" css={cssTitleStyles}>
        {title}
      </span>
    </button>
  );
};
