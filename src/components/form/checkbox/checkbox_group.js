import React from 'react';
import PropTypes from 'prop-types';

import { EuiCheckbox } from './checkbox';

export const EuiCheckboxGroup = ({
  options,
  idToSelectedMap,
  onChange,
  className,
  disabled,
  compressed,
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
          compressed={compressed}
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
    })
  ).isRequired,
  idToSelectedMap: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
  /**
   * Tightens up the spacing between checkbox rows and sends down the
   * compressed prop to the checkbox itself
   */
  compressed: PropTypes.bool,
};

EuiCheckboxGroup.defaultProps = {
  options: [],
  idToSelectedMap: {},
};
