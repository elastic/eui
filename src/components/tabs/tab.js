import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTab = ({
  isSelected,
  onClick,
  children,
  className,
  disabled,
  ...rest
}) => {
  const classes = classNames('euiTab', className, {
    'euiTab-isSelected': isSelected,
    'euiTab-isDisabled': disabled,
  });

  return (
    <button
      role="tab"
      aria-selected={!!isSelected}
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      <span className="euiTab__content">{children}</span>
    </button>
  );
};

EuiTab.defaultProps = {
  isSelected: false,
  disabled: false,
};

EuiTab.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
