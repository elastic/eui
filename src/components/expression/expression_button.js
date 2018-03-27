import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiExpressionButton = ({
  className,
  description,
  buttonValue,
  isActive,
  onClick,
  ...rest
}) => {
  const classes = classNames('euiExpressionButton', className, {
    'euiExpressionButton-isActive': isActive
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      {...rest}
    >
      <span className="euiExpressionButton__description">{description}</span>{' '}
      <span className="euiExpressionButton__value">{buttonValue}</span>
    </button>
  );
};

EuiExpressionButton.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  buttonValue: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

EuiExpressionButton.defaultProps = {
  isActive: false,
};
