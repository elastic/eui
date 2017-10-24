import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTableRow = ({ children, className, isSelected, ...rest }) => {
  const classes = classNames('euiTableRow', className, {
    'euiTableRow-isSelected': isSelected,
  });

  return (
    <tr
      className={classes}
      {...rest}
    >
      {children}
    </tr>
  );
};

EuiTableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isSelected: PropTypes.bool,
};
