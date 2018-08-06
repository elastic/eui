import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiScreenReaderOnly,
} from '../accessibility';

import {
  EuiTitle,
} from '../title';

import {
  STATUS,
  EuiStepNumber,
} from './step_number';

export const EuiStep = ({
  className,
  children,
  headingElement,
  step,
  title,
  status,
  ...rest
}) => {
  const classes = classNames('euiStep', className);

  let screenReaderPrefix;
  if (status === 'incomplete') {
    screenReaderPrefix = 'Incomplete';
  }

  return (
    <div
      className={classes}
      {...rest}
    >

      <EuiScreenReaderOnly><span>{screenReaderPrefix} Step </span></EuiScreenReaderOnly>

      <EuiStepNumber className="euiStep__circle" number={step} status={status} isHollow={status === 'incomplete'}/>

      <EuiTitle size="s" className="euiStep__title">
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
  /**
   * Will replace the number provided in props.step with alternate styling.
   * Options: `complete`, `incomplete`, `warning`, `danger`, `disabled`
   */
  status: PropTypes.oneOf(STATUS),
  /**
   * The number of the step in the list of steps
   */
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  /**
   * The HTML tag used for the title
   */
  headingElement: PropTypes.string.isRequired,
};

EuiStep.defaultProps = {
  headingElement: 'p'
};
