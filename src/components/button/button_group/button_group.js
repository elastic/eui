import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonToggle } from '../button_toggle';

export const EuiButtonGroup = ({
  options,
  idSelected,
  onChange,
  name,
  className,
  disabled,
  color,
  ...rest
}) => {

  const classes = classNames(
    'euiButtonGroup',
    className,
  );

  return (
    <div className={classes} {...rest}>
      {options.map((option, index) => {
        return (
          <EuiButtonToggle
            className="euiButtonGroup__item"
            key={index}
            id={option.id}
            name={name}
            isSelected={option.id === idSelected}
            label={option.label}
            isDisabled={disabled}
            onChange={onChange.bind(null, option.id, option.label)}
            color={color}
          />
        );
      })}
    </div>
  )
};

EuiButtonGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }),
  ).isRequired,
  idSelected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

EuiButtonGroup.defaultProps = {
  options: [],
};
