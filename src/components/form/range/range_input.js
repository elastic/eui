import React from 'react';
import PropTypes from 'prop-types';

import { EuiFieldNumber } from '../field_number';

export const EuiRangeInput = ({
  min,
  max,
  step,
  value,
  disabled,
  compressed,
  onChange,
  name,
  side,
  digitTolerance,
  fullWidth,
  autoSize,
  ...rest
}) => {
  // Chrome will properly size the input based on the max value, but FF & IE do not.
  // Calculate the width of the input based on highest number of characters.
  // Add 2 to accomodate for input stepper
  const widthStyle = autoSize
    ? { width: `${digitTolerance / 1.25 + 2}em` }
    : undefined;

  return (
    <EuiFieldNumber
      name={name}
      className={`euiRangeInput euiRangeInput--${side}`}
      min={Number(min)}
      max={Number(max)}
      step={step}
      value={value === '' ? '' : Number(value)}
      disabled={disabled}
      compressed={compressed}
      onChange={onChange}
      style={widthStyle}
      fullWidth={fullWidth}
      {...rest}
    />
  );
};

EuiRangeInput.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  compressed: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  digitTolerance: PropTypes.number.isRequired,
  side: PropTypes.oneOf(['min', 'max']),
  fullWidth: PropTypes.bool,
  autoSize: PropTypes.bool,
  inputRef: PropTypes.func,
};
EuiRangeInput.defaultProps = {
  side: 'max',
  autoSize: true,
};
