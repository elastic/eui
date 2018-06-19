import React from 'react';
import PropTypes from 'prop-types';

export const EuiRangeStepped = ({
  className,
  children,
  ...rest
}) => (
  <div className={className} {...rest}>
    {children}
  </div>
);

EuiRangeStepped.propTypes = {
  children: PropTypes.node,
};

EuiRangeStepped.defaultProps = {
};
