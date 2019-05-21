import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiButtonToggle } from '../button_toggle';
import { TOGGLE_TYPES } from '../../toggle';

export const EuiButtonGroup = ({
  className,
  buttonSize,
  color,
  idSelected,
  idToSelectedMap,
  isDisabled,
  isFullWidth,
  isIconOnly,
  name,
  legend,
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
    className
  );

  let legendNode;
  if (legend) {
    legendNode = (
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>
    );
  }

  return (
    <fieldset>
      {legendNode}

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
              isDisabled={isDisabled || option.isDisabled}
              isIconOnly={isIconOnly}
              isSelected={isSelectedState}
              key={index}
              label={option.label}
              name={option.name || name}
              onChange={() => onChange(option.id, option.value)}
              size={buttonSize}
              toggleClassName="euiButtonGroup__toggle"
              type={type}
              value={option.value}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

EuiButtonGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,

  /**
   * See `EuiButton`
   */
  color: PropTypes.string,

  /**
   * Most button groups should be the small button size,
   * but if you NEED to bump it to regular, change this to 'm'
   */
  buttonSize: PropTypes.string,

  /**
   * Hides the label from the button content and only displays the icon
   */
  isIconOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,

  /**
   * Makes the whole group 100% of its parent
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

  /**
   * Adds a hidden legend to the group for accessiblity
   */
  legend: PropTypes.string,
};

EuiButtonGroup.defaultProps = {
  buttonSize: 's',
  color: 'text',
  idToSelectedMap: {},
  options: [],
  type: 'single',
};
