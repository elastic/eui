import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiCode = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiCode', className);

  return (
    <code
      className={classes}
      {...rest}
    >
      {children}
    </code>
  );
};

EuiCode.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
