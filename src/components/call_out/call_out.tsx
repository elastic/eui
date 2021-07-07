/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, Ref, HTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { IconType, EuiIcon } from '../icon';

import { EuiText } from '../text';

type Color = 'primary' | 'success' | 'warning' | 'danger';
type Size = 's' | 'm';
type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type EuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> & {
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

export const EuiCallOut = forwardRef<HTMLDivElement, EuiCallOutProps>(
  (
    {
      title,
      color = 'primary',
      size = 'm',
      iconType,
      children,
      className,
      heading,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
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
          color="inherit" // forces the icon to inherit its parent color
        />
      );
    }

    let optionalChildren;
    if (children && size === 's') {
      optionalChildren = (
        <EuiText size="xs" color="default">
          {children}
        </EuiText>
      );
    } else if (children) {
      optionalChildren = (
        <EuiText size="s" color="default">
          {children}
        </EuiText>
      );
    }

    const H: any = heading ? `${heading}` : 'span';
    let header;

    if (title) {
      header = (
        <div className="euiCallOutHeader">
          {headerIcon}
          <H className="euiCallOutHeader__title">{title}</H>
        </div>
      );
    }
    return (
      <div className={classes} ref={ref} {...rest}>
        {header}

        {optionalChildren}
      </div>
    );
  }
);
EuiCallOut.displayName = 'EuiCallOut';
