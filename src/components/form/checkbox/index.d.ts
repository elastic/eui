import { CommonProps } from '../../common';

import {
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
  ChangeEventHandler,
  InputHTMLAttributes,
} from 'react';

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
    compressed?: boolean;
    indeterminate?: boolean;
  }

  export const EuiCheckbox: FunctionComponent<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiCheckboxProps
  >;

  /**
   * checkbox group type defs
   *
   * @see './checkbox_group.js'
   */

  export interface EuiCheckboxGroupOption {
    id: string;
    label?: ReactNode;
  }

  export interface EuiCheckboxGroupIdToSelectedMap {
    [id: string]: boolean;
  }

  export interface EuiCheckboxGroupProps {
    options: EuiCheckboxGroupOption[];
    idToSelectedMap: EuiCheckboxGroupIdToSelectedMap;
    onChange: ChangeEventHandler<HTMLInputElement>;
    compressed?: boolean;
  }

  export const EuiCheckboxGroup: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiCheckboxGroupProps
  >;
}
