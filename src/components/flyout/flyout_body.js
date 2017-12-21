import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFlyoutBody = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiFlyoutBody', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFlyoutBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
