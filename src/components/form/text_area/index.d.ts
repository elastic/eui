import { CommonProps } from '../../common';

import { FunctionComponent, TextareaHTMLAttributes } from 'react';

declare module '@elastic/eui' {
  export type EuiTextAreaResize = 'vertical' | 'horizontal' | 'both' | 'none';
  /**
   * @see './text_area.js'
   */
  export interface EuiTextAreaProps {
    compressed?: boolean;
    resize?: EuiTextAreaResize;
    rows?: number;
    isInvalid?: boolean;
    fullWidth?: boolean;
    inputRef?: (input: any) => void;
  }

  export const EuiTextArea: FunctionComponent<
    CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement> & EuiTextAreaProps
  >;
}
