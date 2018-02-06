import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFilterGroup = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiFilterGroup', className);

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
};
