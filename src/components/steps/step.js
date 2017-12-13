import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
  const classes = classNames('euiStep', className);
  return (
    <div
      className={classes}
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

      <div className="euiStepContent">
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
