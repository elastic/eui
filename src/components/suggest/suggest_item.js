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
  onClick,
  ...rest
}) => {
  const classes = classNames(
    'euiSuggestItem',
    {
      'euiSuggestItem-isClickable': onClick,
    },
    className
  );

  let colorClass = '';

  const labelDisplayClass = classNames(
    'euiSuggestItem__label',
    labelDisplayToClassMap[labelDisplay],
    {
      'euiSuggestItem__labelDisplay--expand': !description,
    }
  );

  if (type && type.color) {
    if (COLORS.indexOf(type.color) > -1) {
      colorClass = colorToClassNameMap[type.color];
    }
  }

  let OuterElement = 'div';
  if (onClick) {
    OuterElement = 'button';
  }

  return (
    <OuterElement onClick={onClick} className={classes} {...rest}>
      <span className={`euiSuggestItem__type ${colorClass}`}>
        <EuiIcon type={type.iconType} />
      </span>
      <span className={labelDisplayClass}>{label}</span>
      <span className="euiSuggestItem__description">{description}</span>
    </OuterElement>
  );
};

EuiSuggestItem.propTypes = {
  className: PropTypes.string,
  /**
   * Takes 'iconType' for EuiIcon and 'color'. 'color' can be tint1 through tint9.
   */
  type: PropTypes.shape({
    iconType: IconPropType.isRequired,
    color: PropTypes.oneOfType([PropTypes.oneOf(COLORS), PropTypes.string])
      .isRequired,
  }).isRequired,
  /**
   * Label or primary text.
   */
  label: PropTypes.string.isRequired,
  /**
   * Description or secondary text (optional).
   */
  description: PropTypes.string,
  /**
   * Label display is 'fixed' by default. Label will increase its width beyond 50% if needed with 'expand'.
   */
  labelDisplay: PropTypes.oneOf(DISPLAYS),
  /**
   * Handler for click on a suggestItem.
   */
  onClick: PropTypes.func,
};

EuiSuggestItem.defaultProps = {
  labelDisplay: 'fixed',
};
