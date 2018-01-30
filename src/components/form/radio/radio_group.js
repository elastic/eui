import React from 'react';
import PropTypes from 'prop-types';

import { EuiRadio } from './radio';

export const EuiRadioGroup = ({
  options,
  idSelected,
  onChange,
  className,
  disabled,
  ...rest
}) => (
  <div className={className} {...rest}>
    {options.map((option, index) => {
      return (
        <EuiRadio
          className="euiRadioGroup__item"
          key={index}
          id={option.id}
          checked={option.id === idSelected}
          label={option.label}
          disabled={disabled}
          onChange={onChange.bind(null, option.id)}
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
    }),
  ).isRequired,
  idSelected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

EuiRadioGroup.defaultProps = {
  options: [],
};
