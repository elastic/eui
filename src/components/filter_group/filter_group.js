import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFilterGroup = ({
  children,
  className,
  fullWidth,
  ...rest,
}) => {
  const classes = classNames('euiFilterGroup', {
    'euiFilterGroup--fullWidth': fullWidth,
  }, className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFilterGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
};

EuiFilterGroup.defaultProps = {
  fullWidth: false,
};
