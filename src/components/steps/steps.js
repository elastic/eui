import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiStep } from './step';

function renderSteps(steps, firstStepNumber) {
  return steps.map((step, index) => {
    const {
      className,
      children,
      title,
      ...rest
    } = step;

    return (
      <EuiStep
        className={className}
        key={index}
        step={firstStepNumber + index + 1}
        title={title}
        {...rest}
      >
        {children}
      </EuiStep>
    );
  });
}

export const EuiSteps = ({
  className,
  firstStepNumber,
  steps,
  ...rest,
}) => {
  const classes = classNames('euiSteps', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {renderSteps(steps, firstStepNumber)}
    </div>
  );
};

const stepPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  children: PropTypes.node
});

EuiSteps.propTypes = {
  className: PropTypes.string,
  firstStepNumber: PropTypes.number,
  steps: PropTypes.arrayOf(stepPropType).isRequired,
};

EuiSteps.defaultProps = {
  firstStepNumber: 0
};
