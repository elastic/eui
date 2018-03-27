import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFlyoutHeader = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiFlyoutHeader', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFlyoutHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
