import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFilterSelect = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiFilterSelect', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFilterSelect.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
