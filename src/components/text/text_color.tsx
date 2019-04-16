import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const colorsToClassNameMap = {
  default: 'euiTextColor--default',
  subdued: 'euiTextColor--subdued',
  secondary: 'euiTextColor--secondary',
  accent: 'euiTextColor--accent',
  danger: 'euiTextColor--danger',
  warning: 'euiTextColor--warning',
  ghost: 'euiTextColor--ghost',
};

export type TextColor = keyof typeof colorsToClassNameMap;

export const COLORS = keysOf(colorsToClassNameMap);

type Props = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLSpanElement> & {
    color?: TextColor;
    /**
     * Determines the root element
     */
    component?: 'div' | 'span';
  };

export const EuiTextColor: FunctionComponent<Props> = ({
  children,
  color = 'default',
  className,
  component: Component = 'span',
  ...rest
}) => {
  const classes = classNames(
    'euiTextColor',
    colorsToClassNameMap[color],
    className
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};
