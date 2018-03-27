import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageHeader = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageHeader', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiPageHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
