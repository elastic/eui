import { CommonProps } from '../../common';

import { FunctionComponent, InputHTMLAttributes, Ref } from 'react';

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
    onSearch?: (value: string) => void;
    incremental?: boolean;
    compressed?: boolean;
    inputRef?: Ref<HTMLInputElement>;
  }

  export const EuiFieldSearch: FunctionComponent<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldSearchProps
  >;
}
