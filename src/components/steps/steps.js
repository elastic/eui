import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiStep } from './step';

function renderSteps(steps, firstStepNumber, headingElement) {
  return steps.map((step, index) => {
    const { className, children, title, status, ...rest } = step;

    return (
      <EuiStep
        className={className}
        key={index}
        headingElement={headingElement}
        step={firstStepNumber + index}
        title={title}
        status={status}
        {...rest}>
        {children}
      </EuiStep>
    );
  });
}

export const EuiSteps = ({
  className,
  firstStepNumber,
  headingElement,
  steps,
  ...rest
}) => {
  const classes = classNames('euiSteps', className);

  return (
    <div className={classes} {...rest}>
      {renderSteps(steps, firstStepNumber, headingElement)}
    </div>
  );
};

const stepPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
});

EuiSteps.propTypes = {
  className: PropTypes.string,
  /**
   * The number the steps should begin from
   */
  firstStepNumber: PropTypes.number,
  /**
   * The HTML tag used for the title
   */
  headingElement: PropTypes.string,
  /**
   * An array of individual step objects
   */
  steps: PropTypes.arrayOf(stepPropType).isRequired,
};

EuiSteps.defaultProps = {
  firstStepNumber: 1,
  headingElement: 'p',
};
