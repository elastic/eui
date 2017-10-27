import React from 'react';
import PropTypes from 'prop-types';

import { EuiCheckbox } from './checkbox';

export const EuiCheckboxGroup = ({
  options,
  idToSelectedMap,
  onChange,
  className,
  disabled,
  ...rest
}) => (
  <div className={className} {...rest}>
    {options.map((option, index) => {
      return (
        <EuiCheckbox
          className="euiCheckboxGroup__item"
          key={index}
          id={option.id}
          checked={idToSelectedMap[option.id]}
          label={option.label}
          disabled={disabled}
          onChange={onChange.bind(null, option.id)}
        />
      );
    })}
  </div>
);

EuiCheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.node,
    }),
  ).isRequired,
  idToSelectedMap: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
};

EuiCheckboxGroup.defaultProps = {
  options: [],
  idToSelectedMap: {},
};
