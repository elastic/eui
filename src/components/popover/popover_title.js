import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPopoverTitle = ({ children, className, ...rest }) => {
  const classes = classNames('euiPopoverTitle', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiPopoverTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
