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
      const {
        id,
        label,
        value,
        disabled: isOptionDisabled,
        autoFocus,
        ...optionRest
      } = option;
      return (
        <EuiRadio
          className="euiRadioGroup__item"
          key={index}
          id={id}
          name={name}
          checked={id === idSelected}
          label={label}
          value={value}
          disabled={disabled || isOptionDisabled}
          onChange={onChange.bind(null, id, value)}
          compressed={compressed}
          autoFocus={autoFocus}
          {...optionRest}
        />
      );
    })}
  </div>
);

EuiRadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.node,
      value: PropTypes.string,
      disabled: PropTypes.bool,
      autoFocus: PropTypes.bool,
    }),
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
