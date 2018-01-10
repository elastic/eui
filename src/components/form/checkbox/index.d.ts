/// <reference path="../../common.d.ts" />

import { SFC, ReactNode, HTMLAttributes, ChangeEventHandler } from 'react';

declare module '@elastic/eui' {
  /**
   * checkbox type defs
   *
   * @see './checkbox.js'
   */

  export type EuiCheckboxType = 'inList';

  export interface EuiCheckboxProps {
    id: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
    label?: ReactNode;
    type?: EuiCheckboxType;
    disabled?: boolean;
  }

  export const EuiCheckbox: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiCheckboxProps
  >;

  /**
   * checkbox group type defs
   *
   * @see './checkbox_group.js'
   */

  export type EuiCheckboxGroupOption = {
    id: string;
    label?: ReactNode;
  };

  export type EuiCheckboxGroupIdToSelectedMap = { [id: string]: boolean };

  export interface EuiCheckboxGroupProps {
    options: EuiCheckboxGroupOption[];
    idToSelectedMap: EuiCheckboxGroupIdToSelectedMap;
    onChange: ChangeEventHandler<HTMLInputElement>;
  }

  export const EuiCheckboxGroup: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiCheckboxGroupProps
  >;
}
