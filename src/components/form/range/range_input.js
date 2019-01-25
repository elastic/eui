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
  ...rest
}) => {

  const maxWidthStyle = { maxWidth: `${Math.max(String(min).length, String(max).length) + 2}em` };

  return (
    <EuiFieldNumber
      name={name}
      className="euiRange__extraInput"
      min={Number(min)}
      max={Number(max)}
      step={step}
      value={Number(value)}
      disabled={disabled}
      compressed={compressed}
      onChange={onChange}
      style={maxWidthStyle}
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
  name: PropTypes.string
};
