import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const KuiHeaderSectionItemButton = ({ onClick, children, className, ...rest }) => {
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

KuiHeaderSectionItemButton.propTypes = {
  onClick: PropTypes.func,
};
