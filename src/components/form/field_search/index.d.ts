import { CommonProps } from '../../common';

import { FunctionComponent, InputHTMLAttributes } from 'react';

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
    onSearch?: (value: string) => void;
  }

  export const EuiFieldSearch: FunctionComponent<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldSearchProps
  >;
}
