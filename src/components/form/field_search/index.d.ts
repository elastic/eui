/// <reference path="../../common.d.ts" />

import { SFC, InputHTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * search field type defs
   *
   * @see './field_search.js'
   */

  export interface EuiFieldSearchProps {
    name?: string;
    id?: string;
    placeholder?: string;
    value?: string;
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    incremental?: boolean;
    onSearch?: (value: any) => void;
  }

  export const EuiFieldSearch: SFC<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldSearchProps
  >;
}
