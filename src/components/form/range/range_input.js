import React from 'react';
// import PropTypes from 'prop-types';

import { EuiFieldNumber } from '../field_number';

export const EuiRangeInput = props => {
  const {
    min,
    max,
    step,
    value,
    disabled,
    compressed,
    onChange,
    name,
    ...rest
  } = props;

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
