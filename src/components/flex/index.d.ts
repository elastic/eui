import { CommonProps } from '../common';

import { SFC, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * flex grid type defs
   *
   * @see './flex_grid.js'
   */

  export type FlexGridGutterSize = 'none' | 's' | 'm' | 'l' | 'xl';
  export type FlexGridColumns = 0 | 1 | 2 | 3 | 4;

  export interface EuiFlexGridProps {
    columns?: FlexGridColumns;
    gutterSize?: FlexGridGutterSize;
  }

  export const EuiFlexGrid: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiFlexGridProps
  >;

  /**
   * flex group type defs
   *
   * @see './flex_group.js'
   */

  export type FlexGroupAlignItems =
    | 'stretch'
    | 'flexStart'
    | 'flexEnd'
    | 'center'
    | 'baseline';
  export type FlexGroupComponentType = 'div' | 'span';
  export type FlexGroupDirection =
    | 'column'
    | 'columnReverse'
    | 'row'
    | 'rowReverse';
  export type FlexGroupGutterSize = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';
  export type FlexGroupJustifyContent =
    | 'flexStart'
    | 'flexEnd'
    | 'center'
    | 'spaceBetween'
    | 'spaceAround'
    | 'spaceEvenly';

  export interface EuiFlexGroupProps {
    alignItems?: FlexGroupAlignItems;
    children?: React.ReactNode;
    className?: string;
    component?: FlexGroupComponentType;
    direction?: FlexGroupDirection;
    gutterSize?: FlexGroupGutterSize;
    justifyContent?: FlexGroupJustifyContent;
    responsive?: boolean;
    wrap?: boolean;
  }

  export const EuiFlexGroup: SFC<
    CommonProps &
      HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
      EuiFlexGroupProps
  >;

  /**
   * flex item type defs
   *
   * @see './flex_item.js'
   */

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
  export type FlexItemComponentType = 'div' | 'span';

  export interface EuiFlexItemProps {
    grow?: FlexItemGrowSize;
    component?: FlexItemComponentType;
  }

  export const EuiFlexItem: SFC<
    CommonProps &
      HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
      EuiFlexItemProps
  >;
}
