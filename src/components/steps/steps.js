import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiStep } from './step';

function renderSteps(steps, offset = 0) {
  return steps.map((step, index) => (
    <EuiStep
      className="kuiVerticalRhythm"
      key={index}
      step={offset + index + 1}
      title={step.title}
    >
      {step.children}
    </EuiStep>
  ));
}

export const EuiSteps = ({
  className,
  offset,
  steps,
  ...rest,
}) => {
  const classes = classNames('euiSteps', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {renderSteps(steps, offset)}
    </div>
  );
};

const stepPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  children: PropTypes.node
});

EuiSteps.propTypes = {
  className: PropTypes.string,
  offset: PropTypes.number,
  steps: PropTypes.arrayOf(stepPropType).isRequired,
};
