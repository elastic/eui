import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../icon';

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
    className,
  );

  let numberOrIcon;
  if (status === 'complete') {
    numberOrIcon = <EuiIcon type="check" className="euiStepNumber__icon" title="complete" />;
  } else if (status === 'warning') {
    numberOrIcon = <EuiIcon type="alert" className="euiStepNumber__icon" title="has warnings" />;
  } else if (status === 'danger') {
    numberOrIcon = <EuiIcon type="cross" className="euiStepNumber__icon" title="has errors" />;
  } else if (!isHollow) {
    numberOrIcon = number;
  }

  return (
    <div
      className={classes}
      {...rest}
    >
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
