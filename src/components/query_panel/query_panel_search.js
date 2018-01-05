import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiQueryPanelSearch = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames(
    'euiQueryPanelSearch',
    className
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiQueryPanelSearch.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  animateIn: PropTypes.bool,
};
