import { CommonProps } from '../../common';

import { SFC, InputHTMLAttributes, Ref } from 'react';

declare module '@elastic/eui' {

  /**
   * empty field type defs
   *
   * @see './field_empty.js'
   */
  export interface EuiFieldEmptyProps {
    children?: React.ReactNode;
  }

  export const EuiFieldEmpty: SFC<
    CommonProps & EuiFieldEmptyProps
    >;
}
