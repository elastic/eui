/// <reference path="../../common.d.ts" />

import { SFC, TextareaHTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * @see './text_area.js'
   */
  export interface EuiTextAreaProps {
    id?: string;
    name?: string;
    placeholder?: string;
    rows?: number;
    isInvalid?: boolean;
    fullWidth?: boolean;
    onChange?: (event: any) => void;
    value?: string;
    defaultValue?: string;
    inputRef?: (input: any) => void;
  }

  export const EuiTextArea: SFC<
    CommonProps & TextareaHTMLAttributes & EuiTextAreaProps
    >;
}
