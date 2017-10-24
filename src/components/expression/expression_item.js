import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiExpressionItem = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('kuiExpressionItem', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiExpressionItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
