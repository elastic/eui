import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFormControlLayoutIcons } from './form_control_layout_icons';

export const ICON_SIDES = ['left', 'right'];

export const EuiFormControlLayout = ({
  children,
  icon,
  clear,
  fullWidth,
  isLoading,
  compressed,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiFormControlLayout',
    {
      'euiFormControlLayout--fullWidth': fullWidth,
      'euiFormControlLayout--compressed': compressed,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}

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
};

EuiFormControlLayout.defaultProps = {
  isLoading: false,
  compressed: false,
};
