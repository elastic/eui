import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFormLabel } from '../form_label';

export const EuiRange = ({
  className,
  compressed,
  disabled,
  fullWidth,
  id,
  max,
  min,
  name,
  showLabels,
  value,
  ...rest
}) => {
  const classes = classNames(
    'euiRange',
    {
      'euiRange--fullWidth': fullWidth,
      'euiRange--compressed': compressed,
    },
    className
  );

  const wrapperClasses = classNames(
    'euiRange__wrapper',
    {
      'euiRange__wrapper--fullWidth': fullWidth,
      'euiRange__wrapper--compressed': compressed,
      'euiRange__wrapper--disabled': disabled,
    },
  );

  let minLabelNode;
  let maxLabelNode;
  if (showLabels) {
    minLabelNode = (
      <EuiFormLabel className="euiRange__minLabel">
        {min}
      </EuiFormLabel>
    );

    maxLabelNode = (
      <EuiFormLabel className="euiRange__maxLabel">
        {max}
      </EuiFormLabel>
    );
  }

  return (
    <div
      className={wrapperClasses}
    >
      {minLabelNode}
      <input
        type="range"
        id={id}
        name={name}
        className={classes}
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        {...rest}
      />
      {maxLabelNode}
    </div>
  );
};

EuiRange.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  compressed: PropTypes.bool,
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels: PropTypes.bool,
};

EuiRange.defaultProps = {
  min: 1,
  max: 100,
  fullWidth: false,
  compressed: false,
  showLabels: false,
};
