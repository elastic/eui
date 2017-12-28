declare module '@elastic/eui' {

  import { ReactNode } from 'react';

  export type FlexGridGutterSize = 'none' | 's' | 'm' | 'l' | 'xl';
  export type FlexGridColumns = 0 | 2 | 3 | 4;

  export interface EuiFlexGridProps {
    columns: FlexGridColumns,
    children?: ReactNode,
    className?: string,
    gutterSize?: FlexGridGutterSize,
  }
  export class EuiFlexGrid extends React.Component<EuiFlexGridProps, {}> {}

  export type FlexGroupGutterSize = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';
  export type FlexGroupAlignItems = 'strech' | 'flexStart' | 'flexEnd' | 'center';
  export type FlexGroupJustifyContent = 'flexStart' | 'flexEnd' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';

  export interface EuiFlexGroupProps {
    children?: ReactNode,
    className?: string,
    responsive?: boolean,
    gutterSize?: FlexGroupGutterSize,
    alignItems?: FlexGroupAlignItems,
    justifyContent?: FlexGroupJustifyContent,
    component?: 'div' | 'span',
    wrap?: boolean,
  }
  export class EuiFlexGroup extends React.Component<EuiFlexGroupProps, {}> {}

  export type FlexItemGrowSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  export interface EuiFlexItemProps {
    children?: ReactNode,
    grow?: null | true | false | FlexItemGrowSize,
    component?: 'div' | 'span'
  }
  export class EuiFlexItem extends React.Component<EuiFlexItemProps, {}> {}

}
