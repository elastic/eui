/// <reference path="../../common.d.ts" />

import { SFC, InputHTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * text field type defs
   *
   * @see './field_text.js'
   */
  export interface EuiFieldTextProps {
    name?: string;
    id?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    icon?: string;
    isInvalid?: boolean;
    inputRef?: (ref: HTMLInputElement) => void;
    fullWidth?: boolean;
    isLoading?: boolean;
  }

  export const EuiFieldText: SFC<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldTextProps
    >;
}
