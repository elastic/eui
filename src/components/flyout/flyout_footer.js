import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFlyoutFooter = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiFlyoutFooter', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFlyoutFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
