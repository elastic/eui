import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiScreenReaderOnly,
  EuiKeyboardAccessible,
} from '../accessibility';

import {
  STATUS,
  EuiStepNumber,
} from './step_number';

export const EuiStepHorizontal = ({
  className,
  step,
  title,
  isSelected,
  isComplete,
  onClick,
  disabled,
  status,
  ...rest
}) => {
  const classes = classNames('euiStepHorizontal', className, {
    'euiStepHorizontal-isSelected': isSelected,
    'euiStepHorizontal-isComplete': isComplete,
    'euiStepHorizontal-isIncomplete': !isSelected && !isComplete,
    'euiStepHorizontal-isDisabled': disabled,
  });

  let titleAppendix = '';

  if (disabled) {
    status = 'disabled';
    titleAppendix = ' is disabled';
  } else if (isComplete) {
    status = 'complete';
    titleAppendix = ' is complete';
  } else if (isSelected) {
    status = status;
  } else if (!isComplete && !status) {
    status = 'incomplete';
  }

  const onStepClick = e => {
    if (disabled) {
      return;
    }

    onClick(e);
  };

  const buttonTitle = `Step ${step}: ${title}${titleAppendix}`;

  return (
    <EuiKeyboardAccessible>
      <div
        role="tab"
        aria-selected={!!isSelected}
        aria-disabled={!!disabled}
        className={classes}
        onClick={onStepClick}
        tabIndex={disabled ? '-1' : '0'}
        title={buttonTitle}
        {...rest}
      >
        <EuiScreenReaderOnly><div>Step</div></EuiScreenReaderOnly>

        <EuiStepNumber className="euiStepHorizontal__number" status={status} number={step} />

        <div className="euiStepHorizontal__title">
          {title}
        </div>
      </div>
    </EuiKeyboardAccessible>
  );
};

EuiStepHorizontal.propTypes = {
  isSelected: PropTypes.bool,
  isComplete: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  title: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * Will replace the number provided in props.step with alternate styling.
   * Options: `complete`, `incomplete`, `warning`, `danger`, `disabled`.
   * The `isSelected`, `isComplete`, and `disabled` props will override these.
   */
  status: PropTypes.oneOf(STATUS),
};

EuiStepHorizontal.defaultProps = {
  isSelected: false,
  isComplete: false,
  disabled: false,
};
