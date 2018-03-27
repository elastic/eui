import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTableRowCellCheckbox = ({ children, className, ...rest }) => {
  const classes = classNames('euiTableRowCellCheckbox', className);

  return (
    <td className={classes} {...rest}>
      <div className="euiTableCellContent">{children}</div>
    </td>
  );
};

EuiTableRowCellCheckbox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
