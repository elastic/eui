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
  EuiIcon,
} from '../icon';

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
  const circleClasses = classNames(
    'euiStep__circle',
    {
      'euiStep__circle--complete': (status === 'complete'),
      'euiStep__circle--incomplete': (status === 'incomplete'),
    }
  );

  let numberOrIcon;
  if (status === 'complete') {
    numberOrIcon = <EuiIcon type="check" color="ghost" className="euiStep__circleIcon" />;
  } else if (status !== 'incomplete') {
    numberOrIcon = step;
  }

  return (
    <div
      className={classes}
      {...rest}
    >

      <EuiScreenReaderOnly><span>Step</span></EuiScreenReaderOnly>

      <div className={circleClasses}>
        {numberOrIcon}
      </div>

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
   * Will replace the number provided in props.step with alternate styling
   */
  status: PropTypes.oneOf(['complete', 'incomplete']),
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
