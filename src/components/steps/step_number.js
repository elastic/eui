import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../icon';

import { EuiI18n } from '../i18n';

const statusToClassNameMap = {
  complete: 'euiStepNumber--complete',
  incomplete: 'euiStepNumber--incomplete',
  warning: 'euiStepNumber--warning',
  danger: 'euiStepNumber--danger',
  disabled: 'euiStepNumber--disabled',
};

export const STATUS = Object.keys(statusToClassNameMap);

export const EuiStepNumber = ({
  className,
  status,
  number,
  isHollow,
  ...rest
}) => {
  const classes = classNames(
    'euiStepNumber',
    statusToClassNameMap[status],
    {
      'euiStepNumber-isHollow': isHollow,
    },
    className
  );

  let numberOrIcon;
  if (status === 'complete') {
    numberOrIcon = (
      <EuiI18n token="euiStepNumber.isComplete" default="complete">
        {isComplete => (
          <EuiIcon
            type="check"
            className="euiStepNumber__icon"
            title={isComplete}
          />
        )}
      </EuiI18n>
    );
  } else if (status === 'warning') {
    numberOrIcon = (
      <EuiI18n token="euiStepNumber.hasWarnings" default="has warnings">
        {hasWarnings => (
          <EuiIcon
            type="alert"
            className="euiStepNumber__icon"
            title={hasWarnings}
          />
        )}
      </EuiI18n>
    );
  } else if (status === 'danger') {
    numberOrIcon = (
      <EuiI18n token="euiStepNumber.hasErrors" default="has errors">
        {hasErrors => (
          <EuiIcon
            type="cross"
            className="euiStepNumber__icon"
            title={hasErrors}
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

EuiStepNumber.propTypes = {
  children: PropTypes.node,
  /**
   * May replace the number provided in props.number with alternate styling
   */
  status: PropTypes.oneOf(STATUS),
  number: PropTypes.number,
  /**
   * Uses a border and removes the step number
   */
  isHollow: PropTypes.bool,
};
