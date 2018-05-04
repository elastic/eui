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
      return (
        <EuiRadio
          className="euiRadioGroup__item"
          key={index}
          id={option.id}
          name={name}
          checked={option.id === idSelected}
          label={option.label}
          value={option.value}
          disabled={disabled}
          onChange={onChange.bind(null, option.id, option.value)}
          compressed={compressed}
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
