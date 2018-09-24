import React from 'react';
import PropTypes from 'prop-types';

export const EuiTableFooter = ({ children, className, ...rest }) => {
  return (
    <tfoot className={className} {...rest}>
      <tr>{children}</tr>
    </tfoot>
  );
};

EuiTableFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
