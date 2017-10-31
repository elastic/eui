import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiQueryPanelBar = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiQueryPanelBar', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiQueryPanelBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
