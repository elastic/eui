import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageContentHeader = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageContentHeader', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiPageContentHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
