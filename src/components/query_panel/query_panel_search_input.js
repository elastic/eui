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
      placeholder="status:[400 TO 499] AND extension:PHP"
      {...rest}
    />
  );
};

EuiQueryPanelSearchInput.propTypes = {
  className: PropTypes.string,
};
