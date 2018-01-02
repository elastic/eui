/// <reference path="../../common.d.ts" />

declare module "@elastic/eui" {

  import { SFC, InputHTMLAttributes } from 'react';

  /**
   * search field type defs
   *
   * @see './field_search.js'
   */

  export interface EuiFieldSearchProps {
    name?: string,
    id?: string,
    placeholder?: string,
    value?: string,
    isInvalid?: boolean,
    fullWidth?: boolean,
    isLoading?: boolean
  }

  export type EuiFieldSearch = SFC<
    CommonProps &
    InputHTMLAttributes<HTMLInputElement> &
    EuiFieldSearchProps
    >;

}
