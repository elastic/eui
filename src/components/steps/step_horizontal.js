import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiScreenReaderOnly,
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

  const buttonTitle = `Step ${step}: ${title}${titleAppendix}`;

  return (
    <button
      role="tab"
      aria-selected={!!isSelected}
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      title={buttonTitle}
      {...rest}
    >

      <EuiScreenReaderOnly><span>Step</span></EuiScreenReaderOnly>

      <div className="euiStepHorizontal__number">
        {numberNode}
      </div>

      <span className="euiStepHorizontal__title">
        {title}
      </span>

    </button>
  );
};

EuiStepHorizontal.propTypes = {
  isSelected: PropTypes.bool,
  isComplete: PropTypes.bool,
  onClick: PropTypes.func,
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
