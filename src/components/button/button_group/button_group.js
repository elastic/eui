import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonToggle } from '../button_toggle';
import { TOGGLE_TYPES } from '../../toggle';

export const EuiButtonGroup = ({
  className,
  color,
  idSelected,
  idToSelectedMap,
  isDisabled,
  isFullWidth,
  isIconOnly,
  name,
  onChange,
  options,
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
          isSelectedState = idToSelectedMap[option.id] || false;
        } else {
          isSelectedState = option.id === idSelected;
        }

        return (
          <EuiButtonToggle
            className="euiButtonGroup__button"
            color={color}
            fill={isSelectedState}
            iconSide={option.iconSide}
            iconType={option.iconType}
            id={option.id}
            isDisabled={isDisabled}
            isIconOnly={isIconOnly}
            isSelected={isSelectedState}
            key={index}
            label={option.label}
            name={name}
            onChange={onChange.bind(null, option.id, option.value)}
            size="s" // force small for button groups
            toggleClassName="euiButtonGroup__toggle"
            type={type}
            value={option.value}
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

  /**
   * See `EuiButton`
   */
  color: PropTypes.string,

  /**
   * Hides the label from the button content and only displays the icon
   */
  isIconOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,

  /**
   * Makes the whole group 100% of it's parent
   */
  isFullWidth: PropTypes.bool,

  /**
   * Can only a "single" option be selected or "multi"ple?
   */
  type: PropTypes.oneOf(TOGGLE_TYPES),

  /**
   * Id of selected option for `type="single"`
   */
  idSelected: PropTypes.string,

  /**
   * Map of ids of selected options for `type="multi"`
   */
  idToSelectedMap: PropTypes.objectOf(PropTypes.bool),
};

EuiButtonGroup.defaultProps = {
  options: [],
  idToSelectedMap: {},
  color: 'text',
  type: 'single',
};
