import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';

const ALIGNMENT = [LEFT_ALIGNMENT, RIGHT_ALIGNMENT, CENTER_ALIGNMENT];

export const EuiTableFooterCell = ({
  children,
  align,
  colSpan,
  className,
  ...rest
}) => {
  const classes = classNames('euiTableFooterCell', className);
  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
  });

  return (
    <td className={classes} colSpan={colSpan} {...rest}>
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
};

EuiTableFooterCell.defaultProps = {
  align: LEFT_ALIGNMENT,
};
