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
  isIconOnly,
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
            toggleClassName="euiButtonGroup__toggle"
            className="euiButtonGroup__button"
            key={index}
            id={option.id}
            isSelected={isSelectedState}
            fill={isSelectedState}
            name={name}
            label={option.label}
            value={option.value}
            iconType={option.iconType}
            iconSide={option.iconSide}
            isDisabled={isDisabled}
            onChange={onChange.bind(null, option.id, option.value)}
            color={color}
            type={type}
            isIconOnly={isIconOnly}
            size="s" // force small for button groups
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
