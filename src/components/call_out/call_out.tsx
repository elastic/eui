import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { IconType, EuiIcon } from '../icon';

import { EuiText } from '../text';

type Color = 'primary' | 'success' | 'warning' | 'danger';
type Size = 's' | 'm';
type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type EuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    title?: ReactNode;
    iconType?: IconType;
    color?: Color;
    size?: Size;
    heading?: Heading;
  };

const colorToClassNameMap: { [color in Color]: string } = {
  primary: 'euiCallOut--primary',
  success: 'euiCallOut--success',
  warning: 'euiCallOut--warning',
  danger: 'euiCallOut--danger',
};

export const COLORS = keysOf(colorToClassNameMap);
export const HEADINGS: Heading[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

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
  heading,
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

  const H: any = heading ? `${heading}` : 'span';

  return (
    <div className={classes} {...rest}>
      <div className="euiCallOutHeader">
        {headerIcon}

        <H className="euiCallOutHeader__title">{title}</H>
      </div>

      {optionalChildren}
    </div>
  );
};
