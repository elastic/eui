import { CommonProps } from '../../common';

import { FunctionComponent, TextareaHTMLAttributes } from 'react';

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

  export const EuiTextArea: FunctionComponent<
    CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement> & EuiTextAreaProps
  >;
}
