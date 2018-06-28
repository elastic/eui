import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFormControlLayoutIcons } from './form_control_layout_icons';
import { EuiFormControlLayoutChildren } from './form_control_layout_children';

export const ICON_SIDES = ['left', 'right'];
export const LABEL_SIDES = ['left', 'right'];

export const EuiFormControlLayout = ({
  children,
  icon,
  clear,
  fullWidth,
  isLoading,
  compressed,
  className,
  inlineLabel,
  ...rest
}) => {
  const classes = classNames(
    'euiFormControlLayout',
    {
      'euiFormControlLayout--fullWidth': fullWidth,
      'euiFormControlLayout--compressed': compressed,
      'euiFormControlLayout--hasLabel': inlineLabel,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      <EuiFormControlLayoutChildren
        children={children}
        inlineLabel={inlineLabel}
      />

      <EuiFormControlLayoutIcons
        icon={icon}
        clear={clear}
        isLoading={isLoading}
      />
    </div>
  );
};

EuiFormControlLayout.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      type: PropTypes.string,
      side: PropTypes.oneOf(ICON_SIDES),
      onClick: PropTypes.func,
    }),
  ]),
  clear: PropTypes.shape({
    onClick: PropTypes.func,
  }),
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  compressed: PropTypes.bool,
  /**
   * Creates an input group with an inline label
   */
  inlineLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      label: PropTypes.node,
      side: PropTypes.oneOf(LABEL_SIDES),
    }),
  ]),
};

EuiFormControlLayout.defaultProps = {
  isLoading: false,
  compressed: false,
};
