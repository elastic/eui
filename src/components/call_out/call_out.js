import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import {
  IconPropType,
  EuiIcon,
} from '../icon';

import {
  EuiText,
} from '../text';

const colorToClassNameMap = {
  primary: 'euiCallOut--primary',
  success: 'euiCallOut--success',
  warning: 'euiCallOut--warning',
  danger: 'euiCallOut--danger',
};

export const COLORS = Object.keys(colorToClassNameMap);

const sizeToClassNameMap = {
  s: 'euiCallOut--small',
  m: '',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiCallOut = ({
  title,
  color,
  size,
  iconType,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiCallOut',
    colorToClassNameMap[color],
    sizeToClassNameMap[size],
    className,
  );

  let headerIcon;

  if (iconType) {
    headerIcon = (
      <EuiIcon
        className="euiCallOutHeader__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  let optionalChildren;
  if (children && size === 's') {
    optionalChildren = (
      <EuiText size="xs">
        {children}
      </EuiText>
    );
  } else if (children) {
    optionalChildren = (
      <EuiText size="s">
        {children}
      </EuiText>
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      <div className="euiCallOutHeader">
        {headerIcon}

        <span className="euiCallOutHeader__title">
          {title}
        </span>
      </div>

      {optionalChildren}
    </div>
  );
};

EuiCallOut.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node,
  iconType: IconPropType,
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(SIZES),
};

EuiCallOut.defaultProps = {
  color: 'primary',
  size: 'm',
};
