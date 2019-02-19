import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFieldEmpty = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiFieldEmpty', className);

  return (
    <div className={classes} {...rest}>
      { children }
    </div>
  );
};

EuiFieldEmpty.propTypes = {
  children: PropTypes.node,
};
