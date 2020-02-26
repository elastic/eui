import React, { HTMLAttributes, Ref } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

type BadgeGroupGutterSize = keyof typeof gutterSizeToClassNameMap;

export interface EuiBadgeGroupProps {
  /**
   * Space between badges
   */
  gutterSize?: BadgeGroupGutterSize;
  /**
   * Force each badges to be display block on smaller screens
   */
  responsive?: boolean;
  /**
   * Force each badge to wrap if necessary
   */
  wrap?: boolean;
}

const gutterSizeToClassNameMap = {
  none: null,
  xs: 'euiBadgeGroup--gutterExtraSmall',
  s: 'euiBadgeGroup--gutterSmall',
};

export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);

export const EuiBadgeGroup = React.forwardRef<
  HTMLDivElement,
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiBadgeGroupProps
>(
  (
    {
      children,
      className,
      gutterSize = 'xs',
      responsive = true,
      wrap = true,
      ...rest
    },
    ref: Ref<HTMLDivElement>
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
      <div className={classes} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);
EuiBadgeGroup.displayName = 'EuiBadgeGroup';
