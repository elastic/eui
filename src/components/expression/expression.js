import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiExpression = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiExpression', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiExpression.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
