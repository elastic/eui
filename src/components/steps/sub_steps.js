import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiSubSteps = ({ children, className, ...rest }) => {
  const classes = classNames('euiSubSteps', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiSubSteps.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
