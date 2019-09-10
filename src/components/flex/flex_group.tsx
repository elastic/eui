import React, { HTMLAttributes, Ref } from 'react';
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

const isValidElement = (
  component: string
): component is FlexGroupComponentType => {
  return ['div', 'span'].includes(component);
};

const EuiFlexGroup = React.forwardRef<
  HTMLDivElement | HTMLSpanElement,
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    EuiFlexGroupProps
>(
  (
    {
      children,
      className,
      gutterSize = 'l',
      alignItems = 'stretch',
      responsive = true,
      justifyContent = 'flexStart',
      direction = 'row',
      wrap = false,
      component = 'div',
      ...rest
    },
    ref: Ref<HTMLDivElement> | Ref<HTMLSpanElement>
  ) => {
    const classes = classNames(
      'euiFlexGroup',
      gutterSizeToClassNameMap[gutterSize as FlexGroupGutterSize],
      alignItemsToClassNameMap[alignItems as FlexGroupAlignItems],
      justifyContentToClassNameMap[justifyContent as FlexGroupJustifyContent],
      directionToClassNameMap[direction as FlexGroupDirection],
      {
        'euiFlexGroup--responsive': responsive,
        'euiFlexGroup--wrap': wrap,
      },
      className
    );

    if (!isValidElement(component)) {
      throw new Error(
        `${component} is not a valid element type. Use \`div\` or \`span\`.`
      );
    }

    return component === 'span' ? (
      <span
        className={classes}
        ref={ref as Ref<HTMLSpanElement>}
        {...rest as HTMLAttributes<HTMLSpanElement>}>
        {children}
      </span>
    ) : (
      <div
        className={classes}
        ref={ref as Ref<HTMLDivElement>}
        {...rest as HTMLAttributes<HTMLDivElement>}>
        {children}
      </div>
    );
  }
);
EuiFlexGroup.displayName = 'EuiFlexGroup';

export { EuiFlexGroup };
