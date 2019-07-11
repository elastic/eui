import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiIcon, IconPropType } from '../icon';

const colorToClassNameMap = {
  itemTint01: 'euiSuggestItem__type--itemTint01',
  itemTint02: 'euiSuggestItem__type--itemTint02',
  itemTint03: 'euiSuggestItem__type--itemTint03',
  itemTint04: 'euiSuggestItem__type--itemTint04',
  itemTint05: 'euiSuggestItem__type--itemTint05',
  itemTint06: 'euiSuggestItem__type--itemTint06',
  itemTint07: 'euiSuggestItem__type--itemTint07',
};

export const COLORS = Object.keys(colorToClassNameMap);

const labelDisplayToClassMap = {
  fixed: 'euiSuggestItem__labelDisplay--fixed',
  expand: 'euiSuggestItem__labelDisplay--expand',
};

export const DISPLAYS = Object.keys(labelDisplayToClassMap);

export const EuiSuggestItem = ({
  className,
  label,
  type,
  labelDisplay,
  description,
  ...rest
}) => {
  const classes = classNames('euiSuggestItem', className);

  let optionalColorClass = '';
  let labelDisplayClass = labelDisplayToClassMap[labelDisplay];

  if (!description) {
    labelDisplayClass = 'euiSuggestItem__labelDisplay--expand';
  }

  if (type && type.color) {
    if (COLORS.indexOf(type.color) > -1) {
      optionalColorClass = colorToClassNameMap[type.color];
    }
  }

  return (
    <div className={classes} {...rest}>
      <span className={`euiSuggestItem__type ${optionalColorClass}`}>
        <EuiIcon type={type.iconType} />
      </span>
      <span className={`euiSuggestItem__label ${labelDisplayClass}`}>
        {label}
      </span>
      <span className="euiSuggestItem__description">{description}</span>
    </div>
  );
};

EuiSuggestItem.propTypes = {
  className: PropTypes.string,
  /**
   * Takes 'iconType' for EuiIcon and 'color'. 'color' can be itemTint01 through itemTint07.
   */
  type: PropTypes.shape({
    iconType: IconPropType,
    color: PropTypes.oneOfType([PropTypes.oneOf(COLORS), PropTypes.string]),
  }).isRequired,
  /**
   * Label for suggest item
   */
  label: PropTypes.string,
  /**
   * Description for suggest item
   */
  description: PropTypes.string,
  /**
   * Label display for suggest item
   */
  labelDisplay: PropTypes.oneOf(DISPLAYS),
};

EuiSuggestItem.defaultProps = {
  labelDisplay: 'fixed',
};
