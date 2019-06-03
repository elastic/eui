import { CommonProps } from '../../common';

import { FunctionComponent, InputHTMLAttributes, Ref } from 'react';

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
    compressed?: boolean;
  }

  export const EuiFieldPassword: FunctionComponent<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldPasswordProps
  >;
}
