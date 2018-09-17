import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT
} from '../../services';

const ALIGNMENT = [
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT
];

export const EuiTableFooterCell = ({
  children,
  align,
  colSpan,
  className,
  scope,
  isMobileHeader,
  hideForMobile,
  ...rest
}) => {
  const classes = classNames('euiTableRowCell euiTableFooterCell', className, {
    'euiTableRowCell--isMobileHeader': isMobileHeader,
    'euiTableRowCell--hideForMobile': hideForMobile,
  });

  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
  });

  return (
    <td
      className={classes}
      colSpan={colSpan}
      scope={scope}
      {...rest}
    >
      <div className={contentClasses}>
        <span className="euiTableCellContent__text">{children}</span>
      </div>
    </td>
  );
};

EuiTableFooterCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(ALIGNMENT),
  colSpan: PropTypes.number,
  scope: PropTypes.oneOf(['col', 'row', 'colgroup', 'rowgroup']),
  /**
   * Indicates if the column was created to be the row's heading in mobile view
   * (this column will be hidden at larger screens)
   */
  isMobileHeader: PropTypes.bool,
  /**
   * Indicates if the column should not show for mobile users
   * (typically hidden because a custom mobile header utilizes the column's contents)
   */
  hideForMobile: PropTypes.bool,
};

EuiTableFooterCell.defaultProps = {
  align: LEFT_ALIGNMENT,
  scope: 'col',
};
