import React from 'react';
import PropTypes from 'prop-types';

export const EuiTableBody = ({ children, className, bodyRef, ...rest }) => {
  return (
    <tbody className={className} ref={bodyRef} {...rest}>
      {children}
    </tbody>
  );
};

EuiTableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
