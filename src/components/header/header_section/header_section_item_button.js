import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiHeaderSectionItemButton = ({ onClick, children, className, ...rest }) => {
  const classes = classNames('kuiHeaderSectionItem__button', className);

  return (
    <button
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

EuiHeaderSectionItemButton.propTypes = {
  onClick: PropTypes.func,
};
