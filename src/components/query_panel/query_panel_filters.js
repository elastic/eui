import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiQueryPanelFilters = ({
  children,
  className,
  animateIn,
  ...rest,
}) => {
  const classes = classNames(
    'euiQueryPanelFilters',
    {
      'euiQueryPanelFilters--animateIn': animateIn,
    },
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

EuiQueryPanelFilters.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  animateIn: PropTypes.bool,
};

EuiQueryPanelFilters.defaultProps = {
  animateIn: false,
};
