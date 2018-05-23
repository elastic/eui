import React from 'react';
import PropTypes from 'prop-types';

import { EuiButtonToggle } from '../button_toggle';

const colorToClassNameMap = {
  default: '',
  primary: 'euiButtonToggle--primary',
  ghost: 'euiButtonToggle--ghost',
};

export const COLORS = Object.keys(colorToClassNameMap);

export const EuiButtonGroup = ({
  options,
  idSelected,
  onChange,
  name,
  className,
  disabled,
  color,
  ...rest
}) => (
  <div className={className} {...rest}>
    {options.map((option, index) => {
      return (
        <EuiButtonToggle
          className="euiButtonGroup__item"
          key={index}
          id={option.id}
          name={name}
          selected={option.id === idSelected}
          label={option.label}
          isDisabled={disabled}
          onChange={onChange.bind(null, option.id, option.label)}
          color={color}
        >
          {option.content}
        </EuiButtonToggle>
      );
    })}
  </div>
);

EuiButtonGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      content: PropTypes.node,
    }),
  ).isRequired,
  idSelected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.oneOf(COLORS),
};

EuiButtonGroup.defaultProps = {
  options: [],
};
