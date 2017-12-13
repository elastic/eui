import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiTitle
} from '../title';

export const EuiStep = ({
  className,
  children,
  step,
  title,
  ...rest
}) => {
  return (
    <div
      className={className}
      {...rest}
    >

      <div>
        <div className="euiStepNumber">
          {step}
        </div>
        <EuiTitle className="euiStepTitle">
          <p>{title}</p>
        </EuiTitle>
      </div>

      <div className="euiStep">
        {children}
      </div>

    </div>
  );
};

EuiStep.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
