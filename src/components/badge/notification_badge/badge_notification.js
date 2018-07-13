import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiNotificationBadge = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiNotificationBadge', className);

  return (
    <span
      className={classes}
      {...rest}
    >
      {children}
    </span>
  );
};

EuiNotificationBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
