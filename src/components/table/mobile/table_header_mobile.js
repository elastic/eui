import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTableHeaderMobile = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiTableHeaderMobile', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiTableHeaderMobile.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
