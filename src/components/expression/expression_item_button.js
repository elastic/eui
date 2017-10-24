import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiExpressionItemButton = ({
  className,
  description,
  value,
  isActive,
  onClick,
  ...rest
}) => {
  const classes = classNames('euiExpressionItem__button', className, {
    'euiExpressionItem__button--isActive': isActive
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      {...rest}
    >
      <span className="euiExpressionItem__buttonDescription">{description}</span>{' '}
      <span className="euiExpression_buttonValue">{value}</span>
    </button>
  );
};

EuiExpressionItemButton.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
