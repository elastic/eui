import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiCalendarGrid = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiCalendarGrid', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiCalendarGrid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
