import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFormHelpText = ({ children, className, ...rest }) => {
  const classes = classNames('euiFormHelpText', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFormHelpText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
