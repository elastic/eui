import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiTitle
} from '../title';

export const EuiStep = ({
  className,
  children,
  headingElement,
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
          {React.createElement(headingElement, null, title)}
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
  headingElement: PropTypes.string.isRequired,
};
