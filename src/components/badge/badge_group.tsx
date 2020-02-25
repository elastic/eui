import React, { HTMLAttributes, Ref } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

type BadgeGroupGutterSize = keyof typeof gutterSizeToClassNameMap;

export interface EuiBadgeGroupProps {
  gutterSize?: BadgeGroupGutterSize;
  responsive?: boolean;
  wrap?: boolean;
}

const gutterSizeToClassNameMap = {
  none: null,
  xs: 'euiBadgeGroup--gutterExtraSmall',
  s: 'euiBadgeGroup--gutterSmall',
  m: 'euiBadgeGroup--gutterMedium',
  l: 'euiBadgeGroup--gutterLarge',
  xl: 'euiBadgeGroup--gutterExtraLarge',
};

export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);
export type EuiBadgeGroupGutterSize = keyof typeof gutterSizeToClassNameMap;

const EuiBadgeGroup = React.forwardRef<
  HTMLDivElement | HTMLSpanElement,
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    EuiBadgeGroupProps
>(
  (
    {
      children,
      className,
      gutterSize = 'xs',
      responsive = true,
      wrap = false,
      ...rest
    },
    ref: Ref<HTMLDivElement> | Ref<HTMLSpanElement>
  ) => {
    const classes = classNames(
      'euiBadgeGroup',
      gutterSizeToClassNameMap[gutterSize as BadgeGroupGutterSize],
      {
        'euiBadgeGroup--responsive': responsive,
        'euiBadgeGroup--wrap': wrap,
      },
      className
    );

    return (
      <div
        className={classes}
        ref={ref as Ref<HTMLDivElement>}
        {...rest as HTMLAttributes<HTMLDivElement>}>
        {children}
      </div>
    );
  }
);
EuiBadgeGroup.displayName = 'EuiBadgeGroup';

export { EuiBadgeGroup };
