/// <reference path="../../common.d.ts" />

import { SFC, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './form_row.js'
   */

  export type EuiFormRowProps = CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      error?: string | string[];
      fullWidth?: boolean;
      hasEmptyLabelSpace?: boolean;
      helpText?: ReactNode;
      isInvalid?: boolean;
      label?: ReactNode;
    };

  export const EuiFormRow: SFC<EuiFormRowProps>;
}
