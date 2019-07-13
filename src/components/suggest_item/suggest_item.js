import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiIcon, IconPropType } from '../icon';

const colorToClassNameMap = {
  tint0: 'euiSuggestItem__type--tint0',
  tint1: 'euiSuggestItem__type--tint1',
  tint2: 'euiSuggestItem__type--tint2',
  tint3: 'euiSuggestItem__type--tint3',
  tint4: 'euiSuggestItem__type--tint4',
  tint5: 'euiSuggestItem__type--tint5',
  tint6: 'euiSuggestItem__type--tint6',
  tint7: 'euiSuggestItem__type--tint7',
  tint8: 'euiSuggestItem__type--tint8',
  tint9: 'euiSuggestItem__type--tint9',
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
   * Takes 'iconType' for EuiIcon and 'color'. 'color' can be tint1 through tint9.
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
