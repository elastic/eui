import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTableRow = ({
  children,
  className,
  isSelected,
  isSelectable,
  hasActions,
  isExpandedRow,
  isExpandable,
  onClick,
  ...rest
}) => {
  const classes = classNames('euiTableRow', className, {
    'euiTableRow-isSelectable': isSelectable,
    'euiTableRow-isSelected': isSelected,
    'euiTableRow-hasActions': hasActions,
    'euiTableRow-isExpandedRow': isExpandedRow,
    'euiTableRow-isExpandable': isExpandable,
    'euiTableRow-isClickable': onClick,
  });

  return (
    <tr className={classes} onClick={onClick} {...rest}>
      {children}
    </tr>
  );
};

EuiTableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Indicates if the table has a single column of checkboxes for selecting rows (affects mobile only)
   */
  isSelectable: PropTypes.bool,
  /**
   * Indicates the current row has been selected
   */
  isSelected: PropTypes.bool,
  /**
   * Indicates if the table has a dedicated column for icon-only actions (affects mobile only)
   */
  hasActions: PropTypes.bool,
  /**
   * Indicates if the row will have an expanded row
   */
  isExpandable: PropTypes.bool,
  /**
   * Indicates if the row will be the expanded row
   */
  isExpandedRow: PropTypes.bool,
};
