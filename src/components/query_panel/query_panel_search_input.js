import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiQueryPanelSearchInput = ({
  className,
  ...rest,
}) => {
  const classes = classNames('euiQueryPanelSearchInput', className);

  return (
    <input
      type="search"
      className={classes}
      {...rest}
    />
  );
};

EuiQueryPanelSearchInput.propTypes = {
  className: PropTypes.string,
};
