import { CommonProps } from '../../common';
/// <reference path="../../icon/index.d.ts" />

import { ReactNode, FunctionComponent, HTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * @see './field_help_text.js'
   */
  export interface EuiFormHelpTextProps {
  }

  export const EuiFormHelpText: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiFormHelpTextProps
    >;
}
