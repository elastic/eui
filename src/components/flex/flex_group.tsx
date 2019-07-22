import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

export type FlexGroupAlignItems = keyof typeof alignItemsToClassNameMap;
export type FlexGroupComponentType = 'div' | 'span';
export type FlexGroupDirection = keyof typeof directionToClassNameMap;
export type FlexGroupGutterSize = keyof typeof gutterSizeToClassNameMap;
export type FlexGroupJustifyContent = keyof typeof justifyContentToClassNameMap;

export interface EuiFlexGroupProps {
  alignItems?: FlexGroupAlignItems;
  component?: FlexGroupComponentType;
  direction?: FlexGroupDirection;
  gutterSize?: FlexGroupGutterSize;
  justifyContent?: FlexGroupJustifyContent;
  responsive?: boolean;
  wrap?: boolean;
}

const gutterSizeToClassNameMap = {
  none: null,
  xs: 'euiFlexGroup--gutterExtraSmall',
  s: 'euiFlexGroup--gutterSmall',
  m: 'euiFlexGroup--gutterMedium',
  l: 'euiFlexGroup--gutterLarge',
  xl: 'euiFlexGroup--gutterExtraLarge',
};

export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);

const alignItemsToClassNameMap = {
  stretch: null,
  flexStart: 'euiFlexGroup--alignItemsFlexStart',
  flexEnd: 'euiFlexGroup--alignItemsFlexEnd',
  center: 'euiFlexGroup--alignItemsCenter',
  baseline: 'euiFlexGroup--alignItemsBaseline',
};

export const ALIGN_ITEMS = keysOf(alignItemsToClassNameMap);

const justifyContentToClassNameMap = {
  flexStart: null,
  flexEnd: 'euiFlexGroup--justifyContentFlexEnd',
  center: 'euiFlexGroup--justifyContentCenter',
  spaceBetween: 'euiFlexGroup--justifyContentSpaceBetween',
  spaceAround: 'euiFlexGroup--justifyContentSpaceAround',
  spaceEvenly: 'euiFlexGroup--justifyContentSpaceEvenly',
};

export const JUSTIFY_CONTENTS = keysOf(justifyContentToClassNameMap);

const directionToClassNameMap = {
  row: 'euiFlexGroup--directionRow',
  rowReverse: 'euiFlexGroup--directionRowReverse',
  column: 'euiFlexGroup--directionColumn',
  columnReverse: 'euiFlexGroup--directionColumnReverse',
};

export const DIRECTIONS = keysOf(directionToClassNameMap);

export const EuiFlexGroup: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    EuiFlexGroupProps
> = ({
  children,
  className,
  gutterSize = 'l',
  alignItems = 'stretch',
  responsive = true,
  justifyContent = 'flexStart',
  direction = 'row',
  wrap = false,
  component: Component = 'div',
  ...rest
}) => {
  const classes = classNames(
    'euiFlexGroup',
    gutterSize ? gutterSizeToClassNameMap[gutterSize] : undefined,
    alignItems ? alignItemsToClassNameMap[alignItems] : undefined,
    justifyContent ? justifyContentToClassNameMap[justifyContent] : undefined,
    direction ? directionToClassNameMap[direction] : undefined,
    {
      'euiFlexGroup--responsive': responsive,
      'euiFlexGroup--wrap': wrap,
    },
    className
  );

  return (
    <div className="euiFlexGroup__wrapper">
      <Component className={classes} {...rest}>
        {children}
      </Component>
    </div>
  );
};
