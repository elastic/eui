import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

interface EuiTableRowProps {
  /**
   * Indicates if the table has a single column of checkboxes for selecting
   * rows (affects mobile only)
   */
  isSelectable?: boolean;
  /**
   * Indicates the current row has been selected
   */
  isSelected?: boolean;
  /**
   * Indicates if the table has a dedicated column for icon-only actions
   * (affects mobile only)
   */
  hasActions?: boolean;
  /**
   * Indicates if the row will have an expanded row
   */
  isExpandable?: boolean;
  /**
   * Indicates if the row will be the expanded row
   */
  isExpandedRow?: boolean;
}

type Props = CommonProps &
  HTMLAttributes<HTMLTableRowElement> &
  EuiTableRowProps;

export const EuiTableRow: FunctionComponent<Props> = ({
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
