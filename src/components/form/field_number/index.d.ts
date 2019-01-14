import { CommonProps } from '../../common';
import { IconType } from '../../icon'

import { ReactNode, SFC, InputHTMLAttributes } from 'react';

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
    inputRef?: (element: HTMLInputElement) => void;
  }

  export const EuiFieldNumber: SFC<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldNumberProps
    >;
}
