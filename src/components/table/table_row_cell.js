import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
} from '../../services';

const ALIGNMENT = [
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
];

export const EuiTableRowCell = ({
  align,
  children,
  className,
  wrapText,
  textOnly,
  ...rest,
}) => {
  const classes = classNames('euiTableRowCell', className);

  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--wrapText': wrapText,
  });

  return (
    <td className={classes} {...rest} >
      <div className={contentClasses}>
        {
          textOnly === true
            ? <span className="euiTableCellContent__text">{children}</span>
            : children
        }
      </div>
    </td>
  );
};

EuiTableRowCell.propTypes = {
  align: PropTypes.oneOf(ALIGNMENT),
  wrapText: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

EuiTableRowCell.defaultProps = {
  align: LEFT_ALIGNMENT,
  textOnly: true
};
