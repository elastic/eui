import React, { HTMLAttributes, Ref, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';

const gutterSizeToClassNameMap = {
  none: null,
  xs: 'euiBadgeGroup--gutterExtraSmall',
  s: 'euiBadgeGroup--gutterSmall',
};

export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);
type BadgeGroupGutterSize = keyof typeof gutterSizeToClassNameMap;

export interface EuiBadgeGroupProps {
  /**
   * Space between badges
   */
  gutterSize?: BadgeGroupGutterSize;
  /**
   * Should be a list of EuiBadge's but can also be any other element
   * Will apply an extra class to add spacing
   */
  children?: ReactNode;
}

export const EuiBadgeGroup = React.forwardRef<
  HTMLDivElement,
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiBadgeGroupProps
>(
  (
    { children, className, gutterSize = 'xs', ...rest },
    ref: Ref<HTMLDivElement>
  ) => {
    const classes = classNames(
      'euiBadgeGroup',
      gutterSizeToClassNameMap[gutterSize as BadgeGroupGutterSize],
      className
    );

    return (
      <div className={classes} ref={ref} {...rest}>
        {React.Children.map(children, (child: ReactNode) => (
          <span className="euiBadgeGroup__item">{child}</span>
        ))}
      </div>
    );
  }
);
