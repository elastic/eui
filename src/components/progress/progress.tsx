import React, {
  FunctionComponent,
  HTMLAttributes,
  ProgressHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
// import { isNil } from '../../services/predicate';

const sizeToClassNameMap = {
  xs: 'euiProgress--xs',
  s: 'euiProgress--s',
  m: 'euiProgress--m',
  l: 'euiProgress--l',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export type EuiProgressSize = keyof typeof sizeToClassNameMap;

const colorToClassNameMap = {
  primary: 'euiProgress--primary',
  secondary: 'euiProgress--secondary',
  danger: 'euiProgress--danger',
  subdued: 'euiProgress--subdued',
  accent: 'euiProgress--accent',
};

export const COLORS = Object.keys(colorToClassNameMap);

export type EuiProgressColor = keyof typeof colorToClassNameMap;

const positionsToClassNameMap = {
  fixed: 'euiProgress--fixed',
  absolute: 'euiProgress--absolute',
  static: '',
};

export const POSITIONS = Object.keys(positionsToClassNameMap);

export type EuiProgressPosition = keyof typeof positionsToClassNameMap;

export type EuiProgressProps = CommonProps & {
  size?: EuiProgressSize;
  color?: EuiProgressColor;
  position?: EuiProgressPosition;
};

type Indeterminate = EuiProgressProps & HTMLAttributes<HTMLDivElement>;

type Determinate = EuiProgressProps &
  ProgressHTMLAttributes<HTMLProgressElement>;

function isProgressBar(
  props: ExclusiveUnion<Determinate, Indeterminate>
): props is Determinate {
  return props.hasOwnProperty('max');
}
export const EuiProgress: FunctionComponent<
  ExclusiveUnion<Determinate, Indeterminate>
> = ({
  className,
  color = 'secondary',
  size = 'm',
  position = 'static',
  max,
  value,
  ...rest
}) => {
  const determinate = isProgressBar({ max });
  const classes = classNames(
    'euiProgress',
    {
      'euiProgress--indeterminate': !determinate,
      'euiProgress--native': determinate,
    },
    sizeToClassNameMap[size],
    colorToClassNameMap[color],
    positionsToClassNameMap[position],
    className
  );

  // Because of a Firefox animation issue, indeterminate progress needs to not use <progress />.
  // See https://css-tricks.com/html5-progress-element/
  if (isProgressBar({ max })) {
    return <progress className={classes} max={max} value={value} {...rest} />;
  } else {
    return <div className={classes} {...rest} />;
  }
};
