import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTab = ({ isSelected, onClick, children, className, ...rest }) => {
  const classes = classNames('kuiTab', className, {
    'kuiTab-isSelected': isSelected
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      {...rest}
    >
      <span className="kuiTab__content">
        {children}
      </span>
    </button>
  );
};

EuiTab.defaultProps = {
  isSelected: false,
};

EuiTab.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};
