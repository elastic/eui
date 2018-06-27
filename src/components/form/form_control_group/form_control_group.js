import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFormControlGroup = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiFormControlGroup', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFormControlGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
