import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTableHeaderCellCheckbox = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiTableHeaderCellCheckbox', className);

  return (
    <th className={classes} {...rest}>
      <div className="euiTableCellContent">{children}</div>
    </th>
  );
};

EuiTableHeaderCellCheckbox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  scope: PropTypes.oneOf(['col', 'row', 'colgroup', 'rowgroup']),
};

EuiTableHeaderCellCheckbox.defaultProps = {
  scope: 'col',
};
