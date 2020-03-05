import React, {
  FunctionComponent,
  HTMLAttributes,
  ProgressHTMLAttributes,
  MeterHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
import { isNil } from '../../services/predicate';

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
  /** Describe the type of element to render */
  Element?: 'progress' | 'meter';
};

type Indeterminate = EuiProgressProps & HTMLAttributes<HTMLDivElement>;

type Determinate = EuiProgressProps &
  MeterHTMLAttributes<HTMLProgressElement> &
  ProgressHTMLAttributes<HTMLProgressElement> & {
    max: number;
  };

export const EuiProgress: FunctionComponent<
  ExclusiveUnion<Determinate, Indeterminate>
> = ({
  className,
  color = 'secondary',
  size = 'm',
  position = 'static',
  max,
  Element = 'progress',
  value,
  ...rest
}) => {
  const determinate = !isNil(max);
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
  if (determinate) {
    return (
      <Element
        className={classes}
        max={max}
        value={value}
        {...rest as
          | ProgressHTMLAttributes<HTMLProgressElement>
          | MeterHTMLAttributes<HTMLProgressElement>}
      />
    );
  } else {
    return (
      <div className={classes} {...rest as HTMLAttributes<HTMLDivElement>} />
    );
  }
};
