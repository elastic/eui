import React from 'react';
import PropTypes from 'prop-types';

export const EuiTableHeader = ({ children, className, ...rest }) => {
  return (
    <thead className={className} {...rest}>
      <tr>{children}</tr>
    </thead>
  );
};

EuiTableHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
