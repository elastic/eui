import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTable = ({
  children,
  className,
  compressed,
  responsive,
  ...rest
}) => {
  const classes = classNames('euiTable', className, {
    'euiTable--compressed': compressed,
    'euiTable--responsive': responsive,
  });

  return (
    <table className={classes} {...rest}>
      {children}
    </table>
  );
};

EuiTable.propTypes = {
  compressed: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  responsive: PropTypes.bool,
};

EuiTable.defaultProps = {
  responsive: true,
};
