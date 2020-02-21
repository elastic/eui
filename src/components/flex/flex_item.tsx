import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type FlexItemGrowShrinkSize =
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
  /**
   * Set to a `number` to match the CSS property of `flex-grow`,
   * or `true` for `1` and `false`/`null` for `0`.
   */
  grow?: FlexItemGrowShrinkSize;
  /**
   * Set to a `number` to match the CSS property of `flex-shrink`,
   * or `true` for `1` and `false`/`null` for `0`.
   */
  shrink?: FlexItemGrowShrinkSize;
  component?: keyof JSX.IntrinsicElements;
}

export const GROW_SHRINK_SIZES: FlexItemGrowShrinkSize[] = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];

export const EuiFlexItem: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    EuiFlexItemProps
> = ({
  children,
  className,
  grow = true,
  shrink = true,
  component: Component = 'div',
  ...rest
}) => {
  validateGrowValue(grow);

  const classes = classNames(
    'euiFlexItem',
    {
      'euiFlexItem--flexGrowZero': !grow,
      [`euiFlexItem--flexGrow${grow}`]:
        typeof grow === 'number'
          ? GROW_SHRINK_SIZES.indexOf(grow) >= 0
          : undefined,
      'euiFlexItem--flexShrinkZero': !shrink,
      [`euiFlexItem--flexShrink${grow}`]:
        typeof shrink === 'number'
          ? GROW_SHRINK_SIZES.indexOf(shrink) >= 0
          : undefined,
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
  const validValues = [null, undefined, true, false, ...GROW_SHRINK_SIZES];

  if (validValues.indexOf(value) === -1) {
    throw new Error(
      `Prop \`grow\` passed to \`EuiFlexItem\` must be a boolean or an integer between 1 and 10, received \`${value}\``
    );
  }
}
