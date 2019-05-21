import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { EuiIcon } from '../icon';

import { EuiI18n } from '../i18n';
import { CommonProps, keysOf } from '../common';
import { EuiStepStatus } from '@elastic/eui';

const statusToClassNameMap = {
  complete: 'euiStepNumber--complete',
  incomplete: 'euiStepNumber--incomplete',
  warning: 'euiStepNumber--warning',
  danger: 'euiStepNumber--danger',
  disabled: 'euiStepNumber--disabled',
};

export const STATUS = keysOf(statusToClassNameMap);

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
        {() => <EuiIcon type="check" className="euiStepNumber__icon" />}
      </EuiI18n>
    );
  } else if (status === 'warning') {
    numberOrIcon = (
      <EuiI18n token="euiStepNumber.hasWarnings" default="has warnings">
        {() => <EuiIcon type="alert" className="euiStepNumber__icon" />}
      </EuiI18n>
    );
  } else if (status === 'danger') {
    numberOrIcon = (
      <EuiI18n token="euiStepNumber.hasErrors" default="has errors">
        {() => <EuiIcon type="cross" className="euiStepNumber__icon" />}
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
