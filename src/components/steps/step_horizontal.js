import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiScreenReaderOnly,
  EuiKeyboardAccessible,
} from '../accessibility';

import { EuiIcon } from '../icon';

export const EuiStepHorizontal = ({
  className,
  step,
  title,
  isSelected,
  isComplete,
  onClick,
  disabled,
  ...rest
}) => {
  const classes = classNames('euiStepHorizontal', className, {
    'euiStepHorizontal-isSelected': isSelected,
    'euiStepHorizontal-isComplete': isComplete,
    'euiStepHorizontal-isIncomplete': !isSelected && !isComplete,
    'euiStepHorizontal-isDisabled': disabled,
  });

  let numberNode;
  let titleAppendix = '';

  if (disabled) {
    numberNode = step;
    titleAppendix = ' is disabled';
  } else if (isComplete) {
    numberNode = (
      <EuiIcon type="check" color="ghost" />
    );
    titleAppendix = ' is complete';
  } else {
    numberNode = step;
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

        <div className="euiStepHorizontal__number">
          {numberNode}
        </div>

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
};

EuiStepHorizontal.defaultProps = {
  isSelected: false,
  isComplete: false,
  disabled: false,
};
