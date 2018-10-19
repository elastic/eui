/// <reference path="../../common.d.ts" />

import { SFC, InputHTMLAttributes, Ref } from 'react';

declare module '@elastic/eui' {

  /**
   * password field type defs
   *
   * @see './field_password.js'
   */
  export interface EuiFieldPasswordProps {
    isInvalid?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    fullWidth?: boolean;
    isLoading?: boolean;
  }

  export const EuiFieldPassword: SFC<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldPasswordProps
  >;
}
