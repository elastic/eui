/// <reference path="../../common.d.ts" />

import { ChangeEventHandler, ReactNode } from 'react';

declare module "@elastic/eui" {

  import { SFC, ReactNode, DOMAttributes, ChangeEventHandler } from 'react';


  /**
   * checkbox type defs
   *
   * @see './checkbox.js'
   */

  export type EuiCheckboxType = 'inList';

  export interface EuiCheckboxProps {
    id: string,
    checked: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>, // overriding to make it required
    label?: ReactNode,
    type?: EuiCheckboxType,
    disabled?: boolean
  }

  export type EuiCheckbox = SFC<
    CommonProps &
    DOMAttributes<HTMLDivElement> &
    EuiCheckboxProps
    >;


  /**
   * checkbox group type defs
   *
   * @see './checkbox_group.js'
   */

  export type EuiCheckboxGroupOption = {
    id: string,
    label?: ReactNode
  }

  export type EuiCheckboxGroupIdToSelectedMap = { [id: string]: boolean };

  export interface EuiCheckboxGroupProps {
    options: EuiCheckboxGroupOption[],
    idToSelectedMap: EuiCheckboxGroupIdToSelectedMap,
    onChange: ChangeEventHandler<HTMLInputElement>
  }

  export type EuiCheckboxGroup = SFC<
    CommonProps &
    DOMAttributes<HTMLDivElement> &
    EuiCheckboxGroupProps
    >;
}
