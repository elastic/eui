import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type FlexItemGrowSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | true
  | false
  | null;

export interface EuiFlexItemProps {
  grow?: FlexItemGrowSize;
  component?: keyof JSX.IntrinsicElements;
}

export const GROW_SIZES: FlexItemGrowSize[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const EuiFlexItem: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    EuiFlexItemProps
> = ({
  children,
  className,
  grow = true,
  component: Component = 'div',
  ...rest
}) => {
  validateGrowValue(grow);

  const classes = classNames(
    'euiFlexItem',
    {
      'euiFlexItem--flexGrowZero': !grow,
      [`euiFlexItem--flexGrow${grow}`]:
        typeof grow === 'number' ? GROW_SIZES.indexOf(grow) >= 0 : undefined,
    },
    className
  );

  return (
    // @ts-ignore
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

function validateGrowValue(value: EuiFlexItemProps['grow']) {
  const validValues = [null, undefined, true, false, ...GROW_SIZES];

  if (validValues.indexOf(value) === -1) {
    throw new Error(
      `Prop \`grow\` passed to \`EuiFlexItem\` must be a boolean or an integer between 1 and 10, received \`${value}\``
    );
  }
}
