/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiIcon, IconPropType, IconColor, IconType } from '../icon';

const colorToClassNameMap = {
  primary: 'euiSuggestItem__type--primary',
  secondary: 'euiSuggestItem__type--secondary',
  warning: 'euiSuggestItem__type--warning',
  danger: 'euiSuggestItem__type--danger',
  dark: 'euiSuggestItem__type--dark',
};

export const COLORS = Object.keys(colorToClassNameMap);

export const EuiSuggestItem = ({
  className,
  label,
  type,
  expandLongLabel,
  description,
  ...rest
}) => {
  const classes = classNames('euiSuggestItem', className);

  let optionalColorClass = '';
  let optionalLabelClass = '';
  let optionalCustomStyles = undefined;

  if (COLORS.indexOf(type.color) > -1) {
    optionalColorClass = colorToClassNameMap[type.color];
  } else {
    optionalCustomStyles = { backgroundColor: type.color };
  }

  if (expandLongLabel) {
    if (label && label.length > 35) {
      optionalLabelClass = 'longLabel';
    }
  }

  return (
    <div className={classes} {...rest}>
      <span className={`euiSuggestItem__type ${optionalColorClass}`}>
        {optionalCustomStyles ? (
          <div style={optionalCustomStyles} className="customBackground" />
        ) : (
          undefined
        )}
        <EuiIcon color={type.color} type={type.icon} />
      </span>
      <span className={`euiSuggestItem__label ${optionalLabelClass}`}>
        {label}
      </span>
      <span className="euiSuggestItem__description">{description}</span>
    </div>
  );
};

EuiSuggestItem.propTypes = {
  className: PropTypes.string,
  /**
   * Takes 'icon' for EuiIcon and 'color'. 'color' can be either our palette colors (primary, secondary, etc) or a hex value.
   */
  type: PropTypes.object,
  /**
   * Label for suggestion
   */
  label: PropTypes.string,
  /**
   * Description for suggestion
   */
  description: PropTypes.string,

  expandLongLabel: PropTypes.bool,
};

EuiSuggestItem.defaultProps = {
  expandLongLabel: false,
};
