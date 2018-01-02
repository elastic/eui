/// <reference path="../common.d.ts" />

import { DOMAttributes } from 'react';

declare module '@elastic/eui' {

  import { SFC, DOMAttributes } from 'react';


  /**
   * flex grid type defs
   *
   * @see './flex_grid.js'
   */

  export type FlexGridGutterSize = 'none' | 's' | 'm' | 'l' | 'xl';
  export type FlexGridColumns = 0 | 2 | 3 | 4;

  export interface EuiFlexGridProps {
    columns: FlexGridColumns,
    gutterSize?: FlexGridGutterSize,
  }

  export type EuiFlexGrid = SFC<
    CommonProps &
    DOMAttributes<HTMLDivElement> &
    EuiFlexGridProps
    >;


  /**
   * flex group type defs
   *
   * @see './flex_group.js'
   */

  export type FlexGroupGutterSize = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';
  export type FlexGroupAlignItems = 'strech' | 'flexStart' | 'flexEnd' | 'center';
  export type FlexGroupJustifyContent = 'flexStart' | 'flexEnd' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  export type FlexGroupCmponentType = 'div' | 'span';

  export interface EuiFlexGroupProps {
    responsive?: boolean,
    gutterSize?: FlexGroupGutterSize,
    alignItems?: FlexGroupAlignItems,
    justifyContent?: FlexGroupJustifyContent,
    component?: FlexGroupCmponentType,
    wrap?: boolean,
  }

  export type EuiFlexGroup = SFC<
    CommonProps &
    DOMAttributes<HTMLDivElement|HTMLSpanElement> &
    EuiFlexGroupProps
    >;


  /**
   * flex item type defs
   *
   * @see './flex_item.js'
   */

  export type FlexItemGrowSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | true | false | null;
  export type FlexItemComponentType = 'div' | 'span';

  export interface EuiFlexItemProps {
    grow?: FlexItemGrowSize,
    component?: FlexItemComponentType
  }

  export type EuiFlexItem = SFC<
    CommonProps &
    DOMAttributes<HTMLDivElement|HTMLSpanElement> &
    EuiFlexItemProps
    >;

}
