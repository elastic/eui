import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiStepHorizontal = ({
  isSelected,
  onClick,
  children,
  className,
  disabled,
  ...rest
}) => {
  const classes = classNames('euiTab', className, {
    'EuiStepHorizontal-isSelected': isSelected,
    'EuiStepHorizontal-isDisabled': disabled,
  });

  return (
    <button
      role="tab"
      aria-selected={!!isSelected}
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <span className="EuiStepHorizontal__content">
        {children}
      </span>
    </button>
  );
};

EuiStepHorizontal.defaultProps = {
  isSelected: false,
  disabled: false,
};

EuiStepHorizontal.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
