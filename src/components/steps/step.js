import React from 'react';
import PropTypes from 'prop-types';

export function EuiStep({ children, step, title }) {
  return (
    <div>

      <div>
        <div className="euiStepNumber">
          {step}
        </div>
        <h3 className="euiStepTitle">
          {title}
        </h3>
      </div>

      <div className="euiStep">
        {children}
      </div>

    </div>
  );
}

EuiStep.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
