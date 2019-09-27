import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';

import { CommonProps, Omit, keysOf } from '../common';
import { IconType, EuiIcon } from '../icon';

import { EuiText } from '../text';

type Color = 'primary' | 'success' | 'warning' | 'danger';
type Size = 's' | 'm';

export type EuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    title?: ReactNode;
    iconType?: IconType;
    color?: Color;
    size?: Size;
  };

const colorToClassNameMap: { [color in Color]: string } = {
  primary: 'euiCallOut--primary',
  success: 'euiCallOut--success',
  warning: 'euiCallOut--warning',
  danger: 'euiCallOut--danger',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap: { [size in Size]: string } = {
  s: 'euiCallOut--small',
  m: '',
};

export const EuiCallOut: FunctionComponent<EuiCallOutProps> = ({
  title,
  color = 'primary',
  size = 'm',
  iconType,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiCallOut',
    colorToClassNameMap[color],
    sizeToClassNameMap[size],
    className
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
    optionalChildren = <EuiText size="xs">{children}</EuiText>;
  } else if (children) {
    optionalChildren = <EuiText size="s">{children}</EuiText>;
  }

  return (
    <div className={classes} {...rest}>
      <div className="euiCallOutHeader">
        {headerIcon}

        <span className="euiCallOutHeader__title">{title}</span>
      </div>

      {optionalChildren}
    </div>
  );
};
