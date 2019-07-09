import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiIcon, IconPropType } from '../icon';

const colorToClassNameMap = {
  primary: { class: 'euiSuggestItem__type--primary', colorName: 'primary' },
  secondary: {
    class: 'euiSuggestItem__type--secondary',
    colorName: 'secondary',
  },
  warning: { class: 'euiSuggestItem__type--warning', colorName: 'warning' },
  danger: { class: 'euiSuggestItem__type--danger', colorName: 'danger' },
  text: { class: 'euiSuggestItem__type--text', colorName: 'text' },
  accent: { class: 'euiSuggestItem__type--accent', colorName: 'accent' },
  vis3: { class: 'euiSuggestItem__type--vis3', colorName: '#490092' },
};

export const COLORS = Object.keys(colorToClassNameMap);

const layoutToClassNameMap = {
  setColumns: 'euiSuggestItem__layout--set',
  inline: 'euiSuggestItem__layout--inline',
};

export const LAYOUTS = Object.keys(layoutToClassNameMap);

export const EuiSuggestItem = ({
  className,
  label,
  type,
  layout,
  description,
  ...rest
}) => {
  const classes = classNames('euiSuggestItem', className);

  let optionalColorClass = '';
  const layoutClass = layoutToClassNameMap[layout];
  // let optionalCustomStyles = undefined;

  if (type && type.color) {
    if (COLORS.indexOf(type.color) > -1) {
      optionalColorClass = colorToClassNameMap[type.color].class;
    }
    // } else {
    //   optionalCustomStyles = { backgroundColor: type.color };
    // }
  }

  let colorName;
  colorName = colorToClassNameMap[type.color].colorName;

  return (
    <div className={classes} {...rest}>
      <span className={`euiSuggestItem__type ${optionalColorClass}`}>
        <EuiIcon color={colorName} type={type.icon} />
      </span>
      <span className={`euiSuggestItem__label ${layoutClass}`}>{label}</span>
      <span className="euiSuggestItem__description">{description}</span>
    </div>
  );
};

EuiSuggestItem.propTypes = {
  className: PropTypes.string,
  /**
   * Takes 'icon' for EuiIcon and 'color'. 'color' can be either our palette colors (primary, secondary, etc) or a hex value.
   */
  type: PropTypes.shape({
    icon: IconPropType,
    color: PropTypes.oneOfType([PropTypes.oneOf(COLORS), PropTypes.string]),
  }).isRequired,
  /**
   * Label for suggestion
   */
  label: PropTypes.string,
  /**
   * Description for suggestion
   */
  description: PropTypes.string,
  /**
   * Layout for suggest item
   */
  layout: PropTypes.oneOf(LAYOUTS),
};

EuiSuggestItem.defaultProps = {
  layout: 'setColumns',
};
