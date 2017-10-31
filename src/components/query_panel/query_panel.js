import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiQueryPanel = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiQueryPanel', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiQueryPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
