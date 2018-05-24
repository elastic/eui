import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonToggle } from '../button_toggle';
import { TOGGLE_TYPES } from '../../toggle';

export const EuiButtonGroup = ({
  options,
  idSelected,
  onChange,
  name,
  className,
  isDisabled,
  color,
  isFullWidth,
  idToSelectedMap,
  type,
  ...rest
}) => {

  const classes = classNames(
    'euiButtonGroup',
    {
      'euiButtonGroup--fullWidth': isFullWidth,
    },
    className,
  );

  return (
    <div className={classes} {...rest}>
      {options.map((option, index) => {

        let isSelectedState;
        if (type === 'multi') {
          isSelectedState = idToSelectedMap[option.id];
        } else {
          isSelectedState = option.id === idSelected;
        }

        return (
          <EuiButtonToggle
            className="euiButtonGroup__item"
            key={index}
            id={option.id}
            isSelected={isSelectedState}
            name={name}
            label={option.label}
            value={option.value}
            isDisabled={isDisabled}
            onChange={onChange.bind(null, option.id, option.value)}
            color={color}
            type={type}
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
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  color: PropTypes.string,
  type: PropTypes.oneOf(TOGGLE_TYPES),
  idSelected: PropTypes.string,
  idToSelectedMap: PropTypes.objectOf(PropTypes.bool),
};

EuiButtonGroup.defaultProps = {
  options: [],
  idToSelectedMap: {},
  color: 'text',
  type: 'single',
};
