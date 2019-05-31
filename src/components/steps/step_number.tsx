import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { EuiIcon } from '../icon';

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
}

export const EuiStepNumber: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepNumberProps
  // Note - tslint:disable refers to the `number` as it conflicts with the build in number type
  // tslint:disable-next-line:variable-name
> = ({ className, status, number, isHollow, ...rest }) => {
  const classes = classNames(
    'euiStepNumber',
    status ? statusToClassNameMap[status] : undefined,
    {
      'euiStepNumber-isHollow': isHollow,
    },
    className
  );

  let numberOrIcon;
  if (status === 'complete') {
    numberOrIcon = (
      <EuiI18n token="euiStepNumber.isComplete" default="complete">
        {(isComplete: string) => (
          <EuiIcon
            type="check"
            className="euiStepNumber__icon"
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
