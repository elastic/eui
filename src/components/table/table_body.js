import React from 'react';
import PropTypes from 'prop-types';

export const EuiTableBody = ({ children, className, ...rest }) => (
  <tbody className={className} {...rest}>
    { children }
  </tbody>
);

EuiTableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
