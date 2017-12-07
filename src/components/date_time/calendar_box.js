import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiCalendarBox = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiCalendarBox', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiCalendarBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
