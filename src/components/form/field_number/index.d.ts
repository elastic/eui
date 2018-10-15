/// <reference path="../../common.d.ts" />

import { ReactNode, SFC, InputHTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * text field type defs
   *
   * @see './field_number.js'
   */
  export interface EuiFieldNumberProps {
    icon?: string;
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    compressed?: boolean;
    prepend?: ReactNode | ReactNode[];
    append?: ReactNode | ReactNode[];
  }

  export const EuiFieldNumber: SFC<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldNumberProps
    >;
}
