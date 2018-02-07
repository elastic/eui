import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiStepsHorizontal = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiStepsHorizontal',
    className
  );

  return (
    <div
      role="tablist"
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiStepsHorizontal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
