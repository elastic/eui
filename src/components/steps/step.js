import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiScreenReaderOnly,
} from '../accessibility';

import {
  EuiTitle,
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

      <EuiScreenReaderOnly><span>Step</span></EuiScreenReaderOnly>

      <EuiTitle className="euiStep__title" data-step-num={step}>
        {React.createElement(headingElement, null, title)}
      </EuiTitle>

      <div className="euiStep__content">
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

EuiStep.defaultProps = {
  headingElement: 'p'
};
