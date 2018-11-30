import { CommonProps } from '../../common';

import { SFC, ReactNode, HTMLAttributes, ChangeEventHandler, InputHTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * checkbox type defs
   *
   * @see './checkbox.js'
   */

  export type EuiCheckboxType = 'inList';

  export interface EuiCheckboxProps {
    id: string;
    checked?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
    label?: ReactNode;
    type?: EuiCheckboxType;
    disabled?: boolean;
    indeterminate?: boolean;
  }

  export const EuiCheckbox: SFC<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiCheckboxProps
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
