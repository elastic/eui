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
import { EuiStepNumber, EuiStepStatus } from './step_number';
import {
  useI18nCompleteStep,
  useI18nCurrentStep,
  useI18nDisabledStep,
  useI18nIncompleteStep,
  useI18nStep,
  useI18nWarningStep,
} from './step_strings';
import { useEuiTheme } from '../../services';
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
   * The `disabled` props will override this.
   */
  status?: EuiStepStatus;
}

export const EuiStepHorizontal: FunctionComponent<EuiStepHorizontalProps> = ({
  className,
  step = 1,
  title,
  onClick,
  disabled,
  status = 'incomplete',
  ...rest
}) => {
  const buttonTitle = useI18nStep({ number: step, title });
  const completeTitle = useI18nCompleteStep({ number: step, title });
  const disabledTitle = useI18nDisabledStep({ number: step, title });
  const incompleteTitle = useI18nIncompleteStep({ number: step, title });
  const warningTitle = useI18nWarningStep({ number: step, title });
  const currentTitle = useI18nCurrentStep({ number: step, title });

  if (disabled) status = 'disabled';

  const classes = classNames('euiStepHorizontal', className);

  const isCurrent = status === 'current';
  const isComplete = status === 'complete';
  const isIncomplete = status === 'incomplete';
  const isDisabled = status === 'disabled';
  const isWarning = status === 'warning';

  const euiTheme = useEuiTheme();
  const styles = euiStepHorizontalStyles(euiTheme);
  const cssStyles = [
    styles.euiStepHorizontal,
    isDisabled ? styles.disabled : styles.enabled,
  ];

  const numberStyles = euiStepHorizontalNumberStyles(euiTheme);
  const cssNumberStyles = [
    numberStyles.euiStepHorizontal__number,
    isCurrent && numberStyles.current,
  ];

  const titleStyles = euiStepHorizontalTitleStyles(euiTheme);
  const cssTitleStyles = [
    titleStyles.euiStepHorizontal__title,
    isDisabled && titleStyles.disabled,
  ];

  let stepTitle = buttonTitle;
  if (isDisabled) stepTitle = disabledTitle;
  if (isComplete) stepTitle = completeTitle;
  if (isIncomplete) stepTitle = incompleteTitle;
  if (isWarning) stepTitle = warningTitle;
  if (isCurrent) stepTitle = currentTitle;

  const onStepClick = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!disabled) onClick(event);
  };

  return (
    <button
      className={classes}
      title={stepTitle}
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
        css={cssNumberStyles}
      />

      <span className="euiStepHorizontal__title" css={cssTitleStyles}>
        {title}
      </span>
    </button>
  );
};
