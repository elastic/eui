import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly, EuiKeyboardAccessible } from '../accessibility';

import { EuiI18n } from '../i18n';

import { STATUS, EuiStepNumber } from './step_number';

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

  if (disabled) {
    status = 'disabled';
  } else if (isComplete) {
    status = 'complete';
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

  return (
    <EuiI18n
      token="euiStepHorizontal.buttonTitle"
      default={({ step, title, disabled, isComplete }) => {
        let titleAppendix = '';
        if (disabled) {
          titleAppendix = ' is disabled';
        } else if (isComplete) {
          titleAppendix = ' is complete';
        }

        return `Step ${step}: ${title}${titleAppendix}`;
      }}
      values={{ step, title, disabled, isComplete }}>
      {buttonTitle => (
        <EuiKeyboardAccessible>
          <div
            role="tab"
            aria-selected={!!isSelected}
            aria-disabled={!!disabled}
            className={classes}
            onClick={onStepClick}
            tabIndex={disabled ? '-1' : '0'}
            title={buttonTitle}
            {...rest}>
            <EuiScreenReaderOnly>
              <div>
                <EuiI18n token="euiStepHorizontal.step" default="Step" />
              </div>
            </EuiScreenReaderOnly>

            <EuiStepNumber
              className="euiStepHorizontal__number"
              status={status}
              number={step}
            />

            <div className="euiStepHorizontal__title">{title}</div>
          </div>
        </EuiKeyboardAccessible>
      )}
    </EuiI18n>
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
