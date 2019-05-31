import { CommonProps } from '../../common';
import { IconType } from '../../icon';

import { ReactNode, FunctionComponent, InputHTMLAttributes, Ref } from 'react';

declare module '@elastic/eui' {
  /**
   * text field type defs
   *
   * @see './field_number.js'
   */
  export interface EuiFieldNumberProps {
    icon?: IconType;
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    compressed?: boolean;
    prepend?: ReactNode | ReactNode[];
    append?: ReactNode | ReactNode[];
    inputRef?: Ref<HTMLInputElement>;
  }

  export const EuiFieldNumber: FunctionComponent<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldNumberProps
  >;
}
