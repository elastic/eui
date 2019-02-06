import { CommonProps } from '../../common';

import { SFC, TextareaHTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * @see './text_area.js'
   */
  export interface EuiTextAreaProps {
    rows?: number;
    isInvalid?: boolean;
    fullWidth?: boolean;
    inputRef?: (input: any) => void;
  }

  export const EuiTextArea: SFC<
    CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement> & EuiTextAreaProps
    >;
}
