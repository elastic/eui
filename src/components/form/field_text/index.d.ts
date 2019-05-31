import { CommonProps } from '../../common';

import { FunctionComponent, InputHTMLAttributes, Ref } from 'react';

declare module '@elastic/eui' {
  /**
   * text field type defs
   *
   * @see './field_text.js'
   */
  export interface EuiFieldTextProps {
    icon?: string;
    isInvalid?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    fullWidth?: boolean;
    isLoading?: boolean;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    compressed?: boolean;
  }

  export const EuiFieldText: FunctionComponent<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldTextProps
  >;
}
