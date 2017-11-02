import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTab = ({
  isSelected,
  onClick,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiTab', className, {
    'euiTab-isSelected': isSelected
  });

  return (
    <button
      role="tab"
      aria-selected={!!isSelected}
      type="button"
      className={classes}
      onClick={onClick}
      {...rest}
    >
      <span className="euiTab__content">
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
