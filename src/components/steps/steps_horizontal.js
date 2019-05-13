import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiStepHorizontal } from './step_horizontal';

function renderHorizontalSteps(steps) {
  return steps.map((step, index) => {
    const {
      children,
      className,
      disabled,
      isSelected,
      onClick,
      ...rest
    } = step;

    return (
      <EuiStepHorizontal
        className={className}
        key={index}
        step={index + 1}
        disabled={disabled}
        isSelected={isSelected}
        onClick={onClick}
        {...rest}>
        {children}
      </EuiStepHorizontal>
    );
  });
}

export const EuiStepsHorizontal = ({ className, steps, ...rest }) => {
  const classes = classNames('euiStepsHorizontal', className);

  return (
    <div role="tablist" className={classes} {...rest}>
      {renderHorizontalSteps(steps)}
    </div>
  );
};

const stepPropType = PropTypes.shape({
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
});

EuiStepsHorizontal.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.arrayOf(stepPropType).isRequired,
};
