import React from 'react';
import PropTypes from 'prop-types';

import { EuiRadio } from './radio';

export const EuiRadioGroup = ({
  options,
  idSelected,
  onChange,
  name,
  className,
  disabled,
  compressed,
  ...rest
}) => (
  <div className={className} {...rest}>
    {options.map((option, index) => {
      const { disabled: isOptionDisabled, ...optionRest } = option;
      return (
        <EuiRadio
          className="euiRadioGroup__item"
          key={index}
          name={name}
          checked={option.id === idSelected}
          disabled={disabled || isOptionDisabled}
          onChange={onChange.bind(null, option.id, option.value)}
          compressed={compressed}
          {...optionRest}
        />
      );
    })}
  </div>
);

EuiRadioGroup.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.node,
      value: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  idSelected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  /**
   * Tightens up the spacing between radio rows and sends down the
   * compressed prop to the radio itself
   */
  compressed: PropTypes.bool,
};

EuiRadioGroup.defaultProps = {
  options: [],
};
