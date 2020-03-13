import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

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

export type FlexItemAlignItems = keyof typeof alignItemsToClassNameMap;
export type FlexItemDirection = keyof typeof directionToClassNameMap;
export type FlexItemJustifyContent = keyof typeof justifyContentToClassNameMap;

export interface EuiFlexItemProps {
  grow?: FlexItemGrowSize;
  component?: keyof JSX.IntrinsicElements;
  alignItems?: FlexItemAlignItems;
  direction?: FlexItemDirection;
  justifyContent?: FlexItemJustifyContent;
}

export const GROW_SIZES: FlexItemGrowSize[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const alignItemsToClassNameMap = {
  stretch: null,
  flexStart: 'euiFlexItem--alignItemsFlexStart',
  flexEnd: 'euiFlexItem--alignItemsFlexEnd',
  center: 'euiFlexItem--alignItemsCenter',
  baseline: 'euiFlexItem--alignItemsBaseline',
};

export const ALIGN_ITEMS = keysOf(alignItemsToClassNameMap);

const justifyContentToClassNameMap = {
  flexStart: null,
  flexEnd: 'euiFlexItem--justifyContentFlexEnd',
  center: 'euiFlexItem--justifyContentCenter',
  spaceBetween: 'euiFlexItem--justifyContentSpaceBetween',
  spaceAround: 'euiFlexItem--justifyContentSpaceAround',
  spaceEvenly: 'euiFlexItem--justifyContentSpaceEvenly',
};

export const JUSTIFY_CONTENTS = keysOf(justifyContentToClassNameMap);

const directionToClassNameMap = {
  row: 'euiFlexItem--directionRow',
  rowReverse: 'euiFlexItem--directionRowReverse',
  column: 'euiFlexItem--directionColumn',
  columnReverse: 'euiFlexItem--directionColumnReverse',
};
export const DIRECTIONS = keysOf(directionToClassNameMap);

export const EuiFlexItem: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    EuiFlexItemProps
> = ({
  children,
  className,
  grow = true,
  alignItems = 'center',
  justifyContent = 'center',
  direction = 'row',
  component: Component = 'div',
  ...rest
}) => {
  validateGrowValue(grow);

  const classes = classNames(
    'euiFlexItem',
    alignItemsToClassNameMap[alignItems as FlexItemAlignItems],
    justifyContentToClassNameMap[justifyContent as FlexItemJustifyContent],
    directionToClassNameMap[direction as FlexItemDirection],
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
